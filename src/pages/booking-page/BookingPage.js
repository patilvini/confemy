import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./bookingPage.styles.scss";
import BookingPage1 from "./BookingPage1";
import BookingPage2 from "./BookingPage2";

const pages = ["BookingPage1", "BookingPage2"];

export default function BookingPage() {
  const [currentPage, setcurrentPage] = useState(0);
  const isLastpage = currentPage === pages.length - 1;

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [ticketsCart, setTicketsCart] = useState([]);

  const { state } = useLocation();
  const { confId } = useParams();

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
            data={data}
            setData={setData}
          />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  function backPage() {
    setcurrentPage(currentPage - 1);
  }

  const desiredTicketsCart = [
    {
      id: "95959559",
      ticketsIs: "9399399iri",
      ticketsName: "base ticket",
      quantity: 1,
    },
  ];

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
  console.log("data", data);

  return (
    <div className="container pt-64">
      <div className="bookingpage-container">
        <div className="bp-content-wrap">{renderPageContent(currentPage)}</div>
      </div>
    </div>
  );
}
