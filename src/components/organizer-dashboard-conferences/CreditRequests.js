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

const options = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
];

export default function CreditRequests() {
  const [creditData, setCreditData] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [formData, setFormData] = useState({
    searchText: "",
  });
  const { searchText } = formData;

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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
      });
      return dataSet;
    }
  };

  const filterData = (data) => {
    data?.filter((item) => {
      if (filterText === "") {
        return data;
      }
      if (filterText === "pending") {
      }
      if (filterText === "approved") {
      }
    });
  };

  const getOrganizerCredits = async (userId) => {
    try {
      const response = await api.get(
        `organizers/conferences/credits/users/${userId}`
      );
      if (response) {
        setCreditData(response.data.data.allCredits);
        console.log("response", response.data.data.allCredits);
      }
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "error"));
    }
  };

  useEffect(() => {
    getOrganizerCredits(user._id);
  }, [user._id]);

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
            onChange={(value) => setFilterText(value?.value)}
            value={filterText}
            placeholder="Filter"
            isDisabled={false}
            isMulti={false}
          />
        </div>
        <div>
          <SelectFormType3
            id="filterText1"
            isClearable
            isSearchable
            name="filuterText1"
            options={options}
            onChange={(value) => setFilterText(value?.value)}
            value={filterText}
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
            {searchData(creditData)?.map((data) => {
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
