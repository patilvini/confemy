import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";

const ticketAmounts = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
];

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

const customStyles = {
  control: (styles, state) => {
    return {
      ...styles,
      minWidth: 110,
      backgroundColor: state.isDisabled ? shade2 : confemyWhite,
      border: state.isFocused ? "1px solid #55a0fa" : `1px solid ${shade1}`,
      padding: "4px 0px 4px 0px",
      fontFamily: "Avenir-Roman",
      fontSize: "1.6rem",
      ":hover": {
        border: state.isFocused ? "1px solid #55a0fa" : `solid 1px ${shade4}`,
      },
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
      color: state.isDisabled ? shade4 : "hsl(0, 0%, 50%)",
      fontFamily: "Avenir-Roman",
      fontSize: "1.6rem",
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      color: confemyBlac,
      fontSize: "1.4rem",
      fontFamily: "Avenir-Roman",
    };
  },
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      paddingRight: 6,
      paddingLeft: 4,
    };
  },

  noOptionsMessage: (provided, state) => {
    return {
      ...provided,
      backgroundColor: shade3,
      color: confemyBlac,
      fontSize: 16,
    };
  },
};

export default function SelectTickets({ ticket, cart, setCart }) {
  const [ticketsNumber, setTicketsNumber] = useState(0);

  const onTicketsSelect = (amt) => {
    let newCart = [];
    for (let i = 0; i < amt?.value; i++) {
      newCart.push({
        ...ticket,
        quantity: 1,
        guestId: uuid().slice(0, 8),
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        mobile: "",
        whatsApp: false,
      });
    }
    // let newCart = [{ ...ticket, quantity: amt?.value }];
    let remainingCart = cart.filter((item) => item._id !== ticket._id);
    if (amt?.value > 0) {
      setCart([...newCart, ...remainingCart]);
    } else {
      setCart([...remainingCart]);
    }
    setTicketsNumber(amt?.value);
  };

  useEffect(() => {
    const ticketQty = cart?.filter((item) => item._id === ticket._id)?.length;
    setTicketsNumber(ticketQty);
  }, []);

  return (
    <>
      <div key={ticket._id} className="bp-tickets-grid">
        <div className="grid-1st-col">
          <h3 className="mb-8 color-primary">{ticket.name}</h3>
          <h4 className="mb-8 color-primary">
            {ticket.currency} - {ticket.price}
          </h4>
          <p className="body-regular-gray3">
            Optional donation to support the National Independent Venue
            Association, a non-profit organization whose mission is to preserve
            and nurture the ecosystem of independent venues and promoters
            throughout the United States.
          </p>
        </div>
        <div className="grid-2nd-col">
          <div className="flex-vc">
            <div className="caption-1-heavy-cblack mr-16">
              <span style={{ display: "inline-block" }} className="mr-8 mb-8">
                {ticket.currency}
              </span>
              <span style={{ display: "inline-block" }} className="mr-8 mb-8">
                {ticket.price}
              </span>
              <span style={{ display: "inline-block" }} className="mr-8 mb-8">
                X
              </span>
            </div>
            <div>
              <Select
                options={ticketAmounts}
                onChange={onTicketsSelect}
                isClearable
                name="ticketsNumber"
                value={ticketAmounts.find((obj) => obj.value === ticketsNumber)}
                styles={customStyles}
                placeholder="QTY"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
