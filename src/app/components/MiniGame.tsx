import { useState, useRef, useCallback, useEffect } from 'react';
import svgPaths from "../../imports/svg-ygh4k7cbo4";
import imgFuturisticServerRoomBackground from "figma:asset/c256faa93e00614f3231d342c9f27c5ce28dc124.png";

type GamePhase = 'idle' | 'playing' | 'gameover' | 'win';
type TargetType = 'system-bug' | 'security-threat' | 'legacy-code' | 'bottleneck';

interface GameTarget {
  id: number;
  type: TargetType;
  x: number;       // % from left (center of target)
  y: number;       // % from top (top edge of target)
  speed: number;   // % per second
  destroyed: boolean;
  destroyedAt: number | null;
}

const TARGET_TYPES: TargetType[] = ['system-bug', 'security-threat', 'legacy-code', 'bottleneck'];

const TARGET_INFO: Record<TargetType, { label: string; isCritical: boolean; iconPath: keyof typeof svgPaths; iconColor: string; points: number }> = {
  'system-bug':       { label: 'System Bug',      isCritical: true,  iconPath: 'p1b087000', iconColor: '#FF0082', points: 200 },
  'security-threat':  { label: 'Security Threat', isCritical: false, iconPath: 'p23554200', iconColor: '#FF0082', points: 150 },
  'legacy-code':      { label: 'Legacy Code',     isCritical: false, iconPath: 'p1d749e80', iconColor: '#E4E1E8', points: 100 },
  'bottleneck':       { label: 'Bottleneck',      isCritical: false, iconPath: 'p28be8780', iconColor: '#FF0082', points: 100 },
};

// When target top-edge % reaches this, it crosses YOUR WEEKEND line
const BOTTOM_THRESHOLD = 82;

interface GS {
  phase: GamePhase;
  hearts: number;
  timeLeft: number;
  score: number;
  targets: GameTarget[];
  lastTime: number | null;
  spawnTimer: number;
  nextId: number;
  rafId: number | null;
}

export function MiniGame() {
  const containerRef = useRef<HTMLDivElement>(null);

  const g = useRef<GS>({
    phase: 'idle',
    hearts: 3,
    timeLeft: 60,
    score: 0,
    targets: [],
    lastTime: null,
    spawnTimer: 3.4, // Spawn first target almost immediately
    nextId: 0,
    rafId: null,
  });

  const [rs, setRS] = useState<{
    phase: GamePhase;
    hearts: number;
    timeLeft: number;
    score: number;
    targets: GameTarget[];
  }>({ phase: 'idle', hearts: 3, timeLeft: 60, score: 0, targets: [] });

  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [shootEffects, setShootEffects] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [flashRed, setFlashRed] = useState(false);
  const shootIdRef = useRef(0);

  const sync = useCallback(() => {
    const { phase, hearts, timeLeft, score, targets } = g.current;
    setRS({ phase, hearts, timeLeft, score, targets: [...targets] });
  }, []);

  const gameLoop = useCallback((ts: number) => {
    const gs = g.current;
    if (gs.phase !== 'playing') return;

    const delta = gs.lastTime !== null ? Math.min((ts - gs.lastTime) / 1000, 0.1) : 0;
    gs.lastTime = ts;

    // Countdown
    gs.timeLeft = Math.max(0, gs.timeLeft - delta);
    if (gs.timeLeft <= 0) {
      gs.phase = 'win';
      sync();
      return;
    }

    // Spawn
    const interval = gs.timeLeft > 40 ? 3.5 : gs.timeLeft > 20 ? 2.5 : 1.8;
    gs.spawnTimer += delta;
    if (gs.spawnTimer >= interval) {
      gs.spawnTimer = 0;
      const elapsed = 60 - gs.timeLeft;
      const speed = 10 + (elapsed / 60) * 15 + (Math.random() * 4 - 2);
      const type = TARGET_TYPES[Math.floor(Math.random() * TARGET_TYPES.length)];
      gs.targets.push({
        id: gs.nextId++,
        type,
        x: 8 + Math.random() * 78,
        y: -18,
        speed,
        destroyed: false,
        destroyedAt: null,
      });
    }

    // Move targets & check boundary
    let lostHeart = false;
    gs.targets = gs.targets.filter(t => {
      if (t.destroyed) {
        return t.destroyedAt !== null && (ts - t.destroyedAt) < 450;
      }
      t.y += t.speed * delta;
      if (t.y >= BOTTOM_THRESHOLD) {
        lostHeart = true;
        return false;
      }
      return true;
    });

    if (lostHeart) {
      gs.hearts = Math.max(0, gs.hearts - 1);
      setFlashRed(true);
      setTimeout(() => setFlashRed(false), 600);
      if (gs.hearts <= 0) {
        gs.phase = 'gameover';
        sync();
        return;
      }
    }

    sync();
    gs.rafId = requestAnimationFrame(gameLoop);
  }, [sync]);

  const startGame = useCallback(() => {
    const gs = g.current;
    if (gs.rafId) cancelAnimationFrame(gs.rafId);
    gs.phase = 'playing';
    gs.hearts = 3;
    gs.timeLeft = 60;
    gs.score = 0;
    gs.targets = [];
    gs.lastTime = null;
    gs.spawnTimer = 3.4;
    gs.nextId = 0;
    gs.rafId = null;
    sync();
    gs.rafId = requestAnimationFrame(gameLoop);
  }, [gameLoop, sync]);

  useEffect(() => {
    return () => { if (g.current.rafId) cancelAnimationFrame(g.current.rafId); };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (g.current.phase !== 'playing') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = shootIdRef.current++;
    setShootEffects(prev => [...prev, { id, x, y }]);
    setTimeout(() => setShootEffects(prev => prev.filter(s => s.id !== id)), 500);
  }, []);

  const handleTargetClick = useCallback((targetId: number) => {
    const gs = g.current;
    if (gs.phase !== 'playing') return;
    const t = gs.targets.find(t => t.id === targetId);
    if (t && !t.destroyed) {
      t.destroyed = true;
      t.destroyedAt = performance.now();
      gs.score += TARGET_INFO[t.type].points;
      sync(); // Immediate visual response
    }
  }, [sync]);

  const { phase, hearts, timeLeft, score, targets } = rs;
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = Math.floor(timeLeft % 60).toString().padStart(2, '0');
  const isLow = timeLeft <= 10 && phase === 'playing';
  const heartStatuses = [hearts > 0, hearts > 1, hearts > 2];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden size-full bg-[#1b1b20] select-none"
      style={{ cursor: phase === 'playing' ? 'none' : 'default' }}
      onMouseMove={handleMouseMove}
      onClick={handleCanvasClick}
    >
      {/* Animations */}
      <style>{`
        @keyframes shootRing {
          0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3);   opacity: 0; }
        }
        @keyframes mgPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes mgFlash {
          0%   { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @keyframes mgFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mgGlow {
          0%,100% { box-shadow: 0 0 10px rgba(255,0,130,0.3); }
          50%      { box-shadow: 0 0 25px rgba(255,0,130,0.7); }
        }
        @keyframes mgScanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Server room bg */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.78%] left-0 max-w-none top-[-38.89%] w-full" src={imgFuturisticServerRoomBackground} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>

      {/* Radial grid bg */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1920 1080\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(135.76 0 0 76.368 960 540)\\'><stop stop-color=\\'rgba(255,0,130,1)\\' offset=\\'0.017678\\'/><stop stop-color=\\'rgba(255,0,130,0)\\' offset=\\'0.017678\\'/></radialGradient></defs></svg>')" }}
      />

      {/* Scanline effect */}
      {phase === 'playing' && (
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ height: '2px', background: 'rgba(255,0,130,0.08)', animation: 'mgScanline 4s linear infinite', zIndex: 5 }}
        />
      )}

      {/* ─── HUD: Top Left — Hearts + Timer ─── */}
      <div className="absolute top-[32px] left-[32px] flex flex-col gap-[16px] pointer-events-none" style={{ zIndex: 20 }}>
        {/* Hearts */}
        <div className="flex flex-col gap-[4px]">
          <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Active Operations
          </div>
          <div className="flex gap-[10px] items-center">
            {heartStatuses.map((active, i) => (
              <span key={i} style={{
                fontSize: '32px',
                lineHeight: 1,
                color: active ? '#ff0082' : 'rgba(255,0,130,0.18)',
                textShadow: active ? '0 0 12px #ff0082, 0 0 24px rgba(255,0,130,0.5)' : 'none',
                transition: 'color 0.3s, text-shadow 0.3s',
              }}>♥</span>
            ))}
          </div>
          <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#ff0082', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            {hearts === 3 ? 'Full Integrity' : hearts === 2 ? 'Degraded' : hearts === 1 ? '⚠ Critical' : 'Compromised'}
          </div>
        </div>

        {/* Timer */}
        <div className="flex flex-col gap-[4px]">
          <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Time Remaining
          </div>
          <div style={{
            fontFamily: "'Manrope', 'Manrope:ExtraBold', sans-serif",
            fontSize: '48px',
            fontWeight: 800,
            color: isLow ? '#ff0082' : 'white',
            lineHeight: 1,
            animation: isLow ? 'mgPulse 0.7s ease infinite' : 'none',
          }}>
            {mins}:{secs}
          </div>
          <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#ff0082', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            {isLow ? '⚠ Threshold Imminent' : 'Defense Active'}
          </div>
        </div>
      </div>

      {/* ─── HUD: Top Right — Score ─── */}
      <div className="absolute top-[32px] right-[32px] flex flex-col items-end gap-[4px] pointer-events-none" style={{ zIndex: 20 }}>
        <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>
          System Integrity
        </div>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '48px', color: 'white', lineHeight: 1 }}>
          {score.toString().padStart(5, '0')}
        </div>
        <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#ff0082', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
          Points Secured
        </div>
      </div>

      {/* ─── Right Sidebar ─── */}
      <div className="absolute top-[128px] right-[32px] w-[260px] pointer-events-none" style={{ zIndex: 20 }}>
        <div style={{ backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.05)', borderLeft: '2px solid rgba(255,0,130,0.3)', padding: '16px 16px 16px 18px' }}>
          <div className="flex justify-between mb-[12px]">
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', color: 'white', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Active Tasks</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', color: '#ff0082', letterSpacing: '1.2px', textTransform: 'uppercase' }}>04</span>
          </div>
          {[
            { name: 'Legacy Migration', pct: 72 },
            { name: 'DDoS Mitigation', pct: 45 },
            { name: 'Kernel Patching', pct: 12 },
          ].map(({ name, pct }) => (
            <div key={name} className="mb-[16px]">
              <div className="flex justify-between mb-[4px]">
                <span style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase' }}>{name}</span>
                <span style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase' }}>{pct}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ background: '#ff0082', height: '100%', width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Falling Targets ─── */}
      {targets.map(target => {
        const info = TARGET_INFO[target.type];
        return (
          <div
            key={target.id}
            style={{
              position: 'absolute',
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: '120px',
              transform: 'translateX(-50%)',
              zIndex: 10,
              pointerEvents: target.destroyed ? 'none' : 'auto',
              cursor: 'none',
              transition: target.destroyed ? 'opacity 0.4s ease-out, transform 0.4s ease-out' : 'none',
              opacity: target.destroyed ? 0 : 1,
            }}
            onClick={() => handleTargetClick(target.id)}
          >
            <div style={{
              backdropFilter: 'blur(4px)',
              background: target.destroyed
                ? 'rgba(255,0,130,0.35)'
                : 'rgba(255,0,130,0.07)',
              border: `1px solid ${target.destroyed ? 'rgba(255,0,130,0.6)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '4px',
              padding: '16px 16px 14px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: target.destroyed
                ? '0 0 40px rgba(255,0,130,0.8), inset 0 0 20px rgba(255,0,130,0.3)'
                : '0 0 10px rgba(255,0,130,0.15)',
              animation: !target.destroyed ? 'mgGlow 2s ease infinite' : 'none',
              transition: 'background 0.1s, box-shadow 0.1s',
              cursor: 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', transform: 'scaleY(-1)' }}>
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                  <path d={svgPaths[info.iconPath]} fill={info.iconColor} />
                </svg>
              </div>
              <div style={{
                fontFamily: "'Segoe UI Symbol', sans-serif",
                fontSize: '10px',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '-0.5px',
                whiteSpace: 'nowrap',
              }}>
                {info.label}
              </div>
              <div style={{
                fontFamily: "'Segoe UI Symbol', sans-serif",
                fontSize: '8px',
                color: '#ff0082',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '4px',
                opacity: 0.8,
              }}>
                +{info.points} pts
              </div>
              {info.isCritical && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ff0082',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '8px',
                  color: 'white',
                  fontFamily: "'Segoe UI Symbol', sans-serif",
                  letterSpacing: '0.5px',
                  boxShadow: '0 0 8px rgba(255,0,130,0.6)',
                }}>
                  CRITICAL
                </div>
              )}
              {/* Hover glow indicator */}
              {!target.destroyed && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(255,0,130,0)',
                  borderRadius: '4px',
                  transition: 'border-color 0.1s',
                }} className="target-hover-ring" />
              )}
            </div>
          </div>
        );
      })}

      {/* ─── Mouse Crosshair ─── */}
      {phase === 'playing' && (
        <div
          style={{
            position: 'absolute',
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
            width: '96px',
            height: '96px',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,0,130,0.4)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#ff0082', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#ff0082', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', background: '#ff0082', borderRadius: '50%', boxShadow: '0 0 15px #ff0082, 0 0 30px rgba(255,0,130,0.5)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '16px', height: '16px', borderTop: '2px solid #ff0082', borderLeft: '2px solid #ff0082' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', borderTop: '2px solid #ff0082', borderRight: '2px solid #ff0082' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '16px', height: '16px', borderBottom: '2px solid #ff0082', borderLeft: '2px solid #ff0082' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderBottom: '2px solid #ff0082', borderRight: '2px solid #ff0082' }} />
        </div>
      )}

      {/* ─── Shoot Effects ─── */}
      {shootEffects.map(fx => (
        <div
          key={fx.id}
          style={{
            position: 'absolute',
            left: fx.x,
            top: fx.y,
            width: '50px',
            height: '50px',
            border: '2px solid #ff0082',
            borderRadius: '50%',
            boxShadow: '0 0 12px rgba(255,0,130,0.6), inset 0 0 8px rgba(255,0,130,0.3)',
            pointerEvents: 'none',
            zIndex: 200,
            animation: 'shootRing 0.5s ease-out forwards',
          }}
        />
      ))}

      {/* ─── Screen Flash on Heart Loss ─── */}
      {flashRed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(186,26,26,0.35)',
            pointerEvents: 'none',
            zIndex: 300,
            animation: 'mgFlash 0.6s ease-out forwards',
          }}
        />
      )}

      {/* ─── Bottom: YOUR WEEKEND Line ─── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 20 }}>
        <div style={{ height: '4px', background: 'linear-gradient(90deg, rgba(255,0,130,0) 0%, #ff0082 50%, rgba(255,0,130,0) 100%)', opacity: 0.8, boxShadow: '0 0 20px #ff0082' }} />
        <div style={{ backdropFilter: 'blur(12px)', background: 'rgba(27,27,32,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '12px 0', position: 'relative' }}>
          <div style={{ transform: 'scaleY(-1)' }}>
            <svg width="14.01" height="15.99" viewBox="0 0 14.01 15.9886" fill="none">
              <path d={svgPaths.p38290e40} fill="#FF0082" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '14px', color: 'white', textTransform: 'uppercase', letterSpacing: '5.6px' }}>
            Your Weekend
          </span>
          <div style={{ transform: 'scaleY(-1)' }}>
            <svg width="14.01" height="15.99" viewBox="0 0 14.01 15.9886" fill="none">
              <path d={svgPaths.p38290e40} fill="#FF0082" />
            </svg>
          </div>
          <div style={{ position: 'absolute', right: '36px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '10px', color: '#e4e1e8', textTransform: 'uppercase' }}>
              Failure Threshold
            </span>
            <div style={{ background: '#ba1a1a', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', color: 'white', fontFamily: "'Segoe UI Symbol', sans-serif" }}>
              HIGH RISK
            </div>
          </div>
        </div>
      </div>

      {/* ─── Corner Identity ─── */}
      <div className="absolute bottom-[64px] left-[32px] pointer-events-none" style={{ zIndex: 20 }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '8px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Architecture Node</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '18px', color: 'white' }}>NX-9000-GLB</div>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'rgba(228,225,232,0.2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '8px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Sector Authority</div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '18px', color: 'white' }}>EMEA-HUB-01</div>
          </div>
        </div>
      </div>

      {/* ══════════ OVERLAY SCREENS ══════════ */}

      {/* START */}
      {phase === 'idle' && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(27,27,32,0.88)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'mgFadeUp 0.5s ease-out' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', maxWidth: '520px' }}>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '11px', color: '#ff0082', textTransform: 'uppercase', letterSpacing: '5px' }}>
              Mission Briefing
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '52px', color: 'white', lineHeight: 1.1 }}>
              DEFEND YOUR<br /><span style={{ color: '#ff0082' }}>WEEKEND</span>
            </div>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '13px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '0.8px', lineHeight: 1.8 }}>
              System threats are descending toward your weekend.<br />
              <span style={{ color: '#ff0082' }}>Click to shoot</span> them before they cross the line.
            </div>
            <div style={{ display: 'flex', gap: '28px', padding: '14px 24px', background: 'rgba(255,0,130,0.06)', border: '1px solid rgba(255,0,130,0.2)', borderRadius: '4px' }}>
              {[
                { icon: '♥', label: '3 Hearts' },
                { icon: '⏱', label: '60 Seconds' },
                { icon: '🎯', label: 'Click to Shoot' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '22px' }}>{icon}</span>
                  <span style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '9px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '9px', fontFamily: "'Segoe UI Symbol', sans-serif", color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span style={{ color: '#ff0082' }}>● Critical</span> = 200 pts &nbsp;|&nbsp;
              <span>Security = 150 pts</span> &nbsp;|&nbsp;
              <span>Others = 100 pts</span>
            </div>
            <button
              onClick={startGame}
              style={{
                background: '#ff0082',
                border: 'none',
                borderRadius: '4px',
                padding: '14px 44px',
                color: 'white',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(255,0,130,0.5)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                marginTop: '4px',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,130,0.8)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(255,0,130,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Initialize Defense
            </button>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'gameover' && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(18,10,10,0.92)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'mgFadeUp 0.5s ease-out' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '11px', color: '#ba1a1a', textTransform: 'uppercase', letterSpacing: '5px' }}>
              System Compromised
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '52px', color: '#ba1a1a', lineHeight: 1.1 }}>
              WEEKEND<br />DESTROYED
            </div>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '12px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Threats overwhelmed the defense perimeter
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '36px', color: 'white', marginTop: '8px' }}>
              <span style={{ color: '#e4e1e8', fontSize: '14px', fontWeight: 400 }}>FINAL SCORE </span>
              <span style={{ color: '#ff0082' }}>{score.toString().padStart(5, '0')}</span>
            </div>
            <button
              onClick={startGame}
              style={{
                background: '#ba1a1a',
                border: 'none',
                borderRadius: '4px',
                padding: '14px 44px',
                color: 'white',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(186,26,26,0.5)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                marginTop: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(186,26,26,0.8)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(186,26,26,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Retry Defense
            </button>
          </div>
        </div>
      )}

      {/* WIN */}
      {phase === 'win' && (
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(27,27,32,0.9)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'mgFadeUp 0.5s ease-out' }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '11px', color: '#ff0082', textTransform: 'uppercase', letterSpacing: '5px' }}>
              Mission Complete
            </div>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '52px', color: 'white', lineHeight: 1.1 }}>
              WEEKEND<br /><span style={{ color: '#ff0082' }}>SECURED</span>
            </div>
            <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '12px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              All threats neutralized · System integrity maintained
            </div>
            <div style={{ display: 'flex', gap: '32px', marginTop: '8px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '36px', color: '#ff0082' }}>{score.toString().padStart(5, '0')}</div>
                <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '9px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>Final Score</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(228,225,232,0.2)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '36px', color: 'white' }}>
                  {[...Array(hearts)].map((_, i) => <span key={i} style={{ color: '#ff0082', textShadow: '0 0 10px #ff0082' }}>♥</span>)}
                  {[...Array(3 - hearts)].map((_, i) => <span key={i} style={{ color: 'rgba(255,0,130,0.2)' }}>♥</span>)}
                </div>
                <div style={{ fontFamily: "'Segoe UI Symbol', sans-serif", fontSize: '9px', color: '#e4e1e8', textTransform: 'uppercase', letterSpacing: '1px' }}>Hearts Left</div>
              </div>
            </div>
            <button
              onClick={startGame}
              style={{
                background: '#ff0082',
                border: 'none',
                borderRadius: '4px',
                padding: '14px 44px',
                color: 'white',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(255,0,130,0.5)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                marginTop: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(255,0,130,0.8)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(255,0,130,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
