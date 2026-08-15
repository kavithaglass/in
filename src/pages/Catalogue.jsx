import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';

// ── Image or Coming Soon placeholder ───────────────────────
function ProductImage({ src, alt, style = {} }) {
  if (!src || src === 'placeholder') {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(0,8,20,0.95) 100%)',
        gap: 10, ...style,
      }}>
        <div style={{ fontSize: '2.4rem', opacity: 0.4 }}>🔬</div>
        <div style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(0,212,255,0.45)',
          textAlign: 'center', lineHeight: 1.5,
        }}>
          Images<br />Coming Soon
        </div>
        <div style={{ width: 32, height: 1, background: 'rgba(0,212,255,0.2)' }} />
        <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>KLGW</div>
      </div>
    );
  }
  return <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, ...style }} />;
}

function KLGWWatermark() {
  return (
    <div style={{
      position: 'absolute', bottom: 8, right: 10,
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
      color: 'rgba(0,212,255,0.35)', textTransform: 'uppercase',
      pointerEvents: 'none', userSelect: 'none',
    }}>KLGW</div>
  );
}

// ── Selectable Size Chips (shared) ─────────────────────────
function SizeSelector({ sizes, selectedSize, onSelect, compact = false }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 5 : 7 }}>
      {sizes.map(s => {
        const active = selectedSize === s;
        return (
          <button
            key={s}
            onClick={e => { e.stopPropagation(); onSelect(s); }}
            style={{
              padding: compact ? '4px 10px' : '6px 14px',
              borderRadius: 100,
              border: `1px solid ${active ? 'var(--cyan)' : 'rgba(255,255,255,0.12)'}`,
              background: active ? 'rgba(0,212,255,0.18)' : 'rgba(255,255,255,0.04)',
              color: active ? 'var(--cyan)' : 'var(--text-3)',
              fontWeight: active ? 700 : 500,
              fontSize: compact ? '0.68rem' : '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.18s',
              outline: 'none',
              fontFamily: 'inherit',
              boxShadow: active ? '0 0 8px rgba(0,212,255,0.25)' : 'none',
            }}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

// ── Product Detail Modal ───────────────────────────────────
function ProductModal({ product, onClose, onAdd, addedSizes }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');

  // Reset size when product changes
  React.useEffect(() => {
    if (product) setSelectedSize(product.sizes[0] || '');
  }, [product?.id]);

  if (!product) return null;

  const isAdded = addedSizes?.[`${product.id}-${selectedSize}`];

  const enquiryBody = encodeURIComponent(
    `Hello Kavitha Lab Glass Works,\n\nI would like to enquire about the following product:\n\nProduct: ${product.name}\nSKU: ${product.sku}\nSelected Size/Variant: ${selectedSize}\nCategory: ${product.category}\nStandard: ${product.standard}\nMaterial: ${product.material}\n\nPlease share pricing, lead time, and availability.\n\nThank you.`
  );

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1100, backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(660px, 94vw)', maxHeight: '92vh', overflowY: 'auto',
        zIndex: 1200,
        background: 'rgba(5, 14, 26, 0.98)',
        border: '1px solid var(--glass-border-bright)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.85)',
      }}>
        {/* Image */}
        <div style={{ height: 220, overflow: 'hidden', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', position: 'relative', background: '#071525' }}>
          <ProductImage src={product.image} alt={product.name} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 35%, rgba(5,14,26,1) 100%)' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'absolute', bottom: 14, left: 20 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)' }}>{product.category}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '22px 26px 30px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'monospace', marginBottom: 6 }}>{product.sku}</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', fontWeight: 700, marginBottom: 10, color: 'var(--text-1)', lineHeight: 1.3 }}>{product.name}</h2>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>{product.desc}</p>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
            {[
              { label: 'Material', value: product.material },
              { label: 'Standard', value: product.standard },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: 10, padding: '11px 13px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-1)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* ── SIZE SELECTOR ── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Select Size / Variant
              </div>
              {selectedSize && (
                <div style={{ padding: '4px 12px', background: 'rgba(0,212,255,0.12)', border: '1px solid var(--cyan)', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)' }}>
                  Selected: {selectedSize}
                </div>
              )}
            </div>
            <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 8 }}>
              ↑ Click a size above to select it. Your chosen size will appear in the quote request.
            </p>
          </div>

          {/* ── SELECTED SIZE PREVIEW ── */}
          {selectedSize && (
            <div style={{ marginBottom: 20, padding: '14px 16px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quote will include</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: 'var(--text-1)', fontSize: '0.95rem' }}>{product.name}</span>
                <span style={{ padding: '3px 10px', background: 'var(--cyan)', borderRadius: 100, fontSize: '0.72rem', fontWeight: 800, color: '#000' }}>{selectedSize}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => { onAdd(product, selectedSize); onClose(); }}
              disabled={!selectedSize}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 12, border: 'none',
                cursor: selectedSize ? 'pointer' : 'not-allowed',
                background: isAdded
                  ? 'linear-gradient(135deg, var(--teal), #009975)'
                  : selectedSize
                    ? 'linear-gradient(135deg, var(--cyan), #0099cc)'
                    : 'rgba(255,255,255,0.06)',
                color: selectedSize ? '#000' : 'var(--text-3)',
                fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {isAdded ? `✓ ${selectedSize} Added to Quote` : selectedSize ? `📋 Add to Quote — ${selectedSize}` : 'Select a size first'}
            </button>

          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-3)', textAlign: 'center', marginTop: 10 }}>
            No prices shown online · We reply with pricing within 24 hours
          </p>
        </div>
      </div>
    </>
  );
}

// ── Main Catalogue Page ────────────────────────────────────
export default function Catalogue() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Track added state keyed by "productId-size" so each size is independent
  const [addedMap, setAddedMap] = useState({});
  // Track selected size per product card
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Initialise selected sizes for filtered products
  React.useEffect(() => {
    setSelectedSizes(prev => {
      const next = { ...prev };
      filtered.forEach(p => {
        if (!next[p.id]) next[p.id] = p.sizes[0] || '';
      });
      return next;
    });
  }, [filtered]);

  const handleAdd = (product, size) => {
    const chosenSize = size || selectedSizes[product.id] || product.sizes[0];
    const key = `${product.id}-${chosenSize}`;
    addToCart({ ...product, selectedSize: chosenSize, cartKey: key });
    setAddedMap(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setAddedMap(prev => ({ ...prev, [key]: false })), 2500);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <div style={{ paddingTop: 140, paddingBottom: 56, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 280, background: 'radial-gradient(ellipse, rgba(0,212,255,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div className="label" style={{ marginBottom: 14 }}>KLGW Product Catalogue</div>
          <h1 className="display-lg" style={{ marginBottom: 14 }}>
            Precision Glassware,<br /><span className="grad-text">Every Category.</span>
          </h1>
          <p className="body-lg" style={{ maxWidth: 540, margin: '0 auto 28px' }}>
            {PRODUCTS.length}+ products across {CATEGORIES.length - 1} categories —
            all Borosilicate 3.3, manufactured to IS standards.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' }}>
            {[
              { num: `${PRODUCTS.length}+`, label: 'Products' },
              { num: `${CATEGORIES.length - 1}`, label: 'Categories' },
              { num: 'Class A/B', label: 'Certified' },
              { num: 'Custom', label: 'Fabrication' },
            ].map(({ num, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', fontWeight: 700, color: 'var(--cyan)' }}>{num}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-3)', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* ── Search + View Toggle ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              placeholder="Search products, categories, specs…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '11px 14px 11px 38px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)', color: 'var(--text-1)',
                fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
              onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['grid', '⊞'], ['list', '☰']].map(([mode, icon]) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid', borderColor: viewMode === mode ? 'var(--cyan)' : 'var(--glass-border)', background: viewMode === mode ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.03)', color: viewMode === mode ? 'var(--cyan)' : 'var(--text-3)', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}>{icon}</button>
            ))}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        {/* ── Category Chips ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 36 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`filter-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
              {cat !== 'All' && <span style={{ marginLeft: 5, fontSize: '0.66rem', opacity: 0.65 }}>({PRODUCTS.filter(p => p.category === cat).length})</span>}
            </button>
          ))}
        </div>

        {/* ── How Quote Works — info bar ── */}
        <div style={{ marginBottom: 28, padding: '14px 18px', background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-1)' }}>How to order:</strong> Select your required size on each product card → click <strong style={{ color: 'var(--cyan)' }}>Add to Quote</strong> → open the Quote List (top right) → <strong style={{ color: 'var(--text-1)' }}>Send Quote Request</strong>. We reply with pricing in 24 hours.
          </span>
        </div>

        {/* ── Products ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 14 }}>🔬</div>
            <h3 style={{ marginBottom: 8 }}>No products found</h3>
            <p>Try a different search term or category</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="product-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                selectedSize={selectedSizes[product.id] || product.sizes[0]}
                onSizeSelect={size => handleSizeSelect(product.id, size)}
                isAdded={!!addedMap[`${product.id}-${selectedSizes[product.id] || product.sizes[0]}`]}
                onAdd={handleAdd}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                selectedSize={selectedSizes[product.id] || product.sizes[0]}
                onSizeSelect={size => handleSizeSelect(product.id, size)}
                isAdded={!!addedMap[`${product.id}-${selectedSizes[product.id] || product.sizes[0]}`]}
                onAdd={handleAdd}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="glass" style={{ marginTop: 56, padding: '26px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 5, fontSize: '1rem' }}>💼 Need bulk pricing or custom fabrication?</div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-2)' }}>Build your quote list above, or email us directly with your specs and quantities.</div>
          </div>
          <a href="mailto:kavithaglass1967@gmail.com" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Request Quote →</a>
        </div>
      </div>

      {/* ── Modal ── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={handleAdd}
        addedSizes={addedMap}
      />
    </div>
  );
}

// ── Grid Card ──────────────────────────────────────────────
function ProductCard({ product, selectedSize, onSizeSelect, isAdded, onAdd, onClick }) {
  return (
    <div className="product-card" style={{ cursor: 'pointer' }}>
      {/* Image — clicking image/name opens modal */}
      <div className="product-img-wrap" onClick={onClick}>
        <ProductImage src={product.image} alt={product.name} />
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(2,11,20,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 100, padding: '3px 10px', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--cyan)', textTransform: 'uppercase' }}>{product.category}</div>
        <KLGWWatermark />
      </div>

      <div className="product-body">
        {/* Header — clicking name opens modal */}
        <div onClick={onClick}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginBottom: 5, fontFamily: 'monospace' }}>{product.sku}</div>
          <h3 className="product-name" style={{ marginBottom: 8 }}>{product.name}</h3>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.desc}
          </p>
        </div>

        {/* ── SIZE SELECTOR ── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>
            Select Size
          </div>
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={onSizeSelect}
            compact={true}
          />
        </div>

        {/* ── ADD TO QUOTE ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {/* Selected size indicator */}
          {selectedSize && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-2)', textAlign: 'center' }}>
              Will add: <strong style={{ color: 'var(--cyan)' }}>{selectedSize}</strong>
            </div>
          )}
          <button
            onClick={e => { e.stopPropagation(); onAdd(product, selectedSize); }}
            style={{
              width: '100%', padding: '9px 14px', borderRadius: 8,
              border: `1px solid ${isAdded ? 'transparent' : 'rgba(0,212,255,0.3)'}`,
              background: isAdded ? 'linear-gradient(135deg, var(--teal), #009975)' : 'rgba(0,212,255,0.08)',
              color: isAdded ? '#000' : 'var(--cyan)',
              fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
              transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {isAdded ? `✓ ${selectedSize} Added` : '📋 Add to Quote'}
          </button>

        </div>
      </div>
    </div>
  );
}

// ── List Row ───────────────────────────────────────────────
function ProductRow({ product, selectedSize, onSizeSelect, isAdded, onAdd, onClick }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ background: 'var(--glass-fill)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'border-color 0.25s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--glass-border-bright)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
    >
      {/* Main row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px' }}>
        {/* Image */}
        <div onClick={onClick} style={{ width: 58, height: 58, flexShrink: 0, borderRadius: 9, overflow: 'hidden', background: '#071525', position: 'relative', cursor: 'pointer' }}>
          <ProductImage src={product.image} alt={product.name} />
          <KLGWWatermark />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={onClick}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--cyan)' }}>{product.category}</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-3)', fontFamily: 'monospace' }}>· {product.sku}</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
        </div>

        {/* Selected size badge */}
        {selectedSize && (
          <div style={{ flexShrink: 0, padding: '4px 12px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', whiteSpace: 'nowrap' }}>
            {selectedSize}
          </div>
        )}

        {/* Expand sizes */}
        <button onClick={() => setExpanded(!expanded)} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: 7, padding: '6px 11px', color: 'var(--text-2)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {expanded ? '▲ Sizes' : '▼ Sizes'}
        </button>

        {/* Add button */}
        <button
          onClick={e => { e.stopPropagation(); onAdd(product, selectedSize); }}
          style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 8, border: `1px solid ${isAdded ? 'transparent' : 'rgba(0,212,255,0.3)'}`, background: isAdded ? 'linear-gradient(135deg, var(--teal), #009975)' : 'rgba(0,212,255,0.08)', color: isAdded ? '#000' : 'var(--cyan)', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap' }}
        >
          {isAdded ? `✓ Added` : '📋 Add'}
        </button>
      </div>

      {/* Expanded sizes panel */}
      {expanded && (
        <div style={{ padding: '12px 18px 16px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.15)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>Select your required size:</div>
          <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={onSizeSelect} compact={true} />
        </div>
      )}
    </div>
  );
}
