import { useState } from "react";
import PracticeAddressForm from "./PracticeAddressForm";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

export default function PracticeAddress({ practice, indx }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div className="as-pd-icons">
        <h4>{practice?.name || `Practice Name`}</h4>
        <span
          className="mr-8 ml-12"
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <EditIcon />
        </span>
        <span>
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
        <div className="mb-34">
          <p className="mt-20 mb-4">
            <span className="caption-2-regular-gray3 ">
              {practice?.addressLine1}
            </span>
          </p>
          <p>
            <span className="caption-2-regular-gray3 mr-4">
              {practice?.addressLine2}
            </span>
          </p>
          <p className="my-4">
            <span className="caption-2-regular-gray3 mr-4">
              {(practice?.city, practice?.state)}
            </span>
          </p>
          <p className="my-4">
            <span className="caption-2-regular-gray3 mr-4">
              {practice?.country} - {practice?.zipcode}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
