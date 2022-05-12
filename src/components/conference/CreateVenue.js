import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import TextError from '../formik/TextError';

const CreateVenue = () => {
  const initialValues = {
    venueName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  };

  const validationSchema = yup.object({
    venueName: yup.string().required('Required'),
    street1: yup.string().required('Required'),
    city: yup.string().required('Required'),
    state: yup.string().required('Required'),
    zipcode: yup.string().required('Required'),
    country: yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    console.log(values);
    const { venueName, street1, street2, city, state, zipcode, country } =
      values;
    const venueData = {
      venueName,
      street1,
      street2,
      city,
      state,
      zipcode,
      country,
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className='border-medium-grey p-2 mb-1'>
          <div className='mb-1'>
            <label className='required-label'>Add Venue</label>
          </div>
          <div>
            <label htmlFor='venueName'>Venue Name</label>
            <div>
              <Field id='venueName' type='text' name='venueName' />
            </div>
            <ErrorMessage name='venueName' component={TextError} />
          </div>
          <div>
            <label htmlFor='street1'>Address 1</label>
            <div>
              <Field id='street1' type='text' name='street1' />
            </div>
            <ErrorMessage name='street1' component={TextError} />
          </div>
          <div>
            <label htmlFor='street2'>Address 2</label>
            <div>
              <Field id='street2' type='text' name='street2' />
            </div>
          </div>
          <div className='items-makeline-left'>
            <div className='mr-1'>
              <label htmlFor='city'>City</label>
              <div>
                <Field id='city' type='text' name='city' />
              </div>
              <ErrorMessage name='city' component={TextError} />
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <div>
                <Field id='state' type='text' name='state' />
              </div>
              <ErrorMessage name='state' component={TextError} />
            </div>
          </div>
          <div className='items-makeline-left mb-1'>
            <div className='mr-1'>
              <label htmlFor='zipcode'>Zipcode</label>
              <div>
                <Field id='zipcode' type='text' name='zipcode' />
              </div>
              <ErrorMessage name='zipcode' component={TextError} />
            </div>
            <div>
              <label htmlFor='country'>Country</label>
              <div>
                <Field id='country' type='text' name='country' />
              </div>
              <ErrorMessage name='country' component={TextError} />
            </div>
          </div>
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

export default CreateVenue;
