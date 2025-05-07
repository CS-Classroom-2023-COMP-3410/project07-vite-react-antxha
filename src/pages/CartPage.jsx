import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cartItems, removeFromCart }) {
  return (
    <div>
      <h1>Cart</h1>
      <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

export default CartPage;