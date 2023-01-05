export default function AccountSettings() {
  return (
    <div className="as-form-wrap">
      <form autoComplete="off">
        <div className="form-type-2 ">
          <h1 className="mb-24">Basic information</h1>
          <div className="grid-col-2 mb-24">
            <div className="grid-1st-col mr-12">
              <div className="material-textfield">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  // value={formik.values.title}
                  // onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>First name*</label>
              </div>
            </div>
            <div className="grid-2nd-col ml-12">
              <div className="material-textfield">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  // value={formik.values.title}
                  // onChange={formik.handleChange}
                  placeholder=" "
                />
                <label>Last name*</label>
              </div>
            </div>
          </div>
          <div className="">
            <div className="material-textfield">
              <input
                id="profession"
                type="text"
                name="profession"
                // value={formik.values.title}
                // onChange={formik.handleChange}
                placeholder=" "
              />
              <label>Profession*</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
