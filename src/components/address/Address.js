import TextError from "../formik/TextError";

export default function Address(props) {
  const { formik } = props;
  return (
    <>
      <div className="input-container">
        <input
          id="street1"
          type="text"
          name="street1"
          value={formik?.values.street1}
          onChange={formik?.handleChange}
          placeholder="Address line 1"
        />

        {formik?.touched.street1 && Boolean(formik?.errors.street1) && (
          <TextError>{formik?.errors.street1}</TextError>
        )}
      </div>

      <div className="input-container">
        <input
          id="street2"
          type="text"
          name="street2"
          value={formik?.values.street2}
          onChange={formik?.handleChange}
          placeholder="Address line 2"
        />

        {formik?.touched.street2 && Boolean(formik?.errors.street2) && (
          <TextError>{formik?.errors.street2}</TextError>
        )}
      </div>

      <div className="input-container">
        <input
          id="city"
          type="text"
          name="city"
          value={formik?.values.city}
          onChange={formik?.handleChange}
          placeholder="City"
        />

        {formik?.touched.city && Boolean(formik?.errors.city) && (
          <TextError>{formik?.errors.city}</TextError>
        )}
      </div>

      <div className="input-container">
        <input
          id="state"
          type="text"
          name="state"
          value={formik?.values.state}
          onChange={formik?.handleChange}
          placeholder="State"
        />

        {formik?.touched.state && Boolean(formik?.errors.state) && (
          <TextError>{formik?.errors.state}</TextError>
        )}
      </div>
      <div className="input-container">
        <input
          id="country"
          type="text"
          name="country"
          value={formik?.values.country}
          onChange={formik?.handleChange}
          placeholder="Country"
        />

        {formik?.touched.country && Boolean(formik?.errors.country) && (
          <TextError>{formik?.errors.country}</TextError>
        )}
      </div>
    </>
  );
}
