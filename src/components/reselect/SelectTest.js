import { useEffect, useState } from "react";
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
  organizationId: yup.string().required("Required"),
});
export default function SelectTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [myOrganizations, setMyOrganizations] = useState([]);
  const organization = useSelector((state) => state.organization.organization);
  // const myOrganizations = useSelector(
  //   (state) => state.myOrganizations.organizations
  // );
  const onSubmit = (values, actions) => {
    console.log(values);
    dispatch(loadOrganizationAction(values.organizationId));
    navigate("/dashboard/create-conference");
  };
  const formik = useFormik({
    initialValues: {
      organizationId: organization || "",
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
        setMyOrganizations(response.data?.data?.organization);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadMyOrgnizations(user._id);
  }, [user._id]);

  console.log("organization", organization);
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
          onChange={(value) =>
            formik.setFieldValue("organizationId", value?.value)
          }
          placeholder="Select organization"
          value={formik.values.organizationId}
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
