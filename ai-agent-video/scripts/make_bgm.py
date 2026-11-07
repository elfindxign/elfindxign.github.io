"""Synthesize a light, upbeat 30s background track (I-V-vi-IV in C, 120 BPM).

Usage: python3 make_bgm.py out.wav
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM          # 0.5s
BAR = 4 * BEAT           # 2s
LENGTH = 30.0
N = int(SR * LENGTH)

left = np.zeros(N)
right = np.zeros(N)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    left[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    right[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)


def env_adsr(n, a, d, s, r):
    t = np.arange(n) / SR
    dur = n / SR
    e = np.where(t < a, t / a, np.where(t < a + d, 1 - (1 - s) * (t - a) / d, s))
    rel_start = dur - r
    e = np.where(t > rel_start, e * np.clip((dur - t) / r, 0, 1), e)
    return e


def lowpass(x, cutoff):
    alpha = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc += alpha * (v - acc)
        y[i] = acc
    return y


def pad_note(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    detune = [0.996, 1.0, 1.004]
    sig = sum(
        sum(np.sin(2 * np.pi * freq * d * h * t) / h for h in range(1, 6))
        for d in detune
    ) / 3
    return lowpass(sig, 1400) * env_adsr(n, 0.35, 0.3, 0.8, 0.4)


def pluck(freq, dur=0.45):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * 2 * freq * t) + 0.12 * np.sin(2 * np.pi * 3 * freq * t)
    return sig * np.exp(-t * 9) * np.minimum(1, t / 0.004)


def bass(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(2 * np.pi * 2 * freq * t)
    return sig * env_adsr(n, 0.01, 0.15, 0.6, 0.08)


def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t * 30)
    phase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(phase) * np.exp(-t * 9)


rng = np.random.default_rng(7)


def hat():
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    noise = noise - lowpass(noise, 6000)  # crude high-pass
    return noise * np.exp(-t * 70)


def snap():
    n = int(0.18 * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    noise = noise - lowpass(noise, 1500)
    return noise * np.exp(-t * 28)


# C, G, Am, F  (root midi, chord tones)
CHORDS = [
    (48, [60, 64, 67]),
    (43, [59, 62, 67]),
    (45, [60, 64, 69]),
    (41, [60, 65, 69]),
]
ARP = [0, 1, 2, 1, 0, 2, 1, 2]  # index pattern per 8th note

bars = int(LENGTH / BAR)  # 15
for b in range(bars):
    t0 = b * BAR
    root, tones = CHORDS[b % 4]
    last = b == bars - 1
    # Pad
    for k, note in enumerate(tones):
        add(pad_note(midi(note), BAR + 0.4 + (1.5 if last else 0)), t0, pan=(k - 1) * 0.4, gain=0.07)
    # Bass from bar 2
    if b >= 1 and not last:
        for beat in range(4):
            add(bass(midi(root), BEAT * 0.9), t0 + beat * BEAT, gain=0.22)
    if last:
        add(bass(midi(root), 2.0), t0, gain=0.22)
    # Pluck arpeggio from the start (except last bar: single chord stab)
    if not last:
        for step in range(8):
            note = tones[ARP[step]] + 12
            add(pluck(midi(note)), t0 + step * BEAT / 2, pan=0.35 if step % 2 else -0.35, gain=0.13)
    else:
        for k, note in enumerate(tones):
            add(pluck(midi(note + 12), 1.5), t0, pan=(k - 1) * 0.3, gain=0.12)
    # Drums from bar 3
    if 2 <= b and not last:
        for beat in range(4):
            add(kick(), t0 + beat * BEAT, gain=0.45)
            add(hat(), t0 + beat * BEAT + BEAT / 2, pan=0.2, gain=0.12)
        for beat in (1, 3):
            add(snap(), t0 + beat * BEAT, pan=-0.1, gain=0.10)

# Master: normalize and fade
mix = np.stack([left, right], axis=1)
mix /= np.max(np.abs(mix)) / 0.89
t = np.arange(N) / SR
fade = np.clip(t / 0.3, 0, 1) * np.clip((LENGTH - t) / 1.5, 0, 1)
mix *= fade[:, None]

pcm = (mix * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print('wrote', sys.argv[1])
