import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingCart from "../booking/BookingCart";
import DropdownIcon from "../icons/DropdownIcon";


export default function ShoppingCart() {
const [openCart, setOpenCart] = useState(false);
  const onDropdownClick = () => setOpenCart(!openCart);



  const ref = useRef();


  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpenCart(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  

  return (
    <div  ref={ref}>
      <div
        className="user-name-wrapper mr-20"
        onClick={onDropdownClick}
        // onMouseEnter={() => setOpenCart(true)}
        // onMouseLeave={() => setOpenCart(false)}
      >
        <span className="signin">Cart</span>
        <div><DropdownIcon  className="icon-size" /></div>
        
      </div>
      <div
        className={openCart ? "" : "display-none"}
        // onMouseEnter={() => setOpenCart(true)}
        // onMouseLeave={() => setOpenCart(false)}
      >
        <BookingCart className="cart"/>
      </div>
    </div>)

  }