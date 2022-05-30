import { Fragment } from "react";

import TextInput from "../formik/TextInput";

function EmailForm() {
  return (
    <Fragment>
      {/* 
      label prop can be passed as well. we are not using label here. 
      id prop can be passed as well for the label. we are not using id here. 
    */}
      <div className="input-container">
        <TextInput
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="username"
        />
      </div>
    </Fragment>
  );
}

export default EmailForm;
