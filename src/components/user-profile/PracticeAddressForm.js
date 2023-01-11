import { useState } from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import SelectFormType1 from "../reselect/SelectFormType1";
import { useFormik } from "formik";

export default function PracticeAddressForm() {
  const [userData, setUserData] = useState("");
  const [addressForm, setAdressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const [addPracticeAddress, setAddPracticeAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
  });

  const onPracticeAdressChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAddPracticeAddress({ ...addPracticeAddress, [name]: value });
  };

  const handleAdsressSubmit = async (e) => {
    e.preventDefault();
    let address = [addPracticeAddress];
    if (userData?.practiceAddress?.length > 0) {
      address = [...userData?.practiceAddress, ...address];
    }
  };

  return (
    <>
      {addressForm || editAddress ? (
        <form
          className="form-type-1 mb-20"
          autoComplete="off"
          onSubmit={handleAdsressSubmit}
        >
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <div className="material-textfield">
                <input
                  id="adressLine1"
                  type="text"
                  name="adressLine1"
                  value={
                    editAddress
                      ? userData
                        ? userData?.practiceAddress?.addressLine1
                        : null
                      : null
                  }
                  onChange={onPracticeAdressChange}
                  placeholder=" "
                  // disabled={!formik.values.mode.includes("venue")}
                />
                <label>Address line 1*</label>
              </div>
              <div className="mb-24">
                {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
              </div>
            </div>
            <div className="grid-2nd-col">
              <div className="material-textfield">
                <input
                  id="adressLine2"
                  type="text"
                  name="adressLine2"
                  value={
                    editAddress
                      ? userData
                        ? userData?.practiceAddress?.addressLine2
                        : null
                      : null
                  }
                  onChange={onPracticeAdressChange}
                  placeholder=" "
                  // disabled={!formik.values.mode.includes("venue")}
                />
                <label>Address line 2*</label>
              </div>
              <div className="mb-24">
                {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
              </div>
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <div className="material-textfield">
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={
                    editAddress
                      ? userData
                        ? userData?.practiceAddress?.city
                        : null
                      : null
                  }
                  onChange={onPracticeAdressChange}
                  placeholder=" "
                  // disabled={!formik.values.mode.includes("venue")}
                />
                <label>City*</label>
              </div>
              <div className="mb-24">
                {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
              </div>
            </div>
            <div className="grid-2nd-col">
              <div className="material-textfield">
                <input
                  id="state/provience"
                  type="text"
                  name="state/provience"
                  value={
                    editAddress
                      ? userData
                        ? userData?.practiceAddress?.state
                        : null
                      : null
                  }
                  onChange={onPracticeAdressChange}
                  placeholder=" "
                  // disabled={!formik.values.mode.includes("venue")}
                />
                <label>State/Provience*</label>
              </div>
              <div className="mb-24">
                {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
              </div>
            </div>
          </div>
          <div className="grid-col-2">
            <div className="grid-1st-col">
              <div className="material-textfield">
                <input
                  id="zip/postalcode"
                  type="text"
                  name="zip/postalcode"
                  value={
                    editAddress
                      ? userData
                        ? userData?.practiceAddress?.zipcode
                        : null
                      : null
                  }
                  onChange={onPracticeAdressChange}
                  placeholder=" "
                  // disabled={!formik.values.mode.includes("venue")}
                />
                <label>Zip/Postal code*</label>
              </div>
              <div className="mb-24">
                {/* {formik.touched.street1 &&
                        Boolean(formik.errors.street1) && (
                          <TextError>{formik.errors.street1}</TextError>
                        )} */}
              </div>
            </div>
            <div className="grid-2nd-col">
              <div className="grid-1st-col">
                <SelectFormType1
                  label="country"
                  options={userData.country}
                  name="country"
                  // onChange={(value) =>
                  //   formik.setFieldValue("country", value?.value)
                  // }
                  placeholder="Country"
                  value="country"
                />
              </div>
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
      <div>
        <div className="as-pd-icons">
          <h4>Practice Address</h4>
          <span
            style={{ marginRight: "8px", marginLeft: "12px" }}
            onClick={() => {
              setEditAddress(!editAddress);
              console.log("edit icon is clicked");
            }}
          >
            <EditIcon />
          </span>
          <span>
            <DeleteIcon />
          </span>
        </div>
        <p className="mt-20 mb-4">
          {" "}
          <span className="caption-2-regular-gray3 ">
            {userData ? userData?.practiceAddress?.addressLine1 : null}
          </span>
        </p>
        <p>
          {" "}
          <span className="caption-2-regular-gray3 mr-4">
            {userData ? userData.practiceAddress?.addressLine2 : null}
          </span>
        </p>
        <p className="my-4">
          {" "}
          <span className="caption-2-regular-gray3 mr-4">
            {userData
              ? `${userData.practiceAddress?.city},${userData.practiceAddress?.state},${userData.practiceAddress?.zipcode}`
              : null}
          </span>
        </p>
        <p className="my-4">
          {" "}
          <span className="caption-2-regular-gray3 mr-4">
            {userData ? userData?.practiceAddress?.country : null}
          </span>
        </p>
      </div>
    </>
  );
}
