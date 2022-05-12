import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, id, name, labelClass, ...rest } = props;
  return (
    <div className='form-control'>
      <label className={`${labelClass}`} htmlFor={id}>
        {label}
      </label>
      <div>
        <Field id={id} name={name} {...rest} />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Input;
