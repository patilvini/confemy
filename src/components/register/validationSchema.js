import * as yup from 'yup';

const emailFormValidation = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
});

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const nameFormValidation = yup.object({
  firstName: yup
    .string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: yup
    .string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Minimum 6 characters, at least 1 uppercase letter, at least 1 lowercase letter & at least 1 number required'
    )
    .required('Required'),

  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

  // acceptTerms: yup
  //   .boolean()
  //   .required('Required')
  //   .oneOf([true], 'You must accept the terms and conditions.'),

  profession: yup
    .string()
    .oneOf(
      [
        'physician',
        'physicianAssistant',
        'nursePractitioner',
        'dentist',
        'nurse',
        'pharmacist',
        'physicalTherapist',
        'occupationalTherapist',
        'speechTherapist',
        'respiratoryTherapist',
        'dietitian',
        'socialWorker',
        'caseManagement',
        'other',
      ],
      'Please choose a profession'
    )
    .required('Required'),
});

export const validationSchema = [emailFormValidation, nameFormValidation];
