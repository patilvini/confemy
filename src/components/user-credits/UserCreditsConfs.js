import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import { alertAction } from "../../redux/alert/alertAction";

import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";
import SelectOne from "../formik/SelectOne";

const UserCreditsConfs = () => {
  const [creditTypes, setCreditTypes] = useState([]);
  const [conference, setConference] = useState([]);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const getConfs = async (userID) => {
    try {
      const response = await api.get(`/attendees/credits/users/${userID}`);
      // console.log("response", response.data.data.allCredits);
      setConference(response.data.data.allCredits);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  const CreditTypeOptions = () => {
    conference?.map((item) => {
      item.conference?.credits.map((credit) => {
        console.log(
          "credit----------",
          credit.creditId.name,
          credit.creditId._id
        );
        setCreditTypes([
          { label: credit.creditId.name, value: credit.creditId._id },
        ]);
      });
    });
  };

  console.log("CreditTypes", creditTypes);

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
  };

  useEffect(() => {
    getConfs(user._id);
  }, [user._id]);

  useEffect(() => {
    CreditTypeOptions();
  }, []);

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
          {conference?.map((data) => {
            return (
              <tr>
                <td>Jan 23 2023</td>
                <td>{data?.conference?.title}</td>
                <td>
                  <Select
                    options={creditTypes}
                    onChange={handleChange}
                    styles={{ overFlow: "hidden" }}
                  />
                  {/* <SelectOne name="profession">
                    <option value="">Select a Profession</option>
                    {creditTypes.map((credit) => (
                      <option key={credit._id} value={credit._id}>
                        {credit.creditId.name}
                      </option>
                    ))}
                  </SelectOne> */}
                  {/* <select name="creditTypes">
                    {creditTypes?.map((item) => {
                      return (
                        <option
                          key={item.creditId._id}
                          value={item.creditId._id}
                        >
                          {item.creditId.name}
                        </option>
                      );
                    })}
                  </select> */}
                </td>
                <td>{data?.conference?.credits?.length}</td>
                <td>{data?.creditStatus === 1 ? "Success" : "Pending"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserCreditsConfs;
