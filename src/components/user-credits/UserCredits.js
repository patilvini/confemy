import React, { useState } from "react";

import ExternalCreditsTable from "./ExternalCreditsTable";
import ModalX from "../modal/ModalX";
import UserCreditsConfs from "./UserCreditsConfs";
import ExternalCreditsForm from "./ExternalCreditsForm";

import AddIcon from "../icons/AddIcon";
import DropdownIcon from "../icons/DropdownIcon";

import "./usercredits.styles.scss";

const UserCredits = () => {
  const [showExternalCreditForm, setShowExternalCreditForm] = useState(false);

  return (
    <div className="user-credit-wrap">
      <h1 className="mt-76 ">Credits</h1>
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
        <div className="flex-vchc uc-dropdown">
          <p className="body-regular-gray3 mr-4">Last 30 days</p>
          <DropdownIcon className="icon-sm" />
        </div>
      </div>
      <div className="mb-40">
        <UserCreditsConfs />
      </div>
      <ExternalCreditsTable />
      {showExternalCreditForm && (
        <ModalX onDismiss={() => setShowExternalCreditForm(false)}>
          <ExternalCreditsForm />
        </ModalX>
      )}
    </div>
  );
};

export default UserCredits;
