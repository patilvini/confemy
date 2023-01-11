export default function licenseForm() {
  return (
    <>
      {licenseForm || editLicense ? (
        <form
          className="form-type-1"
          autoComplete="off"
          onSubmit={handleLicenseSubmit}
        >
          <div className="grid-col-2 mb-24 mt-24">
            <div className="grid-1st-col">
              <SelectFormType1
                label="country"
                options=""
                onChange={(value) => {
                  if (formik.values.country !== value?.value) {
                    formik.setFieldValue("state", "");
                    formik.setFieldValue("city", "");
                  }
                  formik.setFieldValue("country", value?.value);
                  loadStateList(value?.countryId);
                }}
                placeholder="country"
                value="country"
              />
            </div>
            <div className="grid-2nd-col">
              <SelectFormType1
                label="state"
                options=""
                name="state"
                // onChange={(value) =>
                //   formik.setFieldValue("timezone", value?.value)
                // }
                placeholder="state"
                value="state"
              />
            </div>
          </div>
          <div>
            <div className="material-textfield">
              <input
                id="licensenumber"
                type="text"
                name="licensenumber"
                value={
                  editLicense
                    ? userData
                      ? userData?.license[0]?.licenseNumber
                      : null
                    : null
                }
                onChange={(e) => {
                  setAddLicense({
                    ...addLicense,
                    licenseNumber: e.target.value,
                  });
                }}
                placeholder=" "
                // disabled={!formik.values.mode.includes("venue")}
              />
              <label>Type license number*</label>
            </div>
            <div className="mb-24">
              {/* {formik.touched.street1 &&
                      Boolean(formik.errors.street1) && (
                        <TextError>{formik.errors.street1}</TextError>
                      )} */}
            </div>
          </div>
          <div>
            <button className="button button-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
}
