import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isGreaterThan5 = (value) => value.length > 5;

const Checkout = (props) => {
  const [formValid, setFormValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value.trim();
    const enteredStreet = streetInputRef.current.value.trim();
    const enteredPostal = postalInputRef.current.value.trim();
    const enteredCity = cityInputRef.current.value.trim();

    setFormValid({
      name: isNotEmpty(enteredName),
      street: isNotEmpty(enteredStreet),
      city: isNotEmpty(enteredCity),
      postal: isGreaterThan5(enteredPostal),
    });

    if (
      !formValid.name &&
      !formValid.city &&
      !formValid.street &&
      !formValid.postal
    ) {
      return;
    }
    props.onConfirm({
      city: enteredCity,
      name: enteredName, 
      postal: enteredPostal, 
      street: enteredStreet
    })
  };

  const controlClassName = (bool) => {
    return `${classes.control} ${bool ? "" : classes.invalid}`;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClassName(formValid.name)}>
        <label htmlFor="name">
          Your Name {!formValid.name && " - Please enter a valid name."}
        </label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={controlClassName(formValid.street)}>
        <label htmlFor="street">
          Street {!formValid.street && " - Please enter a valid street."}
        </label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={controlClassName(formValid.postal)}>
        <label htmlFor="postal">
          Postal Code{" "}
          {!formValid.postal && " - Please enter a valid postal code."}
        </label>
        <input type="text" id="postal" ref={postalInputRef} />
      </div>
      <div className={controlClassName(formValid.city)}>
        <label htmlFor="city">
          City {!formValid.city && " - Please enter a valid city."}
        </label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
