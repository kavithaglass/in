import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const {
    isQuoteOpen, setIsQuoteOpen,
    quoteItems, removeFromCart, clearQuote,
  } = useCart();

  // Build mailto body from quote items
  const buildMailtoLink = () => {
    const subject = encodeURIComponent('Product Quotation Request — KLGW');
    const lines = quoteItems.map((item, i) =>
      `${i + 1}. ${item.name}\n   Size/Variant: ${item.selectedSize || 'Please advise'}\n   SKU: ${item.sku}\n   Category: ${item.category}\n   Standard: ${item.standard}`
    ).join('\n\n');
    const body = encodeURIComponent(
      `Hello Kavitha Lab Glass Works,\n\nI would like to request a quotation for the following products:\n\n${lines}\n\n---\nPlease share pricing, lead time, and availability for the above items.\n\nThank you.`
    );
    return `mailto:kavithaglass1967@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSendQuote = () => {
    window.location.href = buildMailtoLink();
  };

  return (
    <>
      {/* Overlay */}
      {isQuoteOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsQuoteOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`cart-sidebar ${isQuoteOpen ? 'open' : ''}`} aria-label="Quote list">

        {/* ── Header */}
        <div className="cart-header">
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.1rem' }}>📋</span> Quote List
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: 3 }}>
              {quoteItems.length} {quoteItems.length === 1 ? 'product' : 'products'} selected
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {quoteItems.length > 0 && (
              <button
                onClick={clearQuote}
                style={{ background: 'transparent', border: '1px solid rgba(255,80,80,0.25)', color: 'rgba(255,100,100,0.7)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,80,80,0.6)'; e.currentTarget.style.color = '#ff6060'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,80,80,0.25)'; e.currentTarget.style.color = 'rgba(255,100,100,0.7)'; }}
              >
                Clear All
              </button>
            )}
            <button className="cart-close-btn btn" onClick={() => setIsQuoteOpen(false)} aria-label="Close quote list">
              ✕
            </button>
          </div>
        </div>

        {/* ── How it works banner */}
        {quoteItems.length > 0 && (
          <div style={{ margin: '0 16px', padding: '12px 16px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 10, fontSize: '0.78rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>How this works:</span> Add the products you need, then click
            &nbsp;<strong style={{ color: 'var(--text-1)' }}>"Send Quote Request"</strong> below. Your email will open pre-filled — we'll reply within 24 hours with pricing.
          </div>
        )}

        {/* ── Items */}
        <div className="cart-items">
          {quoteItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">📋</div>
              <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-1)' }}>Your quote list is empty</p>
              <p style={{ fontSize: '0.875rem' }}>
                Browse the catalogue and click <strong>"+&nbsp;Add to Quote"</strong> on any product.
              </p>
            </div>
          ) : (
            quoteItems.map(item => (
              <div key={item.id} className="cart-item" style={{ alignItems: 'flex-start' }}>
                {/* Image */}
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Info */}
                <div className="cart-item-info" style={{ flex: 1 }}>
                  <div className="cart-item-name">{item.name}</div>
                  {/* ── SELECTED SIZE BADGE ── */}
                  {item.selectedSize && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 5, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>Size:</span>
                      <span style={{ padding: '2px 10px', background: 'var(--cyan)', borderRadius: 100, fontSize: '0.7rem', fontWeight: 800, color: '#000', letterSpacing: '0.03em' }}>
                        {item.selectedSize}
                      </span>
                    </div>
                  )}
                  <div style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontWeight: 600, marginBottom: 3 }}>{item.category}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'monospace' }}>{item.sku}</div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: '2px 6px', fontSize: '1rem', transition: 'color 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ff6060'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  aria-label="Remove from quote"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Footer */}
        {quoteItems.length > 0 && (
          <div className="cart-footer">
            {/* No price shown — enquiry only */}
            <div style={{ marginBottom: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: 10 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginBottom: 4 }}>Products in your quote request:</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-1)' }}>
                {quoteItems.length} {quoteItems.length === 1 ? 'Item' : 'Items'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 4 }}>
                Pricing shared via email · No obligation
              </div>
            </div>

            <button className="checkout-btn" onClick={handleSendQuote}>
              📨 Send Quote Request
            </button>

            <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.75rem', color: 'var(--text-3)', lineHeight: 1.5 }}>
              Opens your email app pre-filled. We'll reply within <strong style={{ color: 'var(--text-2)' }}>24 hours</strong> with pricing, availability & lead time.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
