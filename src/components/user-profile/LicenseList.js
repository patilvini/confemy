import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LicenseForm from "./LicenseForm";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import api from "../../utility/api";

export default function LicenseList({ license, indx }) {
  const [newData, setNewData] = useState();
  const [editMode, setEditMode] = useState(false);

  const userProfile = useSelector((state) => state.userProfile.userProfile);

  const handleDelete = (id) => {
    let newLicense = userProfile?.licenses?.filter(
      (license) => license._id !== id
    );
    let data = {
      ...userProfile,
      licenses: [...newLicense],
    };
    setNewData(data);
  };

  const updatedLicense = async () => {
    try {
      let { data } = await api.patch(`/users/${userProfile._id}`, newData);
      console.log("responce------", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updatedLicense();
  }, [newData]);

  return (
    <div>
      <div className="flex">
        <h4>License</h4>
        <span
          className="mr-4 ml-12"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <EditIcon />
        </span>
        <span
          className="ml-12"
          onClick={() => {
            handleDelete(license?._id);
          }}
        >
          <DeleteIcon />
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
        <div className="mb-34">
          <p className="mt-20 mb-4">
            <span className="caption-2-regular-gray3 ">
              {license?.licenseNumber}
            </span>
          </p>

          <p className="my-4 mt-20 mb-4">
            <span className="caption-2-regular-gray3 mr-4">
              {(license?.state, license?.country)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
