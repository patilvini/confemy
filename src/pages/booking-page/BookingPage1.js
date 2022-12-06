import { useDispatch } from "react-redux";
import SelectTickets from "./SelectTickets";
import { alertAction } from "../../redux/alert/alertAction";

export default function BookingPage1({
  setcurrentPage,
  tickets,
  total,
  cart,
  setCart,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="text-align-center">
        <h3 className="mb-16 color-primary">Conferecne title</h3>
        <p className="body-regular-gray3">
          <span>Online · </span>
          <span>May 4 10:30 - </span>
          <span>May 4 5:30</span>
        </p>
      </div>
      <div>
        {tickets?.map((ticket) => (
          <SelectTickets
            ticket={ticket}
            key={ticket._id}
            setCart={setCart}
            cart={cart}
          />
        ))}
        <div className="bp-total">
          <div className="mr-16">
            <i className="caption-1-heavy-cblack mr-16">
              Total: {tickets?.[0].currency} - {total}
            </i>
          </div>
          <div>
            <button
              onClick={() => {
                if (!cart.length > 0) {
                  return dispatch(
                    alertAction("Pick at least one ticket", "danger")
                  );
                }
                setcurrentPage(1);
              }}
              className="button button-green"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
