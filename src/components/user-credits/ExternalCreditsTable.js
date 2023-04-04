import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import ExternalCreditsForm from "./ExternalCreditsForm";
import Dialogue from "../dialogue/Dialogue";
import ModalX from "../modal/ModalX";
import SelectFormType3 from "../reselect/SelectFormType3";

import DucumentIcon from "../icons/DocumentIcon";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import UploadArrowIcon from "../icons/UploadArrowIcon";

import {
  loadUserExternalCreditsAction,
  loadUserSingleExternalCreditAction,
} from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

const options1 = [
  { value: "1", label: "1 month" },
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
];

const ExternalCreditsTable = () => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [creditId, setCreditId] = useState(null);
  const [filterText, setFilterText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const externalCredits = useSelector(
    (state) => state.userProfile.userExternalCredits
  );

  const dispatch = useDispatch();

  const viewCertificate = (certificate) => {
    window.open(certificate.location);
  };

  const handleDelete = (creditID) => {
    setOpen(true);
    setCreditId(creditID);
  };

  const closeDialogue = () => {
    setOpen(false);
  };

  const yesAction = async (creditID) => {
    try {
      const response = await api.delete(
        `attendees/${user._id}/credits/externals/${creditID}`
      );
      if (response) {
        dispatch(
          loadUserExternalCreditsAction(response.data.data.externalCredits)
        );
        setOpen(false);
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  return (
    <div className="mb-40">
      <div className="flex-vc-sb mb-24">
        <h4 className="mb-24">External Credits</h4>
        <div className="user-credit-filters">
          <SelectFormType3
            id="filterText1"
            isClearable
            isSearchable
            name="filterText1"
            options={options1}
            onChange={(value) => setFilterText(value?.value)}
            value={filterText}
            placeholder="Filter Data"
            isDisabled={false}
            isMulti={false}
          />
        </div>
      </div>
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
          {externalCredits.length > 0 &&
            externalCredits?.map((data) => (
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
                <td>{data.credit.name}</td>
                <td>{data.quantity}</td>
                <td>
                  <div className="flex-vc" style={{ cursor: "pointer" }}>
                    <i
                      className="mr-8 "
                      style={{ position: "relative", paddingTop: "5px" }}
                    ></i>
                    <div>
                      {data?.certificate ? (
                        <div
                          className="flex-vc"
                          onClick={() => viewCertificate(data.certificate)}
                        >
                          <i className="position-relative pt-8 mr-8">
                            <DucumentIcon className="icon-sm" />
                          </i>{" "}
                          <span>View certificate</span>
                        </div>
                      ) : (
                        <div className="flex-vc">
                          <i className="position-relative pt-8 mr-8">
                            <UploadArrowIcon className="icon-sm" />
                          </i>{" "}
                          <span>Upload certificate</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <i
                    className="mr-10"
                    onClick={() => {
                      dispatch(loadUserSingleExternalCreditAction(data));
                      setEditMode(true);
                    }}
                  >
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
      {editMode && (
        <ModalX onDismiss={() => setEditMode(false)}>
          <ExternalCreditsForm editMode={editMode} setEditMode={setEditMode} />
        </ModalX>
      )}
      {open && (
        <Dialogue
          msg="Are you sure you want to delete the external credit?"
          title="Confirm Delete !!"
          closeDialogue={closeDialogue}
          yesAction={() => yesAction(creditId)}
        />
      )}
    </div>
  );
};

export default ExternalCreditsTable;
