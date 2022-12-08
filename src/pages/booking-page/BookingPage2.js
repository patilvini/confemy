import { useSelector } from "react-redux";
import DeleteIcon from "../../components/icons/DeleteIcon";
import GuestDetails from "./GuestDetails";
import Switch from "../../components/switch/Switch";

export default function BookingPage2({
  backPage,
  cart,
  setCart,
  onFormSubmit,
  total,
  tickets,
}) {
  // function to change the cart based on guest inputs
  const user = useSelector((state) => state.auth.user);

  function handleSetCart(guest, key, value) {
    setCart((prevState) => {
      const updatedCart = prevState.map((item) =>
        item.guestId === guest.guestId ? { ...item, [key]: value } : item
      );
      return updatedCart;
    });
  }

  return (
    <>
      <div className="text-align-center mb-72">
        <h3 className="color-primary">Confirm cart details and pay</h3>
      </div>
      <div className="mb-72">
        <h3 className="color-primary mb-32">Contact info</h3>
        <div style={{ width: "83.2rem" }} className="grid-col-2 ">
          <div className="grid-1st-col">
            <div className="form-type-3">
              <input
                type="text"
                placeholder={user?.firstName}
                disabled={true}
              />
            </div>
          </div>
          <div className="grid-2nd-col">
            <div className="form-type-3">
              <input type="text" placeholder={user?.lastName} disabled={true} />
            </div>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <div className="form-type-3">
              <input type="text" placeholder={user?.email} disabled={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-80">
        <div className="flex-vc mb-24">
          <h3 className="mr-80 color-primary">Order Summery</h3>
          <button
            onClick={() => backPage()}
            className="button-outlined button-outlined-primary"
          >
            Edit
          </button>
        </div>
        <div className="bp-tickets-table-wrap">
          <table className="mb-24">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Ticket</th>
                <th>QTY</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, indx) => (
                <tr key={item.guestId}>
                  <td>Guest {indx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span>{item.currency} - </span>
                    <span>{item.price}</span>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        setCart(
                          cart.filter((guest) => guest.guestId !== item.guestId)
                        );
                      }}
                    >
                      <DeleteIcon fill="#08415c" />
                    </i>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <i className="caption-1-heavy-cblack mr-60">
                    Total: {tickets?.[0].currency} - {total}
                  </i>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="bp-total">
          <i className="caption-1-heavy-cblack mr-60">
            Total: {tickets?.[0].currency} - {total}
          </i>
        </div> */}
      </div>
      <form onSubmit={onFormSubmit} autoComplete="off">
        <div className="mb-80">
          <h3 className="color-primary mb-40">Guest Details</h3>
          {cart.map((guest, indx) => (
            <div key={guest.guestId} className="mb-60">
              <GuestDetails
                indx={indx}
                guest={guest}
                cart={cart}
                setCart={setCart}
                onInputChange={(e, guest) => {
                  //   const value = e.target.value;
                  const key = e.target.name;
                  const value =
                    e.target.type === "checkbox"
                      ? e.target.checked
                      : e.target.value;
                  handleSetCart(guest, key, value);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex-vc">
          <button type="submit" className="button button-primary mr-16">
            Submit
          </button>
          <button
            type="button"
            onClick={() => backPage()}
            className="button-text button-text-primary"
          >
            Go back
          </button>
        </div>
      </form>
    </>
  );
}
