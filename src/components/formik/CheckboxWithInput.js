import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function CheckboxWithInput(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className='form-control'>
      <label>{label}</label>
      <Field name={name}>
        {({ field }) =>
          options.map((option) => {
            return (
              <Fragment key={option.key}>
                <input
                  type='checkbox'
                  {...field}
                  {...rest}
                  id={option.value}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label> {option.key} </label>
                {field.value.includes(option.value) && (
                  <Field type='number' name={option.name} />
                )}
              </Fragment>
            );
          })
        }
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default CheckboxWithInput;
