"""Synthesize the 60s background track for the Hwaseong video.

A-minor pentatonic, 90 BPM, gayageum-like plucks over pads and buk-style drums.
Sections follow the video: build-up (0-37s), collapse (37-45s, dark, no drums),
restoration (45s-end, full), final chord.

Usage: python3 make_bgm_hwaseong.py out.wav
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 90
BEAT = 60 / BPM
BAR = 4 * BEAT
LENGTH = 60.0
N = int(SR * LENGTH)

left = np.zeros(N)
right = np.zeros(N)
rng = np.random.default_rng(11)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    left[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    right[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)


def lowpass(x, cutoff):
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc += alpha * (v - acc)
        y[i] = acc
    return y


def env(n, a, r):
    t = np.arange(n) / SR
    dur = n / SR
    return np.minimum(1, t / a) * np.clip((dur - t) / r, 0, 1)


def pad(freq, dur, bright=1300):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = sum(
        sum(np.sin(2 * np.pi * freq * d * h * t) / h for h in range(1, 5))
        for d in (0.997, 1.0, 1.003)
    ) / 3
    return lowpass(sig, bright) * env(n, 0.5, 0.6)


def gayageum(freq, dur=0.9):
    n = int(dur * SR)
    t = np.arange(n) / SR
    bend = freq * (1 + 0.02 * np.exp(-t * 25))  # slight pitch drop after the pluck
    phase = 2 * np.pi * np.cumsum(bend) / SR
    sig = np.sin(phase) + 0.5 * np.sin(2 * phase) + 0.2 * np.sin(3 * phase) + 0.08 * np.sin(5 * phase)
    return sig * np.exp(-t * 5.5) * np.minimum(1, t / 0.003)


def bass(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * freq * t) + 0.2 * np.sin(4 * np.pi * freq * t)) * env(n, 0.02, 0.2)


def buk(strength=1.0):
    n = int(0.5 * SR)
    t = np.arange(n) / SR
    f = 62 + 70 * np.exp(-t * 22)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6)
    noise = rng.standard_normal(n)
    hit = lowpass(noise, 900) * np.exp(-t * 40) * 0.6
    return (body + hit) * strength


def click():
    n = int(0.08 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    noise = noise - lowpass(noise, 3500)
    return (noise + 0.6 * np.sin(2 * np.pi * 1800 * t)) * np.exp(-t * 60)


# Chords as (bass root, pad tones, pentatonic melody pool)
AM = (45, [57, 60, 64], [69, 72, 74, 76, 79])
F = (41, [57, 60, 65], [69, 72, 74, 76, 81])
C = (48, [55, 60, 64], [67, 72, 74, 76, 79])
G = (43, [55, 59, 62], [67, 69, 74, 79, 81])
EM = (40, [55, 59, 64], [67, 69, 71, 76, 79])
MAIN = [AM, F, C, G]
DARK = [AM, F, EM]
MELODY = [0, None, 2, 1, 3, None, 2, 4]  # indices into the melody pool per 8th note, None = rest

bars = int(LENGTH / BAR)  # 22
for b in range(bars):
    t0 = b * BAR
    dark = 37.0 <= t0 < 45.0
    restore = t0 >= 45.0
    last = b == bars - 1
    root, tones, pool = (DARK[(b - 14) % 3] if dark else MAIN[b % 4])
    if last:
        root, tones, pool = AM
    sustain = BAR + 0.6 + (LENGTH - t0 - BAR if last else 0)

    for k, note in enumerate(tones):
        add(pad(midi(note - (12 if dark else 0)), sustain, 700 if dark else 1300), t0, pan=(k - 1) * 0.5, gain=0.08)

    if dark:
        add(bass(midi(root - 12), BAR), t0, gain=0.3)
        add(gayageum(midi(pool[0] - 12), 2.0), t0, pan=-0.2, gain=0.16)
        continue

    if b >= 1:
        for beat in (0, 2):
            add(bass(midi(root), BEAT * 1.8), t0 + beat * BEAT, gain=0.24)

    if last:
        for k, note in enumerate(tones):
            add(gayageum(midi(note + 12), 2.5), t0 + k * 0.08, pan=(k - 1) * 0.3, gain=0.14)
        add(buk(1.2), t0, gain=0.4)
        continue

    for step, idx in enumerate(MELODY):
        if idx is None or (b < 2 and step % 2):
            continue
        add(gayageum(midi(pool[idx])), t0 + step * BEAT / 2, pan=0.3 if step % 2 else -0.3, gain=0.14)

    if b >= 4:
        strength = 1.25 if restore else 1.0
        add(buk(strength), t0, gain=0.42)
        add(buk(0.7 * strength), t0 + 2 * BEAT, gain=0.42)
        add(buk(0.5 * strength), t0 + 3.5 * BEAT, gain=0.42)
        for beat in range(4):
            add(click(), t0 + beat * BEAT + BEAT / 2, pan=0.25, gain=0.08)

mix = np.stack([left, right], axis=1)
mix /= np.max(np.abs(mix)) / 0.89
t = np.arange(N) / SR
fade = np.clip(t / 0.4, 0, 1) * np.clip((LENGTH - t) / 1.8, 0, 1)
mix *= fade[:, None]

pcm = (mix * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print('wrote', sys.argv[1])
