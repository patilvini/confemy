import { useState } from "react";
export default function Guest({ guestNum, ticket, data, setData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { firstName, lastName, email } = formData;
  const onInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });

    let newGuest = [{ ...formData, [name]: value }];
    let remainingData = data.filter((item) => item._id !== ticket._id);
    // if (amt?.value > 0) {
    //   setData([...newGuest, ...remainingData]);
    // } else {
    //   setData([...remainingData]);
    // }
  };

  const whatData = [
    {
      ticketName: "Base ticket",
      ticketId: "988888e",
      firstName: "khandurao",
      lastName: "khot",
      email: "kbkhot@gmail.com",
    },
  ];

  return (
    <>
      {/* <h4 className="color-primary mb-24"> {ticket.name}</h4> */}
      <h4 className="color-primary mb-24">
        {ticket.name} · Guest {guestNum + 1}
      </h4>
      <div style={{ width: "83.2rem" }} className="grid-col-2 ">
        <div className="grid-1st-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="first name"
              name="firstName"
              value={firstName}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="grid-2nd-col">
          <div className="form-type-3">
            <input
              type="text"
              placeholder="last name"
              name="lastName"
              value={lastName}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <div className="form-type-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
