import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CardIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCardButton = (props) => {
  const [buttonBump, setButtonBump] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${buttonBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonBump(true);

    const timer = setTimeout(() => {
      setButtonBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.showCart}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
