function CartPage({ cart, onUpdateQuantity, onRemove, onClear, onContinueShopping }) {
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subTotal * 0.18; 
  const grandTotal = subTotal + tax;

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</h1>
        <h2 style={{ color: '#fbbf24', marginBottom: '15px' }}>Your Cart is Empty</h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          Looks like you haven't added any movies yet.
        </p>
        <button
          onClick={onContinueShopping}
          style={{
            background: '#fbbf24',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#0f172a'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px' }}>
      <h1 style={{ marginBottom: '30px', color: '#fbbf24' }}>🛒 Shopping Cart</h1>

      {/* Cart Items Table */}
      <div style={{ marginBottom: '30px' }}>
        {cart.map((item) => (
          <div key={item.imdbID} style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            background: '#1e293b',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '15px'
          }}>
            <img 
              src={item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/80x120?text=No+Image'} 
              alt={item.Title}
              style={{ width: '80px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
            />
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px', fontSize: '18px' }}>{item.Title}</h3>
              <p style={{ color: '#94a3b8', margin: '0 0 10px', fontSize: '14px' }}>
                📅 {item.Year}
              </p>
              <p style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '18px' }}>
                ₹{item.price} each
              </p>
            </div>

            {/* Quantity Controls */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              background: '#0f172a',
              padding: '10px 20px',
              borderRadius: '10px'
            }}>
              <button
                onClick={() => onUpdateQuantity(item.imdbID, item.quantity - 1)}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: 'white',
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                −
              </button>
              
              <span style={{ fontSize: '18px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              
              <button
                onClick={() => onUpdateQuantity(item.imdbID, item.quantity + 1)}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: 'white',
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <p style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => onRemove(item.imdbID)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginTop: '5px'
                }}
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '30px'
      }}>
        <div>
          <button
            onClick={onClear}
            style={{
              background: '#ef4444',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '15px'
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={onContinueShopping}
            style={{
              background: '#334155',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ← Continue Shopping
          </button>
        </div>

        <div style={{
          background: '#1e293b',
          padding: '25px',
          borderRadius: '12px',
          minWidth: '300px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#fbbf24' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Items ({totalItems}):</span>
            <span>₹{subTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>GST (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr style={{ borderColor: '#334155', margin: '15px 0' }} />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '22px',
            fontWeight: 'bold'
          }}>
            <span>Total:</span>
            <span style={{ color: '#22c55e' }}>₹{grandTotal.toFixed(2)}</span>
          </div>
          
          <button
            style={{
              width: '100%',
              background: '#22c55e',
              border: 'none',
              padding: '15px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            💳 Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;