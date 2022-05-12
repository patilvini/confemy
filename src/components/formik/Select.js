import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Select(props) {
  const { label, id, name, options, ...rest } = props;
  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <Field as='select' id={id} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Select;
