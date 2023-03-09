import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";

import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";

import SelectFormType3 from "../reselect/SelectFormType3";
import api from "../../utility/api";

import "./organizer-conf-dashboard.scss";
import { alertAction } from "../../redux/alert/alertAction";
import UploadFile from "./UploadFile";
import { loadMyOrganizationsSelectListAction } from "../../redux/organization/myOrganizationsAction";
import { loadAllOrganizerCreditsAction } from "../../redux/organizer-dashboard/organizerCreditActions";

const options = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

export default function CreditRequests() {
  const creditData = useSelector((state) => state.organizer.allCredits);
  const [data, setData] = useState(creditData);
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [orgFilter2, setOrgFilter2] = useState("");
  const [formData, setFormData] = useState({
    searchText: "",
  });
  const { searchText } = formData;

  const [filter1, setfilter1] = useState("");

  const user = useSelector((state) => state.auth.user);
  const organizationsList = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );
  const dispatch = useDispatch();

  const options2 = [{ value: "user", label: "User" }, ...organizationsList];

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const searchData = (data) => {
    if (data) {
      const dataSet = data?.filter((item) => {
        if (
          item.conference.title
            .toLowerCase()
            .indexOf(searchText.toLocaleLowerCase()) >= 0
        ) {
          return item;
        }
        if (
          item.firstName
            .toLowerCase()
            .indexOf(searchText.toLocaleLowerCase()) >= 0
        ) {
          return item;
        }
      });
      return dataSet;
    }
  };

  const filter1Data = (value) => {
    setFilterText1(value);
    let filtredData = creditData?.filter((item) => {
      if (value === "all") {
        setfilter1(value);
        return creditData;
      }
      if (value === "pending") {
        if (item.creditStatus === 2) {
          return item;
        }
      }
      if (value === "approved") {
        if (item.creditStatus === 1) {
          return item;
        }
      }
    });
    setData(filtredData);
  };
  const filter2Data = (value) => {
    console.log("value", value);
    setFilterText2(value);
    let filtredData = data?.filter((item) => {
      if (value === "") {
        return data;
      }
      if (value === "user") {
        setOrgFilter2("user");
        if (filter1 === "all") {
        }
        if (item.conference.host === "user") {
          return item;
        }
      }
      if (value !== "user") {
        if (value === item.conference.hostedBy.organization) {
          return item;
        }
      }
    });
    setData(filtredData);
  };

  const getOrganizerCredits = async (userId) => {
    try {
      const response = await api.get(
        `organizers/conferences/credits/users/${userId}`
      );
      if (response) {
        dispatch(loadAllOrganizerCreditsAction(response.data.data.allCredits));
        setData(response.data.data.allCredits);
      }
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "error"));
    }
  };
  const loadMyOrgnizations = async (id) => {
    const url = `organizations/users/${id}?orgForConference=true`;
    try {
      const response = await api.get(url);

      if (response) {
        dispatch(
          loadMyOrganizationsSelectListAction(response.data?.data?.organization)
        );
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    loadMyOrgnizations(user._id);
  }, [user._id]);

  useEffect(() => {
    getOrganizerCredits(user._id);
  }, []);

  return (
    <>
      <div className="org-credit-reqst">
        <h1>Credit Requests</h1>
        <div className="form-type-3 mr-24">
          <div className="position-relative">
            <input
              type="text"
              id="searchtickets"
              placeholder="Search Credits"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
            />
            <i
              className={
                searchText?.length > 0
                  ? "display-none"
                  : "conf-search-input-icon"
              }
            >
              <SearchIcon width="2.4rem" height="2.4rem" />
            </i>
          </div>
        </div>
        <div className="mr-18">
          <SelectFormType3
            id="filterText1"
            isClearable
            isSearchable
            name="filuterText1"
            options={options}
            onChange={(value) => filter1Data(value?.value)}
            value={filterText1}
            placeholder="Filter"
            isDisabled={false}
            isMulti={false}
          />
        </div>
        <div>
          <SelectFormType3
            id="filterText2"
            isClearable
            isSearchable
            name="filuterText2"
            options={options2}
            onChange={(value) => filter2Data(value?.value)}
            value={filterText2}
            placeholder="Filter"
            isDisabled={false}
            isMulti={false}
          />
        </div>
      </div>
      <div className="mt-24">
        <table className="org-credit-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
              <th>Credit Type</th>
              <th>Total Credits</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {searchData(data)?.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{`${data.firstName}  ${data.lastName}`}</td>
                  <td>{data.conference.title}</td>
                  <td>{data.requestedCredit.name}</td>
                  <td>{data.creditQuantity}</td>
                  <td>
                    <UploadFile data={data} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
