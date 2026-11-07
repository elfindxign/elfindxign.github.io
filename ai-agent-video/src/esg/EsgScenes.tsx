import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, colors, fontFamily} from '../theme';
import {esg, esgGradientText} from './esgTheme';
import {BuildingIcon, CommentIcon, LeafIcon, PeopleIcon} from './Icons';
import {Pillar} from './Pillar';

const out = Easing.bezier(0.16, 1, 0.3, 1);
const LETTERS = [
  {letter: 'E', ko: '환경', color: esg.e},
  {letter: 'S', ko: '사회', color: esg.s},
  {letter: 'G', ko: '지배구조', color: esg.g},
];

// 1. Hook
const EsgHookInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <div style={{display: 'flex', gap: 30, marginBottom: 80}}>
        {LETTERS.map((l, i) => (
          <div
            key={l.letter}
            style={{
              width: 230,
              height: 230,
              borderRadius: 60,
              backgroundColor: l.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily,
              fontWeight: 900,
              fontSize: 170,
              color: colors.bg,
              boxShadow: `0 0 80px ${l.color}66`,
              scale: interpolate(frame, [i * 0.15 * fps, (i * 0.15 + 0.5) * fps], [0, 1], {
                ...clamp,
                easing: Easing.spring({damping: 11}),
                output: 'perceptual-scale',
              }),
            }}
          >
            {l.letter}
          </div>
        ))}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 120,
          lineHeight: 1.2,
          textAlign: 'center',
          color: colors.text,
          opacity: interpolate(frame, [0.6 * fps, 1 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.6 * fps, 1 * fps], ['0px 60px', '0px 0px'], {...clamp, easing: out}),
        }}
      >
        요즘 다들 말하는
        <br />
        <span style={esgGradientText}>ESG</span>, 뭘까?
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 52,
          color: colors.muted,
          marginTop: 60,
          opacity: interpolate(frame, [1.7 * fps, 2.2 * fps], [0, 1], clamp),
        }}
      >
        30초 만에 정리해 드릴게요
      </div>
    </>
  );
};
export const EsgHook = Interactive.create({Component: EsgHookInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 2. Definition
const EsgDefinitionInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 110,
          color: colors.text,
          marginBottom: 80,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        <span style={esgGradientText}>ESG</span>란?
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34, width: 900}}>
        {LETTERS.map((l, i) => {
          const t0 = (0.4 + i * 0.35) * fps;
          return (
            <div
              key={l.letter}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 44,
                opacity: interpolate(frame, [t0, t0 + 0.3 * fps], [0, 1], clamp),
                translate: interpolate(frame, [t0, t0 + 0.4 * fps], ['-80px 0px', '0px 0px'], {...clamp, easing: out}),
              }}
            >
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 40,
                  backgroundColor: l.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily,
                  fontWeight: 900,
                  fontSize: 110,
                  color: colors.bg,
                }}
              >
                {l.letter}
              </div>
              <div style={{fontFamily, fontWeight: 900, fontSize: 90, color: colors.text}}>{l.ko}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 90,
          fontFamily,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.4,
          textAlign: 'center',
          color: colors.text,
          opacity: interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], clamp),
          translate: interpolate(frame, [2 * fps, 2.5 * fps], ['0px 40px', '0px 0px'], {...clamp, easing: out}),
        }}
      >
        기업이 돈을 <span style={esgGradientText}>‘어떻게’</span> 버는지
        <br />
        평가하는 세 가지 기준
      </div>
    </>
  );
};
export const EsgDefinition = Interactive.create({
  Component: EsgDefinitionInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});

// 3–5. Pillars
const EnvironmentInner = () => (
  <Pillar
    letter="E"
    english="Environment"
    korean="환경"
    color={esg.e}
    icon={<LeafIcon size={200} color={esg.e} />}
    items={['탄소 배출 줄이기', '재생에너지 사용', '쓰레기·오염 줄이기']}
  />
);
export const Environment = Interactive.create({Component: EnvironmentInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

const SocialInner = () => (
  <Pillar
    letter="S"
    english="Social"
    korean="사회"
    color={esg.s}
    icon={<PeopleIcon size={200} color={esg.s} />}
    items={['직원 안전과 복지', '협력사와 공정한 거래', '고객 정보 보호']}
  />
);
export const Social = Interactive.create({Component: SocialInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

const GovernanceInner = () => (
  <Pillar
    letter="G"
    english="Governance"
    korean="지배구조"
    color={esg.g}
    icon={<BuildingIcon size={200} color={esg.g} />}
    items={['투명한 경영과 공시', '독립적인 이사회', '부패·비리 방지']}
  />
);
export const Governance = Interactive.create({Component: GovernanceInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 6. Why it matters
const REASONS = [
  {who: '투자자', what: 'ESG 평가를 보고 투자해요'},
  {who: '소비자', what: '책임 있는 기업을 골라요'},
  {who: '정부', what: 'ESG 정보 공개를 요구해요'},
];

const EsgWhyInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const finalAt = 2.6 * fps;
  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 110,
          color: colors.text,
          marginBottom: 80,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        왜 중요할까?
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 34, width: 920}}>
        {REASONS.map((r, i) => {
          const t0 = (0.5 + i * 0.5) * fps;
          return (
            <div
              key={r.who}
              style={{
                padding: '40px 50px',
                borderRadius: 40,
                backgroundColor: colors.card,
                border: `3px solid ${colors.cardBorder}`,
                fontFamily,
                opacity: interpolate(frame, [t0, t0 + 0.3 * fps], [0, 1], clamp),
                translate: interpolate(frame, [t0, t0 + 0.4 * fps], ['80px 0px', '0px 0px'], {...clamp, easing: out}),
              }}
            >
              <div style={{fontWeight: 700, fontSize: 48, color: LETTERS[i].color, marginBottom: 8}}>{r.who}</div>
              <div style={{fontWeight: 900, fontSize: 64, color: colors.text}}>{r.what}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 80,
          fontFamily,
          fontWeight: 900,
          fontSize: 80,
          textAlign: 'center',
          lineHeight: 1.3,
          opacity: interpolate(frame, [finalAt, finalAt + 0.3 * fps], [0, 1], clamp),
          scale: interpolate(frame, [finalAt, finalAt + 0.5 * fps], [0.7, 1], {
            ...clamp,
            easing: Easing.spring({damping: 11}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <span style={esgGradientText}>기업 평가의 새 기준!</span>
      </div>
    </>
  );
};
export const EsgWhy = Interactive.create({Component: EsgWhyInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 7. Outro with comment call-to-action
const EsgOutroInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ctaAt = 1.3 * fps;
  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 72,
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.35,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0, 0.4 * fps], ['0px 40px', '0px 0px'], {...clamp, easing: out}),
        }}
      >
        한마디로 ESG는
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 104,
          textAlign: 'center',
          lineHeight: 1.25,
          marginTop: 24,
          opacity: interpolate(frame, [0.4 * fps, 0.8 * fps], [0, 1], clamp),
          scale: interpolate(frame, [0.4 * fps, 1 * fps], [0.8, 1], {
            ...clamp,
            easing: Easing.spring({damping: 12}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <span style={esgGradientText}>오래 가는</span>
        <br />
        <span style={{color: colors.text}}>기업의 조건</span>
      </div>

      <div
        style={{
          marginTop: 130,
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          padding: '44px 64px',
          borderRadius: 999,
          backgroundImage: `linear-gradient(90deg, ${esg.e}, ${esg.s})`,
          boxShadow: `0 0 90px ${esg.e}66`,
          opacity: interpolate(frame, [ctaAt, ctaAt + 0.3 * fps], [0, 1], clamp),
          translate: interpolate(frame, [ctaAt, ctaAt + 0.5 * fps], ['0px 80px', '0px 0px'], {...clamp, easing: out}),
          scale: interpolate((frame - ctaAt) % fps, [0, 0.5 * fps, fps], [1, 1.05, 1], clamp),
        }}
      >
        <CommentIcon size={110} color={colors.bg} />
        <div style={{fontFamily, fontWeight: 900, fontSize: 66, color: colors.bg}}>더 알고 싶으면 댓글로!</div>
      </div>
    </>
  );
};
export const EsgOutro = Interactive.create({Component: EsgOutroInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});
