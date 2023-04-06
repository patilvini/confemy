import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";

import SearchIcon from "../icons/SearchIcon";

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

  //remove this state
  const [initialData, setInitialData] = useState([]);
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [creditList, setCreditList] = useState(creditData);

  const [filter1, setfilter1] = useState("");

  const user = useSelector((state) => state.auth.user);
  const organizationsList = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );
  const dispatch = useDispatch();
  const options2 = [{ value: "self", label: "User" }, ...organizationsList];

  const onInputChange = (e) => setSearchText(e.target.value);

  const searchFilter = (data, value) => {
    let filteredConfs = data?.filter((item) => {
      if (
        item.conference.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
      ) {
        return item;
      }
    });
    console.log(filteredConfs);

    setCreditList(filteredConfs);
  };

  let todaysUtcMiliSecond = Date.parse(new Date().toUTCString());
  const filterCredits = (value) => {
    let filteredconfs = [];
    console.log({ value });
    if (value === "all") {
      setFilterText1(value);
    } else if (value === "pending") {
      setFilterText1(value);
    } else if (value === "approved") {
      setFilterText1(value);
    } else if (value === "self") {
      setFilterText2(value);
    } else {
      setFilterText2(value);
    }
    const pendingStatusCode = 2;
    const approvedStatusCode = 1;

    creditData?.forEach((item) => {
      if (value === "all") {
        if (filterText2) {
          if (filterText2 === "self") {
            // FILTRING DATA FROM SECOND FILTER
            if (item.conference.host === "user") {
              filteredconfs.push(item);
            }
          } else {
            // FILTER DATA IF SECOND FILTER WILL BE ORG FILTER
            if (item?.conference?.hostedBy?.organization === filterText2) {
              filteredconfs.push(item);
            }
          }
        } else {
          // IF SECOND FILTER IS NOT APPLIED
          filteredconfs = creditData;
        }
      } else if (value === "pending") {
        if (item.creditStatus == pendingStatusCode) {
          if (filterText2) {
            if (filterText2 === "self") {
              // FILTRING DATA FROM SECOND FILTER
              if (
                item.conference.host === "user" &&
                item.creditStatus === pendingStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (
              item?.conference.hostedBy?.organization === filterText2
            ) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === "approved") {
        if (item.creditStatus == approvedStatusCode) {
          if (filterText2) {
            if (filterText2 === "self") {
              // FILTRING DATA FROM SECOND FILTER
              if (item.conference.host === "user") {
                filteredconfs.push(item);
              }
            } else if (item?.conference.hotedBy?.organization === filterText2) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === "self") {
        if (item.conference.host === "user") {
          if (filterText1) {
            if (filterText1 === "pending") {
              if (
                item.conference.host === "user" &&
                item.creditStatus === pendingStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "approved") {
              if (
                item.conference.host === "user" &&
                item.creditStatus === approvedStatusCode
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "all") {
              filteredconfs.push(item);
            }
          } else {
            console.log("rinnn");
            filteredconfs.push(item);
          }
        }
      } else {
        if (item?.conference.hostedBy?.organization === value) {
          if (filterText1) {
            if (filterText1 === "pending") {
              if (item.creditStatus === pendingStatusCode) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "approved") {
              if (item.creditStatus === approvedStatusCode) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "all") {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      }
    });

    setFilteredList(filteredconfs);
    // console.log({ filteredconfs });
    searchText
      ? searchFilter(filteredconfs, searchText)
      : setCreditList(filteredconfs);
  };

  const getOrganizerCredits = async (userId) => {
    try {
      const response = await api.get(
        `organizers/conferences/credits/users/${userId}`
      );
      console.log({ response });
      if (response) {
        setFilteredList(response.data.data.allCredits);
        setCreditList(response.data.data.allCredits);
        dispatch(loadAllOrganizerCreditsAction(response.data.data.allCredits));

        // setData(response.data.data.allCredits);
      }
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "error"));
    }
  };
  const loadMyOrgnizations = async (id) => {
    try {
      const response = await api.get(
        `organizations/users/${id}?orgForConference=true`
      );

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
    getOrganizerCredits(user._id);
  }, [user._id]);

  useEffect(() => {
    searchFilter(filteredList, searchText);
  }, [searchText]);

  return (
    <>
      <div className="org-credit-reqst-1">
        <h1>Credit Requests</h1>
        <div className="org-credit-reqst-filters">
          {" "}
          <div className="form-type-3 ">
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
          <div className="">
            <SelectFormType3
              id="filterText1"
              isClearable
              isSearchable
              name="filuterText1"
              options={options}
              onChange={(value) => filterCredits(value.value)}
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
              onChange={(value) => filterCredits(value.value)}
              value={filterText2}
              placeholder="Filter"
              isDisabled={false}
              isMulti={false}
            />
          </div>
        </div>
      </div>
      <div className="mt-24 org-credits-table-wrap">
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
            {creditList?.map((data) => {
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
