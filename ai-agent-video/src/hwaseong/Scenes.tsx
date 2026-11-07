import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CommentIcon} from '../esg/Icons';
import {clamp, colors} from '../theme';
import {Appear} from './Appear';
import {Fortress} from './Fortress';
import {Book, Coin, Crane} from './Illustrations';
import {goldText, hw} from './theme';

const main: React.CSSProperties = {fontWeight: 900, fontSize: 92, color: colors.text, textAlign: 'center', lineHeight: 1.25};
const sub: React.CSSProperties = {fontWeight: 700, fontSize: 64, color: colors.text, textAlign: 'center', lineHeight: 1.35};
const spring = (frame: number, start: number, end: number, from: number) =>
  interpolate(frame, [start, end], [from, 1], {...clamp, easing: Easing.spring({damping: 12}), output: 'perceptual-scale'});

// 1. Hook: a ruined fortress rebuilds itself
const HookInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <Appear at={0}>
        <div style={sub}>완전히 무너졌던 성이</div>
      </Appear>
      <div style={{margin: '50px 0'}}>
        <Fortress
          width={940}
          ruin={interpolate(frame, [1.2 * fps, 3 * fps], [1, 0], {...clamp, easing: Easing.bezier(0.6, 0, 0.2, 1)})}
        />
      </div>
      <Appear at={1.2}>
        <div style={main}>
          <span style={goldText}>200년 전 서류 한 권</span>으로
        </div>
      </Appear>
      <Appear at={2.6}>
        <div style={main}>되살아났습니다</div>
      </Appear>
    </>
  );
};
export const Hook = Interactive.create({Component: HookInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 2. 1794, Jeongjo starts building; plan was 10 years
const StartInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const year = Math.round(interpolate(frame, [0, 0.9 * fps], [1700, 1794], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}));
  return (
    <>
      <div style={{fontWeight: 900, fontSize: 240, color: hw.gold, lineHeight: 1, letterSpacing: -4}}>{year}</div>
      <Appear at={0.8} style={{marginTop: 40}}>
        <div style={sub}>
          정조는 수원에
          <br />새 성을 쌓기 시작합니다
        </div>
      </Appear>
      <Appear at={3} style={{marginTop: 110}}>
        <div
          style={{
            width: 900,
            padding: '50px 60px',
            borderRadius: 44,
            backgroundColor: colors.card,
            border: `3px solid ${colors.cardBorder}`,
          }}
        >
          <div style={{fontWeight: 700, fontSize: 52, color: colors.muted}}>원래 계획</div>
          <div style={{fontWeight: 900, fontSize: 130, color: colors.text, margin: '6px 0 30px'}}>10년</div>
          <div style={{display: 'flex', gap: 10}}>
            {Array.from({length: 10}, (_, k) => (
              <div
                key={k}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: hw.red,
                  opacity: interpolate(frame, [(3.3 + k * 0.12) * fps, (3.45 + k * 0.12) * fps], [0.15, 1], clamp),
                }}
              />
            ))}
          </div>
        </div>
      </Appear>
    </>
  );
};
export const Start = Interactive.create({Component: StartInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 3. Finished in 2 years 9 months, thanks to the geojunggi
const CraneInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const shrink = interpolate(frame, [1.2 * fps, 2.4 * fps], [100, 27.5], {...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1)});
  return (
    <>
      <Appear at={0}>
        <div style={sub}>그런데 단</div>
      </Appear>
      <div
        style={{
          fontWeight: 900,
          fontSize: 150,
          color: hw.gold,
          lineHeight: 1.15,
          scale: spring(frame, 0.3 * fps, 1 * fps, 0.5),
          opacity: interpolate(frame, [0.3 * fps, 0.5 * fps], [0, 1], clamp),
        }}
      >
        2년 9개월
      </div>
      <div style={{width: 900, marginTop: 20}}>
        <div style={{height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', overflow: 'hidden'}}>
          <div style={{width: `${shrink}%`, height: '100%', backgroundColor: hw.gold, borderRadius: 10}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontWeight: 700, fontSize: 44, color: colors.muted}}>
          <span>실제 공사 기간</span>
          <span>10년 계획</span>
        </div>
      </div>
      <Appear at={3.4} style={{marginTop: 40}}>
        <Crane size={620} lift={interpolate(frame, [4.2 * fps, 8 * fps], [0, 1], {...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1)})} />
      </Appear>
      <Appear at={3.8} style={{marginTop: 20}}>
        <div style={{...main, fontSize: 84}}>
          비결은 정약용의 <span style={goldText}>거중기</span>
        </div>
      </Appear>
      <Appear at={5}>
        <div style={{...sub, fontSize: 52, color: colors.muted, marginTop: 14}}>무거운 돌을 적은 힘으로 들어 올리는 기계</div>
      </Appear>
    </>
  );
};
export const CraneScene = Interactive.create({Component: CraneInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 4. Workers were paid wages
const WagesInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <Appear at={0}>
        <div style={{...sub, color: colors.muted}}>또 하나의 비결</div>
      </Appear>
      <div style={{display: 'flex', gap: 30, margin: '80px 0'}}>
        {[0, 1, 2].map((k) => {
          const t0 = (0.5 + k * 0.25) * fps;
          return (
            <div
              key={k}
              style={{
                translate: interpolate(frame, [t0, t0 + 0.5 * fps], ['0px -500px', '0px 0px'], {...clamp, easing: Easing.bounce}),
                opacity: interpolate(frame, [t0, t0 + 0.1 * fps], [0, 1], clamp),
                rotate: interpolate(frame, [t0, t0 + 0.5 * fps], ['-90deg', '0deg'], clamp),
              }}
            >
              <Coin size={230} />
            </div>
          );
        })}
      </div>
      <Appear at={1.6}>
        <div style={sub}>백성을 강제로 끌어오지 않고</div>
      </Appear>
      <Appear at={2.6} style={{marginTop: 20}}>
        <div style={main}>
          일한 만큼 <span style={goldText}>품삯</span>을
          <br />
          줬습니다
        </div>
      </Appear>
    </>
  );
};
export const Wages = Interactive.create({Component: WagesInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 5. Everything was recorded in the Uigwe
const RECORDS = ['공사 일정', '들어간 자재', '일꾼 이름·임금', '건물 도면'];
const RecordInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <Appear at={0}>
        <div style={sub}>
          정조는 이 모든 과정을
          <br />
          기록하게 합니다
        </div>
      </Appear>
      <div
        style={{
          margin: '60px 0 50px',
          scale: spring(frame, 0.5 * fps, 1.2 * fps, 0.6),
          rotate: interpolate(frame, [0.5 * fps, 1.2 * fps], ['-8deg', '0deg'], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}),
          opacity: interpolate(frame, [0.5 * fps, 0.7 * fps], [0, 1], clamp),
        }}
      >
        <Book width={380} />
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 920}}>
        {RECORDS.map((r, k) => (
          <Appear key={r} at={1.6 + k * 0.4} from="0px 30px">
            <div
              style={{
                padding: '30px 20px',
                borderRadius: 30,
                textAlign: 'center',
                backgroundColor: colors.card,
                border: `3px solid ${hw.gold}66`,
                fontWeight: 700,
                fontSize: 52,
                color: colors.text,
              }}
            >
              {r}
            </div>
          </Appear>
        ))}
      </div>
      <Appear at={4} style={{marginTop: 50}}>
        <div style={{...main, fontSize: 84}}>
          바로 <span style={goldText}>『화성성역의궤』</span>
        </div>
      </Appear>
    </>
  );
};
export const Record = Interactive.create({Component: RecordInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 6. Destroyed through colonial rule and the Korean War
const CollapseInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <AbsoluteFill style={{backgroundColor: 'rgba(5,6,12,0.6)'}} />
      <Appear at={0}>
        <div style={{...sub, color: colors.muted}}>세월이 흘러</div>
      </Appear>
      <Appear at={0.8} style={{marginTop: 20}}>
        <div style={sub}>
          일제강점기와 한국전쟁을
          <br />
          거치며
        </div>
      </Appear>
      <div style={{margin: '60px 0'}}>
        <Fortress width={940} ruin={interpolate(frame, [1.8 * fps, 4 * fps], [0, 1], {...clamp, easing: Easing.bezier(0.5, 0, 0.75, 0)})} />
      </div>
      <Appear at={3.6}>
        <div style={main}>
          화성은 <span style={{color: '#FF6B57'}}>크게 무너집니다</span>
        </div>
      </Appear>
    </>
  );
};
export const Collapse = Interactive.create({Component: CollapseInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 7. Rebuilt from the Uigwe drawings, UNESCO 1997
const RestoreInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <>
      <Appear at={0}>
        <div style={sub}>1970년대 복원 때 꺼낸 건</div>
      </Appear>
      <Appear at={0.6} style={{marginTop: 10}}>
        <div style={main}>
          바로 <span style={goldText}>그 의궤</span>였어요
        </div>
      </Appear>
      <div style={{margin: '50px 0'}}>
        <Fortress
          width={940}
          blueprint={interpolate(frame, [1 * fps, 3.4 * fps], [0, 1], {...clamp, easing: Easing.bezier(0.45, 0, 0.55, 1)})}
          color={interpolate(frame, [3.4 * fps, 4.6 * fps], [0, 1], clamp)}
        />
      </div>
      <Appear at={3.4}>
        <div style={sub}>도면대로 다시 쌓았고</div>
      </Appear>
      <div
        style={{
          marginTop: 40,
          padding: '28px 56px',
          borderRadius: 999,
          backgroundColor: hw.jade,
          fontWeight: 900,
          fontSize: 64,
          color: 'white',
          boxShadow: `0 0 80px ${hw.jade}88`,
          opacity: interpolate(frame, [5 * fps, 5.2 * fps], [0, 1], clamp),
          scale: spring(frame, 5 * fps, 5.6 * fps, 0.5),
        }}
      >
        1997 유네스코 세계유산
      </div>
    </>
  );
};
export const Restore = Interactive.create({Component: RestoreInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});

// 8. Outro with comment call-to-action
const OutroInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ctaAt = 1.6 * fps;
  return (
    <>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(232,176,75,0.28), rgba(5,6,12,0.55) 60%)'}} />
      <Fortress width={900} night />
      <Appear at={0.3} style={{marginTop: 60}}>
        <div style={main}>
          <span style={goldText}>기록</span>이 성을
          <br />
          살린 셈이죠
        </div>
      </Appear>
      <div
        style={{
          marginTop: 90,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '32px 46px',
          borderRadius: 60,
          backgroundColor: hw.gold,
          boxShadow: `0 0 90px ${hw.gold}66`,
          opacity: interpolate(frame, [ctaAt, ctaAt + 0.3 * fps], [0, 1], clamp),
          translate: interpolate(frame, [ctaAt, ctaAt + 0.5 * fps], ['0px 80px', '0px 0px'], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}),
          scale: interpolate((frame - ctaAt) % fps, [0, 0.5 * fps, fps], [1, 1.04, 1], clamp),
        }}
      >
        <CommentIcon size={88} color={hw.ink} />
        <div style={{fontWeight: 900, fontSize: 48, color: hw.ink, lineHeight: 1.3}}>
          다음엔 어떤 건축물이 궁금하세요?
          <br />
          댓글로 알려주세요!
        </div>
      </div>
    </>
  );
};
export const Outro = Interactive.create({Component: OutroInner, layout: 'absolute-fill', schema: {...Interactive.backgroundSchema}});
