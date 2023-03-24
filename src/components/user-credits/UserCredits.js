import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";

import ExternalCreditsTable from "./ExternalCreditsTable";
import ModalX from "../modal/ModalX";
import UserCreditsConfs from "./UserCreditsConfs";
import ExternalCreditsForm from "./ExternalCreditsForm";
import SelectFormType3 from "../reselect/SelectFormType3";

import AddIcon from "../icons/AddIcon";

import {
  loadUserCreditConferencesAction,
  loadUserExternalCreditsAction,
} from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

import "./usercredits.styles.scss";
import CreditsTable from "./CreditsTable";

const options1 = [
  { value: 1, label: "1 month" },
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
];

const UserCredits = () => {
  const [filterText, setFilterText] = useState("");
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
        <SelectFormType3
          id="filterText1"
          isClearable
          isSearchable
          name="filuterText1"
          options={options1}
          onChange={(value) => setFilterText(value?.value)}
          value={filterText}
          placeholder="Filter Data"
          isDisabled={false}
          isMulti={false}
        />
      </div>
      <CreditsTable />
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
