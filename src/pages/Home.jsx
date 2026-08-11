import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ── Floating particles ───────────────────────────────────── */
function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute', bottom: '-10px', left: `${x}%`,
              width: size, height: size, borderRadius: '50%',
              background: i % 3 === 0 ? 'var(--cyan)' : i % 3 === 1 ? 'var(--teal)' : 'rgba(255,255,255,0.4)',
              opacity: 0.6,
              animation: `rise ${duration}s ${delay}s linear infinite`,
            }}
          />
        );
      })}
      <style>{`@keyframes rise { 0% { transform:translateY(0) scale(1); opacity:.6; } 50% { opacity:.3; } 100% { transform:translateY(-110vh) scale(.3); opacity:0; } }`}</style>
    </div>
  );
}

/* ── Ghost KLGW orbiting the test tube ───────────────────── */
function VaporKLGW() {
  const R = 72;
  const ORBIT_DUR = 32;
  const letters = [
    { char: 'K', fraction: 0,    pulse: 0   },
    { char: 'L', fraction: 0.25, pulse: 2.0 },
    { char: 'G', fraction: 0.5,  pulse: 4.0 },
    { char: 'W', fraction: 0.75, pulse: 6.0 },
  ];

  return (
    <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Orbiting ghost letters — outer div rotates around centre, inner div stays upright via same-speed counter-rotate */}
      {letters.map(({ char, fraction, pulse }) => (
        <div
          key={char}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            animation: `klgw-orbit ${ORBIT_DUR}s ${-fraction * ORBIT_DUR}s linear infinite`,
          }}
        >
          <div style={{
            transform: 'translate(-50%, -50%)',
            animation: `klgw-pulse 8s ${pulse}s ease-in-out infinite`,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem', fontWeight: 900,
            color: 'rgba(0,212,255,1)',
            filter: 'blur(0.5px) drop-shadow(0 0 8px rgba(0,212,255,0.9))',
            pointerEvents: 'none', userSelect: 'none',
          }}>
            {char}
          </div>
        </div>
      ))}

      {/* Tiny glowing wisp dots */}
      {[...Array(6)].map((_, i) => (
        <div key={`w${i}`} style={{
          position: 'absolute', top: '50%', left: '50%',
          animation: `klgw-orbit ${22 + i * 3}s ${-i * 3.5}s linear infinite`,
        }}>
          <div style={{
            transform: 'translate(-50%, -50%)',
            width: 3, height: 3, borderRadius: '50%',
            background: 'rgba(0,212,255,0.45)',
            animation: `klgw-wisp 3.5s ${i * 0.6}s ease-in-out infinite`,
          }} />
        </div>
      ))}

      {/* Test tube — glowing green, gently breathing */}
      <div style={{
        position: 'relative', zIndex: 3,
        fontSize: '5.2rem', lineHeight: 1,
        animation: 'tube-breathe 4s ease-in-out infinite',
        userSelect: 'none',
      }}>
        🧪
      </div>

      <style>{`
        /* rotate wrapper around centre, translateX moves it to orbit radius */
        @keyframes klgw-orbit {
          from { transform: rotate(0deg)   translateX(${R}px) rotate(0deg);    }
          to   { transform: rotate(360deg) translateX(${R}px) rotate(-360deg); }
        }
        /* Ghost pulse: very low opacity, appears and fades slowly */
        @keyframes klgw-pulse {
          0%, 15%, 85%, 100% { opacity: 0;    }
          40%, 60%           { opacity: 0.21; }
        }
        @keyframes klgw-wisp {
          0%, 100% { opacity: 0;    transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.28; transform: translate(-50%,-50%) scale(2); }
        }
        @keyframes tube-breathe {
          0%,100% { filter: drop-shadow(0 0 14px rgba(0,255,120,0.5)) drop-shadow(0 0 30px rgba(0,200,80,0.2)); transform: scale(1); }
          50%     { filter: drop-shadow(0 0 24px rgba(0,255,120,0.85)) drop-shadow(0 0 50px rgba(0,200,80,0.4)); transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

/* ── Orbital atom visual — single ring, badges 120° apart ── */
function AtomVisual() {
  // All 3 on ONE ring → guaranteed no overlap, always 120° apart
  const ORBIT_R = 175;
  const badges = [
    { icon: '⚗️', text: 'Borosilicate 3.3', startDeg: 0,   color: 'rgba(0,212,255,0.15)', border: 'rgba(0,212,255,0.4)' },
    { icon: '🏆', text: 'ISO Grade',        startDeg: 120, color: 'rgba(0,245,196,0.12)', border: 'rgba(0,245,196,0.4)' },
    { icon: '🔬', text: 'Lab Tested',       startDeg: 240, color: 'rgba(108,60,255,0.14)', border: 'rgba(140,100,255,0.4)' },
  ];

  const DURATION = 18; // all badges share same orbital period

  return (
    <div style={{
      position: 'relative',
      width: 480, height: 480,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>

      {/* Orbital track rings */}
      <div style={{
        position: 'absolute',
        width: ORBIT_R * 2 + 10, height: ORBIT_R * 2 + 10,
        borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.12)',
        animation: `spin-slow 40s linear infinite`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: ORBIT_R * 2 + 50, height: ORBIT_R * 2 + 50,
        borderRadius: '50%',
        border: '1px dashed rgba(0,212,255,0.06)',
        animation: `spin-slow 60s linear infinite reverse`,
        pointerEvents: 'none',
      }} />

      {/* Orbiting badges — each is a rotating container that places badge at "top"
          and counter-rotates the badge itself so text stays upright */}
      {badges.map(({ icon, text, startDeg, color, border }) => (
        <div
          key={text}
          style={{
            position: 'absolute',
            width: ORBIT_R * 2, height: ORBIT_R * 2,
            borderRadius: '50%',
            animation: `orbit-ring ${DURATION}s linear infinite`,
            // offset each badge's starting angle
            animationDelay: `${-(startDeg / 360) * DURATION}s`,
            pointerEvents: 'none',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            animation: `counter-ring ${DURATION}s linear infinite`,
            animationDelay: `${-(startDeg / 360) * DURATION}s`,
            pointerEvents: 'auto',
          }}>
            <div style={{
              padding: '9px 14px',
              background: color,
              border: `1px solid ${border}`,
              borderRadius: 12,
              backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', gap: 7,
              fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-1)',
              whiteSpace: 'nowrap',
              boxShadow: `0 4px 24px ${border.replace('0.4', '0.15')}`,
            }}>
              <span style={{ fontSize: '1rem' }}>{icon}</span>
              {text}
            </div>
          </div>
        </div>
      ))}

      {/* Centre orb with test tube + vapor KLGW */}
      <div style={{
        width: 210, height: 210,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(0,212,255,0.22) 0%, rgba(0,8,20,0.95) 70%)',
        border: '1px solid rgba(0,212,255,0.22)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        boxShadow: '0 0 80px rgba(0,212,255,0.18), inset 0 0 50px rgba(0,212,255,0.07)',
        animation: 'float-center 6s ease-in-out infinite',
        overflow: 'hidden',
      }}>
        <VaporKLGW />
      </div>

      <style>{`
        @keyframes spin-slow   { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes float-center{ 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes orbit-ring  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes counter-ring{ from { transform: translateX(-50%) translateY(-50%) rotate(0deg);   }
                                   to { transform: translateX(-50%) translateY(-50%) rotate(-360deg); } }
      `}</style>
    </div>
  );
}


export default function Home() {
  return (
    <div className="page-enter">

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="hero">
        {/* Layered background */}
        <div className="hero-bg" />
        <div className="hero-grid" />

        {/* Ambient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />

        {/* Rising particles */}
        <Particles />

        <div className="container hero-content" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div
            className="hero-split"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              paddingTop: '100px',
            }}
          >
            {/* Left — Text */}
            <div style={{ flex: '1 1 540px' }}>
              {/* Established badge */}
              <div className="hero-badge">
                <div className="badge-dot">✓</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)' }}>
                  Est. 1993 &nbsp;·&nbsp; Chennai, India &nbsp;·&nbsp; Borosilicate 3.3
                </span>
              </div>

              {/* BRAND NAME — primary headline */}
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: '10px',
              }}>
                <span style={{ display: 'block', color: 'var(--text-1)' }}>Kavitha Lab</span>
                <span style={{
                  display: 'block',
                  background: 'linear-gradient(135deg, var(--cyan) 0%, var(--teal) 55%, #a0f0ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Glass Works</span>
              </h1>

              {/* TAGLINE — elegant sub-label */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '28px',
              }}>
                <div style={{ width: 28, height: 1, background: 'var(--cyan)', opacity: 0.6 }} />
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: 'var(--text-2)',
                  fontStyle: 'italic',
                }}>Glass that Scientists Trust.</span>
                <div style={{ width: 28, height: 1, background: 'var(--cyan)', opacity: 0.6 }} />
              </div>

              <p className="body-lg" style={{ maxWidth: '500px', marginBottom: '40px' }}>
                Premium borosilicate glassware — manufactured in Chennai for laboratories,
                research institutions, and industrial facilities across India.
                Three decades of uncompromising precision.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/catalogue">
                  <button className="btn btn-primary btn-lg">
                    Browse Catalogue →
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="btn btn-ghost btn-lg">
                    Get a Quote
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
                {[
                  { icon: '🏭', label: '30+ Years', sub: 'In Business' },
                  { icon: '🔬', label: '500+', sub: 'Products' },
                  { icon: '🇮🇳', label: 'Made in', sub: 'Chennai' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-1)' }}>{label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Atom Visual */}
            <AtomVisual />
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--bg-void))',
          zIndex: 2,
        }} />
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="stats-bar">
            {[
              { num: '30+', label: 'Years of Excellence', icon: '🏭' },
              { num: '500+', label: 'Product Variants', icon: '🔬' },
              { num: '5000+', label: 'Clients Served', icon: '🤝' },
              { num: '100%', label: 'Borosilicate Grade', icon: '✅' },
            ].map(({ num, label, icon }) => (
              <div key={label} className="stat-cell">
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{icon}</div>
                <div className="stat-num grad-text">{num}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginTop: 6, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-label">
            <span className="label">Our Strengths</span>
          </div>
          <h2 className="display-lg" style={{ marginBottom: '60px', maxWidth: 600 }}>
            Engineered for precision.<br />
            <span className="grad-text">Built to last.</span>
          </h2>

          <div className="feature-grid">
            {[
              {
                icon: '🔬', color: 'rgba(0,212,255,0.12)', border: 'rgba(0,212,255,0.2)',
                title: 'Laboratory Grade',
                desc: 'All glassware is manufactured from borosilicate glass 3.3, offering high thermal shock resistance and chemical inertness suitable for the most demanding lab conditions.',
              },
              {
                icon: '⚗️', color: 'rgba(0,245,196,0.1)', border: 'rgba(0,245,196,0.2)',
                title: 'Custom Fabrication',
                desc: 'Need a non-standard configuration? Our skilled glassblowers craft bespoke pieces to exact specifications for research institutions and industrial clients.',
              },
              {
                icon: '📐', color: 'rgba(108,60,255,0.12)', border: 'rgba(108,60,255,0.2)',
                title: 'Precision Calibration',
                desc: 'Class A volumetric glassware with factory-certified tolerances. Every piece is calibrated to international standards.',
              },
              {
                icon: '🚀', color: 'rgba(255,179,71,0.1)', border: 'rgba(255,179,71,0.2)',
                title: 'Fast Turnaround',
                desc: 'In-house manufacturing in Chennai means shorter lead times. Standard orders shipped within 5–7 business days anywhere in India.',
              },
              {
                icon: '💎', color: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.2)',
                title: 'Competitive Pricing',
                desc: 'Direct from the manufacturer. No middlemen, no markups. Premium quality at prices that institutions can afford.',
              },
              {
                icon: '🛡️', color: 'rgba(0,245,196,0.08)', border: 'rgba(0,245,196,0.15)',
                title: '30-Year Heritage',
                desc: 'Established in 1993, our reputation is built on a foundation of trust with research labs, universities, and hospitals across Tamil Nadu.',
              },
            ].map(({ icon, color, border, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon" style={{ background: color, border: `1px solid ${border}` }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-1)' }}>{title}</h3>
                <p className="body-md" style={{ fontSize: '0.875rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────── */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div
            className="glass-bright"
            style={{
              padding: '60px',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(108,60,255,0.08) 100%)',
              textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 200, height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />
            <div className="label" style={{ marginBottom: 16 }}>Ready to Order?</div>
            <h2 className="display-md" style={{ marginBottom: 16 }}>
              Need a custom quote for your laboratory?
            </h2>
            <p className="body-lg" style={{ maxWidth: 500, margin: '0 auto 36px' }}>
              Send us your requirement list. We'll get back with a detailed quotation within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <button className="btn btn-primary btn-lg">Contact Us Now</button>
              </Link>
              <a href="mailto:kavithaglass1967@gmail.com">
                <button className="btn btn-ghost btn-lg">✉️ Email Us Directly</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
