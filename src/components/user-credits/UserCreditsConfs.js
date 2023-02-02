import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserConfCredit from "./UserConfCredit";
import { alertAction } from "../../redux/alert/alertAction";

import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

const UserCreditsConfs = () => {
  const user = useSelector((state) => state.auth.user);
  const userConfs = useSelector(
    (state) => state.userProfile.userCreditConferences
  );
  const dispatch = useDispatch();

  const getConfs = async (userID) => {
    try {
      const response = await api.get(`/attendees/credits/users/${userID}`);
      console.log("get confs response", response.data);
      dispatch(loadUserCreditConferencesAction(response.data.data.allCredits));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
  };

  useEffect(() => {
    getConfs(user._id);
  }, [user._id]);

  return (
    <div className="mb-80">
      <h4 className="mb-24">Conference</h4>
      <table className="uc-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Conference</th>
            <th>Credit Type</th>
            <th>Total Credits</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userConfs?.map((data) => (
            <UserConfCredit data={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCreditsConfs;
