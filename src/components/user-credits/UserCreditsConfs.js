import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserConfCredit from "./UserConfCredit";
import SelectFormType3 from "../reselect/SelectFormType3";
import { alertAction } from "../../redux/alert/alertAction";

import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

const options1 = [
  { value: 1, label: "1 month" },
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
];

const UserCreditsConfs = () => {
  const [filterText, setFilterText] = useState("");
  const user = useSelector((state) => state.auth.user);
  const userConfs = useSelector(
    (state) => state.userProfile.userCreditConferences
  );
  const dispatch = useDispatch();

  const getConfs = async (userID) => {
    try {
      const response = await api.get(`/attendees/credits/users/${userID}`);
      dispatch(loadUserCreditConferencesAction(response.data.data.allCredits));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    getConfs(user._id);
  }, [user._id]);

  return (
    <div className="mb-80">
      <div className="flex-vc-sb mb-24">
        <h4 className="mb-24">Conference</h4>
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
      <table className="uc-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Conference</th>
            <th>Credit Type</th>
            <th>Conference Credits</th>
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
