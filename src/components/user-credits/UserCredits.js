import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExternalCreditsTable from "./ExternalCreditsTable";
import ModalX from "../modal/ModalX";
import UserCreditsConfs from "./UserCreditsConfs";
import ExternalCreditsForm from "./ExternalCreditsForm";

import AddIcon from "../icons/AddIcon";
import DropdownIcon from "../icons/DropdownIcon";

import { loadUserExternalCreditsAction } from "../../redux/user-profile/userProfileAction";
import { alertAction } from "../../redux/alert/alertAction";
import api from "../../utility/api";

import "./usercredits.styles.scss";

const UserCredits = () => {
  const [showExternalCreditForm, setShowExternalCreditForm] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getAllExternalCredits = async (userID) => {
    try {
      let response = await api.get(`attendees/${userID}/credits/externals`);
      dispatch(
        loadUserExternalCreditsAction(response.data.data.externalCredits)
      );
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    getAllExternalCredits(user?._id);
  }, [user?._id]);

  return (
    <div className="user-credit-wrap">
      <h1>Credits</h1>
      <div className="flex-vc-sb">
        <div className="flex-vc my-24">
          <button
            onClick={() => {
              setShowExternalCreditForm(true);
            }}
            className="circle-button mr-4"
          >
            <AddIcon />
          </button>
          <p className="caption-1-regular-gray3 ml-5">Add external credits</p>
        </div>
        {/* change to select */}
        <div className="flex-vchc uc-dropdown">
          <p className="body-regular-gray3 mr-4">Last 30 days</p>
          <DropdownIcon className="icon-sm" />
        </div>
      </div>
      <UserCreditsConfs />
      <ExternalCreditsTable />
      {showExternalCreditForm && (
        <ModalX onDismiss={() => setShowExternalCreditForm(false)}>
          <ExternalCreditsForm
            editMode={false}
            setShowExternalCreditForm={setShowExternalCreditForm}
          />
        </ModalX>
      )}
    </div>
  );
};

export default UserCredits;
