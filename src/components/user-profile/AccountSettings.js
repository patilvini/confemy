import facebookIcon from "../../assets/f_logo_RGB-Blue_58.png";
import linkedInIcon from "../../assets/LI-In-Bug.png";
import twitterIcon from "../../assets/2021 Twitter logo - blue.png";
import instagramIcon from "../../assets/Instagram_Glyph_Gradient_RGB.png";
import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import SelectFormType1 from "../reselect/SelectFormType1";

export default function AccountSettings() {
  return (
    <>
      <div className="as-form-wrap">
        <div>
          <h1 className="mb-24">Basic information</h1>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>First name*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid-2nd-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>Last name*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>
            <form autocomplete="off" class="form-type-1">
              <div class="material-textfield">
                <input
                  autocomplete="false"
                  name="hidden"
                  type="text"
                  style={{ display: "none" }}
                />
                <input
                  id="profession"
                  type="text"
                  name="profession"
                  placeholder=" "
                  value=""
                  fdprocessedid="jvzwqa"
                  style={{
                    paddingBottom: "6px",
                    border: "2px solid rgb(206, 217, 222)",
                  }}
                />
                <label>Profession*</label>
              </div>
              <div class="saveinput-error"></div>
              <div class="mb-20">
                <div class="saveinput-buttons-wrap">
                  <button type="submit" class="button button-primary">
                    Save
                  </button>
                  <button type="button" class="button-text button-text-primary">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="grid-col-2 mb-24">
            <div className="grid-1st-col">
              <SelectFormType1
                label="speciality"
                options=""
                name="speciality"
                // onChange={(value) =>
                //   formik.setFieldValue("timezone", value?.value)
                // }
                placeholder="speciality"
                value="speciality"
              />
            </div>
            <div className="grid-2nd-col">
              <SelectFormType1
                label="speciality"
                options=""
                name="speciality"
                // onChange={(value) =>
                //   formik.setFieldValue("timezone", value?.value)
                // }
                placeholder="speciality"
                value="speciality"
              />
            </div>
          </div>
          <div>
            <form autocomplete="off" class="form-type-1">
              <div class="material-textfield">
                <input
                  autocomplete="false"
                  name="hidden"
                  type="text"
                  style={{ display: "none" }}
                />
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  placeholder=" "
                  value=""
                  fdprocessedid="jvzwqa"
                  style={{
                    paddingBottom: "6px",
                    border: "2px solid rgb(206, 217, 222)",
                  }}
                />
                <label>Mobile*</label>
              </div>
              <div class="saveinput-error"></div>
              <div class="mb-20">
                <div class="saveinput-buttons-wrap">
                  <button type="submit" class="button button-primary">
                    Save
                  </button>
                  <button type="button" class="button-text button-text-primary">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <form autocomplete="off" class="form-type-1">
              <div class="material-textfield">
                <input
                  autocomplete="false"
                  name="hidden"
                  type="text"
                  style={{ display: "none" }}
                />
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder=" "
                  value=""
                  fdprocessedid="jvzwqa"
                  style={{
                    paddingBottom: "6px",
                    border: "2px solid rgb(206, 217, 222)",
                  }}
                />
                <label>Email*</label>
              </div>
              <div class="saveinput-error"></div>
              <div class="mb-20">
                <div class="saveinput-buttons-wrap">
                  <button type="submit" class="button button-primary">
                    Save
                  </button>
                  <button type="button" class="button-text button-text-primary">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="my-24">
            <div style={{ alignSelf: "center" }}>
              <button
                // onClick={() => {
                //   setExternalOpen(true);
                // }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add external credits
              </span>
            </div>
          </div>

          <h2 className="mb-24">Practice Address</h2>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="addess-line-1"
                    type="text"
                    name="addess-line-1"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>Addess line 1*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid-2nd-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="addess-line-2"
                    type="text"
                    name="addess-line-2"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>Addess line 2*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>City*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid-2nd-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="state/provience"
                    type="text"
                    name="state/provience"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>State/Provience*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="zip/postal-code"
                    type="text"
                    name="zip/postal-code"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>Zip/Postal Code*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid-2nd-col">
              <div className="grid-1st-col">
                <SelectFormType1
                  label="country"
                  options=""
                  name="country"
                  // onChange={(value) =>
                  //   formik.setFieldValue("timezone", value?.value)
                  // }
                  placeholder="Country"
                  value="country"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="as-pd-icons">
              <h2>Practice Address</h2>
              <span style={{ marginRight: "8px", marginLeft: "12px" }}>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                Address line 1
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                Address line 2
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                City,State,Zip/Postal code
              </span>
            </p>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">City </span>
            </p>
          </div>
        </div>
        <div className="my-24">
          <h1>License information</h1>
          <div className="">
            <div className="as-pd-icons">
              <h2>License 1</h2>
              <span style={{ marginRight: "8px", marginLeft: "12px" }}>
                <EditIcon />
              </span>
              <span>
                <DeleteIcon />
              </span>
            </div>
            <p>
              {" "}
              <span className="caption-2-regular-gray3 mr-4">
                License no: 3r3iwrhekjfn
              </span>
            </p>
            <p className="mb-24">
              {" "}
              <span className="caption-2-regular-gray3 mr-4">Texas, USA</span>
            </p>
            <div style={{ alignSelf: "center" }}>
              <button
                // onClick={() => {
                //   setExternalOpen(true);
                // }}
                className="circle-button"
              >
                <AddIcon />
              </button>

              <span className="caption-2-regular-gray3 ml-5">
                Add external credits
              </span>
            </div>
            <div className="grid-col-2 mb-24 mt-24">
              <div className="grid-1st-col">
                <SelectFormType1
                  label="country"
                  options=""
                  name="country"
                  // onChange={(value) =>
                  //   formik.setFieldValue("timezone", value?.value)
                  // }
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
              <form autocomplete="off" class="form-type-1">
                <div class="material-textfield">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    style={{ display: "none" }}
                  />
                  <input
                    id="license-num"
                    type="text"
                    name="license-num"
                    placeholder=" "
                    value=""
                    fdprocessedid="jvzwqa"
                    style={{
                      paddingBottom: "6px",
                      border: "2px solid rgb(206, 217, 222)",
                    }}
                  />
                  <label>Type license number*</label>
                </div>
                <div class="saveinput-error"></div>
                <div class="mb-20">
                  <div class="saveinput-buttons-wrap">
                    <button type="submit" class="button button-primary">
                      Save
                    </button>
                    <button
                      type="button"
                      class="button-text button-text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h1>Social Media</h1>
          <div className="social-display-grid">
            <div className="grid-1st-col flex-vc">
              <i className="mr-16">
                <img
                  className="icon-lg"
                  src={facebookIcon}
                  alt="facebook logo"
                />
              </i>
              <p className="body-bold">Facebook</p>
            </div>
            <div class="grid-2nd-col">
              <div class="ellipsis-text">
                <span class="body-bold">facebook url</span>
              </div>
            </div>
            <div class="grid-3rd-col">
              <button type="button" class="social-delete-button">
                X
              </button>
            </div>
          </div>
          <div className="social-display-grid">
            <div className="grid-1st-col flex-vc">
              <i className="mr-16">
                <img
                  className="icon-lg"
                  src={linkedInIcon}
                  alt="linkedIn logo"
                />
              </i>
              <p className="body-bold">LinkedIn</p>
            </div>
            <div class="grid-2nd-col">
              <div class="ellipsis-text">
                <span class="body-bold">LinkedIn url</span>
              </div>
            </div>
            <div class="grid-3rd-col">
              <button type="button" class="social-delete-button">
                X
              </button>
            </div>
          </div>
          <div className="social-display-grid">
            <div className="grid-1st-col flex-vc">
              <i className="mr-16">
                <img
                  className="icon-lg"
                  src={twitterIcon}
                  alt="facebook logo"
                />
              </i>
              <p className="body-bold">Twitter</p>
            </div>
            <div class="grid-2nd-col">
              <div class="ellipsis-text">
                <span class="body-bold">Twitter url</span>
              </div>
            </div>
            <div class="grid-3rd-col">
              <button type="button" class="social-delete-button">
                X
              </button>
            </div>
          </div>
          <div className="social-display-grid">
            <div className="grid-1st-col flex-vc">
              <i className="mr-16">
                <img
                  className="icon-lg"
                  src={instagramIcon}
                  alt="facebook logo"
                />
              </i>
              <p className="body-bold">Instagram</p>
            </div>
            <div class="grid-2nd-col">
              <div class="ellipsis-text">
                <span class="body-bold">Instagram url</span>
              </div>
            </div>
            <div class="grid-3rd-col">
              <button type="button" class="social-delete-button">
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="as-footer">
        <div className="as-form-wrap social-display-grid">
          <button className="button button-primary">Save</button>
        </div>
      </div>
    </>
  );
}
