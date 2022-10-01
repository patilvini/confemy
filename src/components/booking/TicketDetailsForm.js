import { Field } from "formik";
import { useEffect, useState } from "react";

import TextError from "../formik/TextError";

export default function TicketDetailsForm({ index ,item, errors, touched}) {

  const [errorFirstName , setErrorFirstName] = useState([])
  const [errorLastName , setErrorLastName] = useState([])
  const [errorEmail, setErrorEmail] = useState([])
 



  function validateEmail(value) {

    if (!value) {
      errorEmail[index] = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
     errorEmail[index] = 'Invalid email address'
    } else {
      errorEmail[index] = ''
    }
    return errorEmail[index];
  }


  function validateFirstName(value) {
    
    if (!value) {
   
      errorFirstName[index] = 'Required'
    } else {
      errorFirstName[index] = ''
    } 
    return errorFirstName[index];
  }

  function validateLastName(value) {
    
    if (!value) {
      errorLastName[index] = 'Required'
    } 
    else {
      errorLastName[index] = ''

    }
    return errorLastName[index];
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
             <div>{errors && <p>{errorFirstName[index]}</p>}</div>

              
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
              <div>{errors && <p>{errorLastName[index]}</p>}</div>

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
          <div>{errors && <p>{errorEmail[index]}</p>}</div>

        </div>
      </div>
    </div>
  );
}
