function Header({ cartCount, cartTotal, onCartClick }) {
  return (
    <header style={{
      background: '#1e293b',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #334155'
    }}>
      <div>
        <h1 style={{ color: '#fbbf24', fontSize: '28px', margin: 0 }}>
          🎬 MovieStore
        </h1>
        <p style={{ color: '#94a3b8', marginTop: '5px', fontSize: '14px' }}>
          Buy movies online
        </p>
      </div>

      <button 
        onClick={onCartClick}
        style={{
          background: '#fbbf24',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#0f172a'
        }}
      >
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px'
          }}>
            {cartCount}
          </span>
        )}
        {cartTotal > 0 && (
          <span style={{ color: '#0f172a', marginLeft: '5px' }}>
            ₹{cartTotal}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;