import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Select from "react-select";
import * as yup from "yup";
import TextError from "../formik/TextError";

const getValue = (options, value, isMulti) => {
  if (isMulti) {
    return value;
  } else {
    return options ? options?.find((option) => option.value === value) : "";
  }
};

function FormikSelect({ options, field, form }) {
  return (
    <Select
      name={field.name}
      onBlur={field.onBlur}
      onChange={(option) => {
        form.setFieldValue(field.name, option?.value);
      }}
      options={options}
      value={getValue(options, field.value)}
      //   isClearable
    />
  );
}

const SelectTest2 = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const validationSchema = yup.object().shape({
    flavors: yup.string("Required").required("Required"),
  });
  return (
    <Formik
      initialValues={{
        flavors: "",
      }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      validationSchema={validationSchema}
    >
      <Form>
        <Field name="flavors" component={FormikSelect} options={options} />
        <div className="mb-24">
          <ErrorMessage name="flavors" component={TextError} />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SelectTest2;
