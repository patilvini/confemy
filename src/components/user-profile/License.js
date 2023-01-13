import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LicenseForm from "./LicenseForm";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import api from "../../utility/api";

import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";

export default function License({ license, indx }) {
  const [editMode, setEditMode] = useState(false);

  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const dispatch = useDispatch();

  const handleDelete = async (licenseId) => {
    const newLicenses = userProfile?.licenses?.filter(
      (license) => license._id !== licenseId
    );
    const formData = {
      user: {
        licenses: newLicenses,
      },
    };
    try {
      const response = await api.patch(`/users/${userProfile._id}`, formData);
      if (response) {
        console.log("delete license res", response);
        dispatch(loadUserProfileAction(response.data.data.user));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div>
      <div className="flex-vc">
        <h4>License {indx + 1}</h4>
        <span
          className="mr-4 ml-12"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <EditIcon className="icon-size" />
        </span>
        <span
          className="ml-12"
          onClick={() => {
            handleDelete(license?._id);
          }}
        >
          <DeleteIcon className="icon-size" />
        </span>
      </div>
      {editMode ? (
        <LicenseForm
          license={license}
          indx={indx}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <div className="mb-34 body-regular-gray3">
          <p>{license?.licenseNumber}</p>
          <p>
            {license?.state}, {license?.country}
          </p>
        </div>
      )}
    </div>
  );
}
