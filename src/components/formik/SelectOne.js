import React, { Fragment } from 'react';
import { useField } from 'formik';
import TextError from './TextError';

const SelectOne = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      {/*<label htmlFor={props.id || props.name}>{label}</label>*/}
      <select {...field} {...props} />
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

export default SelectOne;
