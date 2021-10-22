import React, {useState} from 'react'

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/cart-provider';

function App() {
  const [cartShown, setCartShown] = useState(false)

  const showCartHandler = (event) => {
    setCartShown(true)
  }

  const hideCartHandler = (event) => {
    setCartShown(false)
  }

  return (
    <CartProvider>
      {cartShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
