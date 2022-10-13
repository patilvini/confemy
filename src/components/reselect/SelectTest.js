import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import SelectFormType1 from "./SelectFormType1";
import { loadOrganizationAction } from "../../redux/organization/organizationAction";
import { loadMyOrganizationsAction } from "../../redux/organization/myOrganizationsAction";
import api from "../../utility/api";

const validationSchema = yup.object({
  //   host: yup.string().required("Required"),
  organizationId: yup.string().required("Required"),
});
export default function SelectTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const organization = useSelector((state) => state.organization.organization);
  const myOrganizations = useSelector(
    (state) => state.myOrganizations.organizations
  );
  const onSubmit = (values, actions) => {
    console.log(values);
    dispatch(loadOrganizationAction(values.organizationId));
    navigate("/dashboard/create-conference");
  };
  const formik = useFormik({
    initialValues: {
      organizationId: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });
  const loadMyOrgnizations = async (id) => {
    const url = `organizations/users/${id}?orgForConference=true`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadMyOrganizationsAction(response.data?.data?.organization));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function getSelectedOrganization(value) {
    return myOrganizations.find((option) => option.value === value);
  }

  useEffect(() => {
    loadMyOrgnizations(user._id);
  }, [user._id]);

  return (
    <div className="conf-form-wrap">
      <form
        style={{ margin: 100 }}
        className="form-type-1"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <SelectFormType1
          options={myOrganizations}
          name="organizationId"
          handleChange={(option) => {
            formik.setFieldValue("organizationId", option?.value);
          }}
          //   isDisabled={formik.values.host !== "organization"}
          placeholder="Select organization"
          defaultValue={getSelectedOrganization(organization)}
        />
        <div className="mt-20">
          <button type="submit" className="button button-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
