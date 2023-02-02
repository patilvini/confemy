import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getValue } from "../../utility/commonUtil";

import { alertAction } from "../../redux/alert/alertAction";
import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

export default function UserConfCredit({ data }) {
  const [value, setValue] = useState("");

  const getCreditOptions = (conf) =>
    conf.credits.map((credit) => ({
      label: credit.creditId.name,
      value: credit.creditId._id,
    }));

  return (
    <tr>
      <td>Jan 23 2023</td>
      <td>{data?.conference?.title}</td>
      <td>
        <div style={{ width: 300 }}>
          <Select
            options={getCreditOptions(data?.conference)}
            value={getValue(getCreditOptions(data?.conference), value, false)}
            onChange={(value) => setValue(value.value)}
            styles={{ overFlow: "hidden" }}
            isSearchable
          />
        </div>
      </td>
      <td>{data?.conference?.credits?.length}</td>
      <td>{data?.creditStatus === 1 ? "Success" : "Pending"}</td>
    </tr>
  );
}
