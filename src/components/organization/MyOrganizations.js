import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../utility/api";
import NextIcon from "../icons/NextIcon";
import {
  loadMyOrganizationsAction,
  myOrganizationsErrorAction,
} from "../../redux/organization/myOrganizationsAction";

import "./myOrganizations.styles.scss";

export default function MyOrganizations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myOrganizations = useSelector((state) => state.myOrganizations);
  const { isLoading, isError, organizations } = myOrganizations;

  const getMyOrganizations = useCallback(async (id) => {
    const url = `organizations/users/${id}`;
    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadMyOrganizationsAction(response.data.data.organization));
      }
    } catch (err) {
      if (err) {
        dispatch(myOrganizationsErrorAction());
      }
    }
  }, []);

  useEffect(() => {
    getMyOrganizations(user?._id);
  }, [user?._id, getMyOrganizations]);

  return (
    <div className="my-orgs-wrap">
      <div className="my-orgs-header">
        <h2>My Organizations</h2>
        <button
          onClick={() => navigate("/dashboard/create-organization")}
          className="button-text button-text-primary"
        >
          + Add
        </button>
      </div>
      {!isLoading && !isError && organizations && (
        <table>
          <tbody>
            {organizations.map((item) => (
              <tr
                key={item.organization._id}
                onClick={() => navigate(item.organization._id)}
              >
                <td key={item._id} className="org-logo-container">
                  {item.organization?.logo[0] ? (
                    <>
                      <img
                        src={`${item.organization?.logo[0]?.Location}`}
                        alt="Logo"
                        className="org-logo"
                      />
                    </>
                  ) : (
                    <>Add Logo</>
                  )}
                </td>
                <td key={item.organization.name}>
                  <h4>{item.organization.name}</h4>
                </td>
                <td>
                  <NextIcon className="icon-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
