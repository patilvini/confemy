import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function RadioButtons(props) {
  const { label, id, name, options, ...rest } = props;
  return (
    <div className='form-control'>
      <label htmlFor={id}>{label}</label>
      <Field id={id} name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default RadioButtons;
