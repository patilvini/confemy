import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Textarea(props) {
  const { label, id, name, ...rest } = props;
  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <Field as='textarea' id={id} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Textarea;
