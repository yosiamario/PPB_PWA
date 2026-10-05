import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  const addToCart = (gun) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === gun.name);
      if (existing) {
        return prev.map(item => item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...gun, quantity: 1 }];
    });
  }

  const updateCartQuantity = (name, quantity) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.name !== name);
      }
      return prev.map(item => item.name === name ? { ...item, quantity } : item);
    });
  }

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={cartCount} />
      <main className="main">
        {tab === 'Catalog' && <Catalog addToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
        {tab === 'Cart' && <Cart cart={cart} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />}
      </main>
      <Footer />
    </div>
  )
}
export default App
