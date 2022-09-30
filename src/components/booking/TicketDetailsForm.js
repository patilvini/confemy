import { Field } from "formik";
import { useEffect, useState } from "react";

import TextError from "../formik/TextError";

export default function TicketDetailsForm({ index ,item, errors, touched}) {
  console.log(errors.guests[index].firstName)
  // console.log(touched)
  console.log(index)


  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }


  function validateFirstName(value) {
    let error;
    if (!value) {
      console.log('err')
      error = 'Required';
    } 
    return error;
  }

  function validateLastName(value) {
    let error;
    if (!value) {
      error = 'Required';
    } 
    return error;
  }
 
  

  return (
    
    <div className="form-type-1">
      <div>
        <h4 style={{ marginBottom: "1rem" }}>
          {"Guest "}
          {index + 1} 
        </h4>
        <div style={{ margin: "1.6rem 0 1.6rem 0" }} className="form-type-1 ">
          <div className="flex-container-std">
            <div
              style={{ width: "50%", margin: "0 2rem 2rem 0rem" }}
              className="material-textfield"
            >
              <Field
                name={`guests.${index}.firstName`}
                type="text"
                validate={validateFirstName}
                placeholder=" "
              />
              <label>First Name*</label>
             <div>{errors?.guests[index].firstName}</div>

              
            </div>
            <div
              style={{ width: "50%", margin: "0 0rem 2rem 0rem" }}
              className="material-textfield"
            >
              <Field
                name={`guests.${index}.lastName`}
                type="text" 
                validate={validateLastName}
                placeholder=" "
              />
              <label>Last Name*</label>
              <div>{errors?.guests[index].lastName}</div>

            </div>
          </div>
          <div className="material-textfield">
            <Field
              

              name={`guests.${index}.email`}
              validate={validateEmail}
              type="email"
              placeholder=" "
            />
            <label>Email*</label>
            
          </div>
          <div>{errors?.guests[index].email}</div>

        </div>
      </div>
    </div>
  );
}
