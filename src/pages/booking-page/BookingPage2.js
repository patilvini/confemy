import { useSelector } from "react-redux";
import DeleteIcon from "../../components/icons/DeleteIcon";
import GuestDetails from "./GuestDetails";
export default function BookingPage2({
  backPage,
  cart,
  setCart,
  data,
  setData,
}) {
  const user = useSelector((state) => state.auth.user);
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("form Submitted");
  };
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
          <table>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span>{item.currency} - </span>
                    <span>{item.price}</span>
                  </td>
                  <td>
                    <span>{item.currency} - </span>
                    <span>{item.quantity * item.price}</span>
                  </td>
                  <td>
                    <i
                      onClick={() =>
                        setCart(cart.filter((tkt) => tkt._id !== item._id))
                      }
                    >
                      <DeleteIcon fill="#08415c" />
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <form onSubmit={onFormSubmit}>
        <div className="mb-80">
          <h3 className="color-primary mb-40">Guest Details</h3>
          {cart.map((item) => (
            <div className="mb-60">
              <GuestDetails ticket={item} data={data} setData={setData} />
            </div>
          ))}
        </div>
        <div className="mb-40">
          <h3 className="mb-32 color-primary">Ticket Details</h3>
          <div
            style={{ width: "83.2rem", columnGap: 24 }}
            className="grid-col-2 "
          >
            <div className="grid-1st-col">
              <div className="form-type-3">
                <input type="text" placeholder="Mobile" />
              </div>
            </div>
            <div className="grid-2nd-col flex-vc">
              <p className="caption-2-bold-cblack">
                Send e-tickets on whatsapp on this Mobile
              </p>
            </div>
            <div className="grid-1st-col">
              <div className="form-type-3">
                <input type="text" placeholder="Email" />
              </div>
            </div>
            <div className="grid-2nd-col flex-vc">
              <p className="caption-2-bold-cblack">
                Send e-tickets to this email address
              </p>
            </div>
          </div>
        </div>
        <div className="flex-vc">
          <button type="submit" className="button button-primary mr-16">
            Continue
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
