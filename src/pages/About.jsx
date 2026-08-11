import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="about-hero" style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 20%, rgba(108,60,255,0.12) 0%, transparent 60%)',
          zIndex: 0,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="label" style={{ marginBottom: 16 }}>Our Story</div>
          <h1 className="display-lg" style={{ marginBottom: 20 }}>
            Three Decades of <span className="grad-text">Precision</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 600, margin: '0 auto' }}>
            From a small workshop in Chennai to a trusted name in laboratory glassware —
            Kavitha Lab Glass Works has been serving science since 1993.
          </p>
        </div>
      </div>

      <div className="container section" style={{ paddingTop: 0 }}>
        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <div className="section-label"><span className="label">Who We Are</span></div>
            <h2 className="display-md" style={{ marginBottom: 20 }}>
              Crafting glass with science-grade precision since 1993
            </h2>
            <p className="body-lg" style={{ marginBottom: 16 }}>
              Kavitha Lab Glass Works was founded in Chennai with a singular mission: to make
              high-quality laboratory glassware accessible to Indian research institutions and
              educational establishments at competitive prices.
            </p>
            <p className="body-md" style={{ marginBottom: 32 }}>
              We manufacture everything from standard volumetric flasks to highly complex custom
              distillation apparatus. Our skilled glassblowers bring decades of experience to
              every piece — combining traditional craftsmanship with modern quality controls.
            </p>
            <Link to="/contact">
              <button className="btn btn-primary">Work With Us →</button>
            </Link>
          </div>
          <div className="glass-bright" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: 20 }}>⚗️</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.5rem', marginBottom: 12 }}>
              Made in Chennai
            </h3>
            <p className="body-md">
              Every product is manufactured in our facility in Chennai, Tamil Nadu —
              ensuring quality control at every step and supporting local craftsmanship.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-label"><span className="label">Our Journey</span></div>
          <h2 className="display-md" style={{ marginBottom: 40 }}>Milestones</h2>
          <div className="timeline">
            {[
              { year: '1993', title: 'Founded in Chennai', desc: 'Kavitha Lab Glass Works established with a focus on affordable laboratory glassware for local colleges and research centres.' },
              { year: '2000', title: 'Industrial Expansion', desc: 'Expanded product line to include industrial glass equipment — condensers, reactors, and custom distillation units.' },
              { year: '2010', title: 'Pan-India Reach', desc: 'Started supplying to institutions across Tamil Nadu, Andhra Pradesh, Karnataka and Maharashtra.' },
              { year: '2015', title: 'Borosilicate Specialization', desc: 'Committed 100% to borosilicate glass 3.3 manufacturing, meeting IS 3819 standards for precision laboratory glassware.' },
              { year: '2020+', title: 'Online Presence', desc: 'Launched digital catalogue and direct order channels to serve institutions across the country more efficiently.' },
            ].map(({ year, title, desc }) => (
              <div key={year} className="timeline-item">
                <div className="timeline-dot" />
                <div className="label" style={{ marginBottom: 4 }}>{year}</div>
                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{title}</h3>
                <p className="body-md">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="section-label"><span className="label">Our Values</span></div>
          <h2 className="display-md" style={{ marginBottom: 40 }}>What drives us</h2>
          <div className="feature-grid">
            {[
              { icon: '🎯', title: 'Precision First', desc: 'Every measurement, every tolerance, every piece — built to exact specification.' },
              { icon: '🤝', title: 'Client Trust', desc: 'Long-term relationships over one-time sales. 30 years of repeat customers speaks for itself.' },
              { icon: '🌱', title: 'Made in India', desc: 'Proud to manufacture locally and support Chennai\'s skilled glass craftsmen community.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', fontSize: '1.6rem' }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 12 }}>{title}</h3>
                <p className="body-md" style={{ fontSize: '0.875rem' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
