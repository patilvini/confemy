import React from "react";
import { Formik } from "formik";
import Select from "react-select";

const MySelect = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <Formik
      initialValues={{
        flavors: "",
      }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      {(props) => {
        const { values, handleSubmit, handleBlur, setFieldValue } = props;
        return (
          <form onSubmit={handleSubmit}>
            <div style={{ width: "200px", marginBottom: "15px" }}>
              <Select
                id={"flavors"}
                type={"text"}
                value={values.flavors}
                onChange={(option) => setFieldValue("flavors", option)}
                options={options}
                onBlur={handleBlur}
              />
            </div>
            <button>Submit</button>
          </form>
        );
      }}
    </Formik>
  );
};

export default MySelect;
