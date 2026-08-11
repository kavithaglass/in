import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Creates a mailto link with the form data
    const subject = encodeURIComponent(form.subject || 'Enquiry from Website');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:kavithaglass1967@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ padding: '160px 0 60px', position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 80% at 50% 10%, rgba(0,245,196,0.08) 0%, transparent 60%)',
          zIndex: 0,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="label" style={{ marginBottom: 16 }}>Get In Touch</div>
          <h1 className="display-lg" style={{ marginBottom: 16 }}>
            Let's talk <span className="grad-text">glass</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 500, margin: '0 auto' }}>
            Have a requirement? Need a custom piece? Looking for bulk pricing?
            We respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="container section" style={{ paddingTop: '40px' }}>
        <div className="contact-grid">
          {/* Info Column */}
          <div>
            <h2 className="display-md" style={{ marginBottom: 32 }}>Contact Information</h2>

            {[
              {
                icon: '✉️', title: 'Email Us',
                content: 'kavithaglass1967@gmail.com',
                sub: 'We reply within 24 business hours',
                href: 'mailto:kavithaglass1967@gmail.com',
              },
              {
                icon: '📍', title: 'Location',
                content: 'Chennai, Tamil Nadu, India',
                sub: 'Manufacturing unit & showroom',
                href: 'https://share.google/IpH6xXf3GpUxeKt3z',
              },
              {
                icon: '🕐', title: 'Business Hours',
                content: 'Monday – Saturday',
                sub: '9:00 AM – 6:00 PM IST',
                href: null,
              },
            ].map(({ icon, title, content, sub, href }) => (
              <div key={title} className="contact-card">
                <div className="contact-icon">{icon}</div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>{title}</div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : ''} rel="noopener noreferrer"
                       style={{ fontWeight: 600, color: 'var(--cyan)', fontSize: '0.95rem' }}>
                      {content}
                    </a>
                  ) : (
                    <div style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: '0.95rem' }}>{content}</div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Google Business link */}
            <a
              href="https://share.google/IpH6xXf3GpUxeKt3z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
            >
              📍 View Business on Google Maps
            </a>
          </div>

          {/* Form Column */}
          <div>
            <div className="glass-bright" style={{ padding: '40px' }}>
              <h2 className="display-md" style={{ fontSize: '1.5rem', marginBottom: 8 }}>Send an Enquiry</h2>
              <p className="body-md" style={{ marginBottom: 28, fontSize: '0.875rem' }}>
                Fill in the form below and we'll respond with a quotation.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                  <h3 style={{ marginBottom: 8 }}>Message Sent!</h3>
                  <p className="body-md">Your email client should have opened. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Dr. Rajesh Kumar', required: true },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@institution.edu', required: true },
                    { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', required: false },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Bulk order enquiry', required: true },
                  ].map(({ id, label, type, placeholder, required }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}
                      >
                        {label} {required && <span style={{ color: 'var(--cyan)' }}>*</span>}
                      </label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        value={form[id]}
                        onChange={e => setForm(prev => ({ ...prev, [id]: e.target.value }))}
                        style={{
                          width: '100%', padding: '12px 16px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-1)', fontSize: '0.9rem',
                          outline: 'none', transition: 'border-color 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
                        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}
                    >
                      Message / Requirements <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Please describe your requirement, including quantities, specifications, or any custom needs..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      style={{
                        width: '100%', padding: '12px 16px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-1)', fontSize: '0.9rem',
                        resize: 'vertical', outline: 'none',
                        transition: 'border-color 0.2s', fontFamily: 'inherit',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
                      onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>
                    Send Enquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
