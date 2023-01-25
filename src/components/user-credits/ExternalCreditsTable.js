import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DucumentIcon from "../icons/DocumentIcon";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import ModalX from "../modal/ModalX";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

import { loadUserExternalCreditsAction } from "../../redux/user-profile/userProfileAction";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import ExternalCreditsForm from "./ExternalCreditsForm";

const ExternalCreditsTable = () => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const externalCredits = useSelector(
    (state) => state.userProfile.userExternalCredits
  );
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleEdit = async (creditID) => {
    try {
      let response = await api.get(
        `attendees/${user._id}/credits/externals/${creditID}`
      );
      console.log("edit credit response", response.data.data.externalCredit);
      setEditData(response.data.data.externalCredit);
      setEditMode(true);
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "danger"));
    }
  };

  const handleDelete = async (creditID) => {
    try {
      const response = await api.delete(
        `attendees/${user._id}/credits/externals/${creditID}`
      );
      if (response) {
        dispatch(
          loadUserExternalCreditsAction(response.data.data.externalCredits)
        );
        setEditMode(true);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };
  return (
    <div className="my-40">
      <h4 className="mb-24">External Credits</h4>
      <table className="uc-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Conference</th>
            <th>Credit Type</th>
            <th>Total Credits</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {externalCredits?.map((data) => (
            <tr key={data._id}>
              <td>
                {formatInTimeZone(
                  new Date(data.startDate),
                  Intl.DateTimeFormat().resolvedOptions().timeZone,
                  "MMM dd yyyy",
                  { locale: enGB }
                )}
              </td>
              <td>{data.conferenceTitle}</td>
              <td>ACT cat 2</td>
              <td>{data.quantity}</td>
              <td>
                <div className="flex-vc">
                  <i
                    className="mr-8 "
                    style={{ position: "relative", paddingTop: "5px" }}
                  >
                    <DucumentIcon className="icon-sm" />
                  </i>
                  <div>View certificate</div>
                </div>
              </td>
              <td>
                <i className="mr-10" onClick={() => handleEdit(data._id)}>
                  <EditIcon />
                </i>
                <i className="ml-10" onClick={() => handleDelete(data._id)}>
                  <DeleteIcon />
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode ? (
        <ModalX onDismiss={() => setEditMode(false)}>
          <ExternalCreditsForm
            editData={editData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </ModalX>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExternalCreditsTable;
