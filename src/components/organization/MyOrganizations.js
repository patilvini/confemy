import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../utility/api";
import "./myOrganizations.styles.scss";

import NextIcon from "../icons/NextIcon";

import {
  loadOrganizationsAction,
  errorLoadingOrganizationsAction,
} from "../../redux/organization/organizationsAction";

export default function MyOrganizations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const organizations = useSelector((state) => state.organizations);

  async function getOrganizationsData() {
    const url = `organizations/users/${user?._id}`;
    try {
      const response = await api.get(url);
      if (response) {
        console.log("get organization api", response);
        dispatch(loadOrganizationsAction(response.data.data.organization));
      }
    } catch (err) {
      if (err) {
        dispatch(errorLoadingOrganizationsAction());
      }
    }
  }

  useEffect(() => {
    getOrganizationsData();
  }, [user?._id]);

  function openOrganiztion(path) {
    console.log("open organization clicked", { path });
    navigate(path);
  }

  return (
    <div className="my-orgs-wrap">
      <h2>My Organizations</h2>
      <table>
        <tbody>
          {organizations.myOrganizations.map((item) => (
            <tr
              key={item.organization._id}
              onClick={() => openOrganiztion(item.organization._id)}
            >
              <td key={item._id} className="org-logo-container">
                {item.organization?.logo[0]?.Location ? (
                  <img
                    src={`${item.organization?.logo[0]?.Location}`}
                    alt="Logo"
                    className="org-logo"
                  />
                ) : (
                  <>Add Logo</>
                )}
              </td>
              <td key={item.organization.name}>
                <h4>{item.organization.name}</h4>
              </td>
              <td>
                <NextIcon className="large-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
