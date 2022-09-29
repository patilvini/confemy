import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function TicketDetailsForm({ setValue, ticket, submit }) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validationSchema: {
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      email: yup.string().required("required"),
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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

  console.log(formik.values);

  return (
    <form onSubmit={submit} className="form-type-1">
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
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    id="firstName"
                    name="firstName"
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
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    id="lastName"
         name="lastName"
         type="text"
                    placeholder=" "
                  />
                  <label>Last Name*</label>
                </div>
              </div>
              <div className="material-textfield">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                />
                <label>Email*</label>
              </div>
            </div>
          </div>
        );
      })}
    </form>
  );
}
