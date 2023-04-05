import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";

import ExternalCreditsTable from "./ExternalCreditsTable";
import ModalX from "../modal/ModalX";
import UserCreditsConfs from "./UserCreditsConfs";
import ExternalCreditsForm from "./ExternalCreditsForm";
import SelectFormType3 from "../reselect/SelectFormType3";

import {
  loadUserCreditConferencesAction,
  loadUserExternalCreditsAction,
  loadUserTotalCreditsAction,
} from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

import "./usercredits.styles.scss";
import CreditsTable from "./CreditsTable";

const UserCredits = () => {
  const [showExternalCreditForm, setShowExternalCreditForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
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
      <CreditsTable />
      <UserCreditsConfs />
      <ExternalCreditsTable />
    </div>
  );
};

export default UserCredits;
