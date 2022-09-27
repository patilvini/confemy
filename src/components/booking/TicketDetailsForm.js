import { useEffect, useState } from "react";

export default function TicketDetailsForm({ setValue, ticket }) {
  console.log(ticket)

  const [data, setData] = useState([]);

  data.length = ticket.quantity;

  for (let i = 0; i < ticket.quantity; i++) {
    data[i] = {
      firstName: "",
      lastName: "",
      email: "",
      ticketId: ticket.ticketId._id,
    };
  }

  return (
    <div className="form-type-1">
     

      {data?.map((item, index) => {
        return (
          <div key={index}>
            <h4 style={{ marginBottom: "1rem" }}>
              {"Guest "}
              {index + 1} {ticket.ticketId.name}
            </h4>
            <div
              style={{ margin: "1.6rem 0 1.6rem 0" }}
              className="form-type-1 "
            >
              <div className="flex-container-std">
                <div
                  style={{ width: "50%", margin: "0 2rem 2rem 0rem" }}
                  className="material-textfield"
                >
                  <input
                    onChange={(e) => {
                      data[index].firstName = e.target.value;
                      setValue(data);
                    }}
                    type="text"
                    placeholder=" "
                  />
                  <label>First Name*</label>
                </div>
                <div
                  style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
                  className="material-textfield"
                >
                  <input
                    onChange={(e) => {
                      data[index].lastName = e.target.value;
                      setValue(data);
                    }}
                    type="text"
                    placeholder=" "
                  />
                  <label>Last Name*</label>
                </div>
              </div>
              <div className="material-textfield">
                <input
                  onChange={(e) => {
                    data[index].email = e.target.value;
                    // setValue(data)
                  }}
                  type="email"
                  placeholder=" "
                />
                <label>Email*</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
