import { useState } from 'react';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
  };

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (!item) return prevCart;

      if (item.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductsPage cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />;
      case 'profile':
        return <ProfilePage />;
      case 'cart':
        return <CartPage cartItems={cartItems} removeFromCart={removeFromCart} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

      {/* Ensure ShoppingCart is available globally */}
      {cartItems.length > 0 && <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />}

      <main>{renderPage()}</main>

      <footer style={{ marginTop: '50px', padding: '20px', borderTop: '1px solid #eee', textAlign: 'center', color: '#666' }}>
        <p>React Multi-Page Application</p>
      </footer>
    </div>
  );
}

export default App;