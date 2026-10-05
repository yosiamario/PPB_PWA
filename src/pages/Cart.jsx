import React from 'react'

function Cart({ cart, updateCartQuantity, removeFromCart }) {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="page">
      <h1 className="display">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="lede">Your cart is currently empty.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.name} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--line)' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '60px', objectFit: 'contain', marginRight: '20px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0' }} className="display">{item.name}</h3>
                  <p style={{ margin: 0, color: 'var(--steel)' }}>${item.price.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateCartQuantity(item.name, item.quantity - 1)} style={{ padding: '4px 8px', cursor: 'pointer' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.name, item.quantity + 1)} style={{ padding: '4px 8px', cursor: 'pointer' }}>+</button>
                  <button onClick={() => removeFromCart(item.name)} style={{ marginLeft: '10px', padding: '4px 8px', color: 'red', cursor: 'pointer' }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <h2 className="display" style={{ margin: '0 0 16px 0' }}>Total: ${totalAmount.toLocaleString()}</h2>
            <button style={{ padding: '12px 24px', background: 'var(--brass, #b8860b)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>Checkout</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart
