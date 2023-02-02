import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertAction } from "../../redux/alert/alertAction";

import SetGoalModal from "./SetGoalModal";
import ModalX from "../modal/ModalX";

import EditIcon from "../icons/EditIcon";
import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";

import api from "../../utility/api";

const CreditsTable = () => {
  const [totalCredits, setTotalCredits] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const getConfs = async (userID) => {
    try {
      const response = await api.get(
        `/attendees/credits/users/${userID}?getAllCreditTypes=true`
      );
      console.log("get confs response total", response.data.data.allCredits);
      setTotalCredits(response.data.data.allCredits);
      // dispatch(loadUserCreditConferencesAction(response.data.data.allCredits));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    getConfs(user?._id);
  }, [user?._id]);

  return (
    <div className="mb-80">
      <table className="uc-table">
        <thead>
          <tr>
            <th>Credit Type</th>
            <th>Total Credits</th>
            <th>Earned Credits</th>
            <th>Pending Clearance</th>
            <th>To Goal</th>
          </tr>
        </thead>
        <tbody>
          {totalCredits.length > 0 &&
            totalCredits?.map((credit) => {
              return (
                <tr>
                  <td>{credit.creditName}</td>
                  <td>{credit.totalCreditQuantity}</td>
                  <td>{credit.earnedCreditQuantity}</td>
                  <td>{credit.pendingCreditQuantity}</td>
                  <td>
                    {editMode ? (
                      <i onClick={() => setShowGoalModal(true)}>
                        <EditIcon />
                      </i>
                    ) : (
                      <button
                        className="button button-green"
                        onClick={() => setShowGoalModal(true)}
                      >
                        Set goal
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showGoalModal && (
        <ModalX onDismiss={() => setShowGoalModal(false)}>
          <SetGoalModal setShowGoalModal={setShowGoalModal} />
        </ModalX>
      )}
    </div>
  );
};

export default CreditsTable;
