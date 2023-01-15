import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import PracticeAddressForm from "./PracticeAddressForm";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

import api from "../../utility/api";

import { alertAction } from "../../redux/alert/alertAction";
import { loadUserProfileAction } from "../../redux/user-profile/userProfileAction";

export default function PracticeAddress({ practice, indx }) {
  const [editMode, setEditMode] = useState(false);

  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const dispatch = useDispatch();

  const handleDelete = async (practiceId) => {
    const newAddresses = userProfile?.practiceAddress?.filter(
      (address) => address._id !== practiceId
    );
    const formData = {
      user: {
        practiceAddress: newAddresses,
      },
    };
    try {
      const response = await api.patch(`/users/${userProfile._id}`, formData);
      if (response) {
        console.log("delete practice res", response);
        dispatch(loadUserProfileAction(response.data.data.user));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div className="mb-40">
      <div className="flex-vc mb-13">
        <h4>{practice?.name || `Practice Name`}</h4>
        <span
          className="mr-8 ml-12"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <EditIcon />
        </span>
        <span onClick={() => handleDelete(practice._id)}>
          <DeleteIcon />
        </span>
      </div>
      {editMode ? (
        <PracticeAddressForm
          practice={practice}
          indx={indx}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <div className="body-regular-gray3">
          <p>{practice?.addressLine1}</p>
          <p>{practice?.addressLine2}</p>
          <p>{(practice?.city, practice?.state)}</p>
          <p>
            {practice?.country} - {practice?.zipcode}
          </p>
        </div>
      )}
    </div>
  );
}

PracticeAddress.propTypes = {
  practice: PropTypes.object.isRequired,
  indx: PropTypes.number,
};
