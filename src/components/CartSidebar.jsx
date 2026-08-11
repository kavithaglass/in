import React from 'react';
import { useCart } from '../context/CartContext';

// Placeholder for quote list items (no real product images yet)
function QuoteItemImage() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,8,20,0.95) 100%)',
      gap: 3,
    }}>
      <div style={{ fontSize: '1.3rem', opacity: 0.5 }}>🔬</div>
    </div>
  );
}

export default function CartSidebar() {
  const {
    isQuoteOpen, setIsQuoteOpen,
    quoteItems, removeFromCart, clearQuote,
  } = useCart();

  // Build mailto body from quote items
  const buildMailtoLink = () => {
    const subject = encodeURIComponent('Product Quotation Request — Kavitha Lab Glass Works');
    const lines = quoteItems.map((item, i) =>
      `${i + 1}. ${item.name}\n   Size/Variant: ${item.selectedSize || 'Please advise'}\n   SKU: ${item.sku}\n   Category: ${item.category}\n   Material: ${item.material || 'Borosilicate 3.3'}\n   Standard: ${item.standard || 'IS Standard'}`
    ).join('\n\n');
    const body = encodeURIComponent(
      `Hello Kavitha Lab Glass Works,\n\nI would like to request a quotation for the following products:\n\n${lines}\n\n---\nPlease share pricing, lead time, and availability for the above items.\n\nThank you.`
    );
    return `mailto:kavithaglass1967@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSendQuote = () => {
    if (quoteItems.length === 0) return;
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
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.1rem' }}>📋</span> Quote List
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 3 }}>
              {quoteItems.length} {quoteItems.length === 1 ? 'product' : 'products'} selected
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {quoteItems.length > 0 && (
              <button
                onClick={clearQuote}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,80,80,0.3)',
                  color: 'rgba(255,120,120,0.8)',
                  borderRadius: 8, padding: '6px 10px',
                  cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                }}
              >
                Clear All
              </button>
            )}
            <button
              className="cart-close-btn btn"
              onClick={() => setIsQuoteOpen(false)}
              aria-label="Close quote list"
              style={{ padding: '8px 12px', fontSize: '1rem' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── How it works */}
        {quoteItems.length > 0 && (
          <div style={{
            margin: '0 16px 4px', padding: '10px 14px',
            background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: 10, fontSize: '0.76rem', color: 'var(--text-2)', lineHeight: 1.6,
          }}>
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>How this works: </span>
            Click <strong style={{ color: 'var(--text-1)' }}>"Send Quote Request"</strong> below — your email app will open pre-filled. We reply within 24 hours with pricing.
          </div>
        )}

        {/* ── Items */}
        <div className="cart-items">
          {quoteItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">📋</div>
              <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-1)' }}>Your quote list is empty</p>
              <p style={{ fontSize: '0.875rem' }}>
                Browse the catalogue, select a size, and click <strong>"Add to Quote"</strong>.
              </p>
            </div>
          ) : (
            quoteItems.map(item => (
              <div key={item.cartKey || item.id} className="cart-item" style={{ alignItems: 'flex-start' }}>
                {/* Image placeholder */}
                <div className="cart-item-img">
                  <QuoteItemImage />
                </div>

                {/* Info */}
                <div className="cart-item-info" style={{ flex: 1, minWidth: 0 }}>
                  <div className="cart-item-name" style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>{item.name}</div>

                  {/* ── SELECTED SIZE BADGE ── */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.64rem', color: 'var(--text-3)' }}>Size:</span>
                    <span style={{
                      padding: '2px 10px',
                      background: 'linear-gradient(135deg, var(--cyan), var(--teal))',
                      borderRadius: 100, fontSize: '0.7rem', fontWeight: 800, color: '#000',
                    }}>
                      {item.selectedSize || 'Not specified'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.68rem', color: 'var(--cyan)', fontWeight: 600 }}>{item.category}</div>
                  <div style={{ fontSize: '0.64rem', color: 'var(--text-3)', fontFamily: 'monospace', marginTop: 2 }}>{item.sku}</div>
                </div>

                {/* Remove — now uses cartKey */}
                <button
                  onClick={() => removeFromCart(item.cartKey || item.id)}
                  style={{
                    background: 'none', border: 'none',
                    color: 'var(--text-3)', cursor: 'pointer',
                    padding: '2px 6px', fontSize: '1.1rem', flexShrink: 0,
                    lineHeight: 1,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ff6060'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
                  aria-label="Remove from quote"
                  title="Remove"
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
            <div style={{
              marginBottom: 14, padding: '12px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)', borderRadius: 10,
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 4 }}>Products in your request:</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-1)' }}>
                {quoteItems.length} {quoteItems.length === 1 ? 'Item' : 'Items'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 4 }}>
                Pricing shared via email · No obligation
              </div>
            </div>

            <button className="checkout-btn" onClick={handleSendQuote}>
              📨 Send Quote Request
            </button>

            <p style={{ textAlign: 'center', marginTop: 10, fontSize: '0.72rem', color: 'var(--text-3)', lineHeight: 1.5 }}>
              Opens your email app pre-filled with all items &amp; sizes.
              We reply within <strong style={{ color: 'var(--text-2)' }}>24 hours</strong>.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
