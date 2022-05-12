import React, { Fragment } from 'react';
import { useField } from 'formik';
import TextError from './TextError';

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)

  const [field, meta] = useField(props);
  return (
    <Fragment>
      {/* 
      label prop can be passed as well
      id prop can be passed as well for the label
      <label htmlFor={props.id || props.name}>{label}</label>
    */}
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <TextError>
          {meta.error}
          {/*
            Other way of doing error is as follows. It works fine. 
            Import ErrorMessage from firmik, then do following.
            <ErrorMessage name={props.name} component={TextError} /> 
        */}
        </TextError>
      ) : null}
    </Fragment>
  );
};

export default TextInput;
