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
  const [filterValue, setFilterValue] = useState([]);
  const [confList, setConfList] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const userConfs = useSelector(
    (state) => state.userProfile.userCreditConferences
  );
  const dispatch = useDispatch();

  const getConfs = async (userID) => {
    try {
      const response = await api.get(`/attendees/credits/users/${userID}`);
      console.log({ response });
      setConfList(response.data.data.allCredits);
      dispatch(loadUserCreditConferencesAction(response.data.data.allCredits));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const dateWiseUserCreditFilter = (event) => {
    let startDate = new Date();
    let selectedDate = startDate.setMonth(
      startDate.getMonth() - event.target.value
    );
    // setStartDate(startDate.toUTCString());
    let startDateMili = Date.parse(selectedDate);
    let fiteredCredit = confList.filter((conf) => {
      return Date.parse(conf.startDate) > startDateMili;
    });
    return fiteredCredit;
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
          name="filuterText1"
          options={options1}
          onChange={(e) => setFilterValue(e?.value)}
          value={filterValue}
          placeholder="Filter Data"
          isDisabled={false}
          isMulti={false}
        />
      </div>

      <div className="credits-table-wrap">
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
            {confList?.map((data) => (
              <UserConfCredit data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCreditsConfs;
