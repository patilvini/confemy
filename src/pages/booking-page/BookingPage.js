import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import BookingPage1 from "./BookingPage1";
import BookingPage2 from "./BookingPage2";
import api from "../../utility/api";
import "./bookingPage.styles.scss";

import { alertAction } from "../../redux/alert/alertAction";

const pages = ["BookingPage1", "BookingPage2"];

export default function BookingPage() {
  const [currentPage, setcurrentPage] = useState(0);
  const isLastpage = currentPage === pages.length - 1;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { state } = useLocation();
  const { confId } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const url = "conferences/bookings/step2";

    const formData = {
      ticketDetails: {
        bookedBy: user?._id,
        guests: cart,
      },
    };

    console.log("formData", formData);

    try {
      const response = await api.post(url, formData);
      if (response) {
        console.log("booking step2 response", response.data.data);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  function renderPageContent(page) {
    switch (page) {
      case 0:
        return (
          <BookingPage1
            setcurrentPage={setcurrentPage}
            tickets={state}
            total={total}
            setTotal={setTotal}
            cart={cart}
            setCart={setCart}
          />
        );
      case 1:
        return (
          <BookingPage2
            backPage={backPage}
            cart={cart}
            setCart={setCart}
            onFormSubmit={onFormSubmit}
            user={user}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  function backPage() {
    setcurrentPage(currentPage - 1);
  }

  useEffect(() => {
    setTotal(
      cart.reduce(
        (accumalatedQuantity, cartItem) =>
          accumalatedQuantity + cartItem.quantity * cartItem.price,
        0
      )
    );
  }, [cart]);

  console.log("cart", cart);

  return (
    <div className="container pt-64">
      <div className="bookingpage-container">
        <div className="bp-content-wrap">{renderPageContent(currentPage)}</div>
      </div>
    </div>
  );
}
