import SearchIcon from "../icons/SearchIcon";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectFormType3 from "../reselect/SelectFormType3";

import MyConfsCard from "./MyConfsCard";
import EditIcon from "../icons/EditIcon";
import { useNavigate } from "react-router-dom";

import { alertAction } from "../../redux/alert/alertAction";
import {
  loadAllMyConfsAction,
  loadOneIncopleteConfAction,
} from "../../redux/conference/conferenceAction";
import { loadMyOrganizationsSelectListAction } from "../../redux/organization/myOrganizationsAction";

import "./myConfs.styles.scss";
import api from "../../utility/api";

const options1 = [
  { value: "all", label: "All" },
  { value: "drafts", label: "Drafts" },
  { value: "expiredConfs", label: "Expired Confs" },
  { value: "futureConfs", label: "Upcoming Confs" },
];

export default function MyConfs() {
  const [searchText, setSearchText] = useState("");
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [confList, setConfList] = useState(
    useSelector((state) => state.conference.myConfs)
  );
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const myConfs = useSelector((state) => state.conference.myConfs);

  let organizationsList = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );

  // if (!organizationsList) {
  //   organizationsList = [];
  // }
  const dispatch = useDispatch();

  const options2 = [{ value: "self", label: "User" }, ...organizationsList];

  const onInputChange = (e) => setSearchText(e.target.value);

  const keys = ["title", "city"];

  const searchFilter = (data, value) => {
    let filteredConfs = data.filter((item) => {
      if (item.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        return item;
      }
    });
    setConfList(filteredConfs);
  };

  const getOneIncompleteConf = async (conferenceId) => {
    const url = `conferences/${conferenceId}`;

    try {
      const response = await api.get(url);
      if (response) {
        dispatch(loadOneIncopleteConfAction(response.data.data.conferences));
        navigate("/dashboard/create-conf/step-1");
      }
    } catch (err) {
      if (err) {
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  };

  let todaysUtcMiliSecond = Date.parse(new Date().toUTCString());
  const getConfStatus = (confData) => {
    if (!confData.completedAllMandatorySteps) {
      return "Draft";
    } else if (
      Date.parse(confData.startDate) >= todaysUtcMiliSecond &&
      Date.parse(confData.endDate) <= todaysUtcMiliSecond &&
      confData.completedAllMandatorySteps
    ) {
      return "Live";
    } else if (
      Date.parse(confData.activeDate) <= todaysUtcMiliSecond &&
      confData.completedAllMandatorySteps
    ) {
      return "Published";
    } else if (
      Date.parse(confData.startDate) > todaysUtcMiliSecond &&
      Date.parse(confData.endDate) > todaysUtcMiliSecond &&
      confData.completedAllMandatorySteps
    ) {
      return "Upcoming";
    }
  };

  useEffect(() => {
    searchFilter(filteredList, searchText);
  }, [searchText]);

  const filterOneNew = (value) => {
    let filteredconfs = [];

    if (value === "all") {
      setFilterText1(value);
    } else if (value === "drafts") {
      setFilterText1(value);
    } else if (value === "expiredConfs") {
      setFilterText1(value);
    } else if (value === "futureConfs") {
      setFilterText1(value);
    } else if (value === "self") {
      setFilterText2(value);
    } else {
      setFilterText2(value);
    }

    myConfs?.forEach((item) => {
      if (value === "all") {
        if (filterText2) {
          if (filterText2 === "self") {
            // FILTRING DATA FROM SECOND FILTER
            if (item.host === "user") {
              filteredconfs.push(item);
            }
          } else {
            // FILTER DATA IF SECOND FILTER WILL BE ORG FILTER
            if (item?.hostedBy?.organization?._id === filterText2) {
              filteredconfs.push(item);
            }
          }
        } else {
          // IF SECOND FILTER IS NOT APPLIED
          filteredconfs = myConfs;
        }
      } else if (value === "drafts") {
        if (!item.completedAllMandatorySteps) {
          if (filterText2) {
            if (filterText2 === "self") {
              // FILTRING DATA FROM SECOND FILTER
              if (item.host === "user" && !item.completedAllMandatorySteps) {
                filteredconfs.push(item);
              }
            } else if (item?.hostedBy?.organization?._id === filterText2) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === "expiredConfs") {
        if (
          Date.parse(item.endDate) < todaysUtcMiliSecond &&
          item.completedAllMandatorySteps
        ) {
          if (filterText2) {
            if (filterText2 === "self") {
              // FILTRING DATA FROM SECOND FILTER
              if (
                Date.parse(item.endDate) < todaysUtcMiliSecond &&
                item.host === "user"
              ) {
                filteredconfs.push(item);
              }
            } else if (
              item?.hotedBy?.organization?._id === filterText2 &&
              Date.parse(item.endDate) < todaysUtcMiliSecond
            ) {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else if (value === "futureConfs") {
        if (
          Date.parse(item.startDate) > todaysUtcMiliSecond &&
          Date.parse(item.endDate) > todaysUtcMiliSecond &&
          item.completedAllMandatorySteps
        ) {
          if (filterText2) {
            if (filterText2 === "self") {
              // FILTRING DATA FROM SECOND FILTER
              if (
                Date.parse(item.startDate) > todaysUtcMiliSecond &&
                Date.parse(item.endDate) > todaysUtcMiliSecond &&
                item.host === "user"
              ) {
                filteredconfs.push(item);
              }
            } else if (
              item?.hostedBy?.organization?._id === filterText2 &&
              Date.parse(item.startDate) > todaysUtcMiliSecond &&
              Date.parse(item.endDate) > todaysUtcMiliSecond
            ) {
              filteredconfs.push(item);
            } else {
              filteredconfs.push(item);
            }
          }
        }
      } else if (value === "self") {
        if (item.host === "user") {
          if (filterText1) {
            if (filterText1 === "drafts") {
              if (item.host === "user" && !item.completedAllMandatorySteps) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "expiredConfs") {
              if (
                item.host === "user" &&
                Date.parse(item.endDate) < todaysUtcMiliSecond &&
                item.completedAllMandatorySteps
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "futureConfs") {
              if (
                item.host === "user" &&
                Date.parse(item.startDate) > todaysUtcMiliSecond &&
                Date.parse(item.endDate) > todaysUtcMiliSecond &&
                item.completedAllMandatorySteps
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "all") {
              filteredconfs.push(item);
            }
          } else {
            filteredconfs.push(item);
          }
        }
      } else {
        if (item?.hostedBy?.organization?._id === value) {
          if (filterText1) {
            if (filterText1 === "drafts") {
              if (!item.completedAllMandatorySteps) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "expiredConfs") {
              if (
                item.completedAllMandatorySteps &&
                Date.parse(item.endDate) < todaysUtcMiliSecond
              ) {
                filteredconfs.push(item);
              }
            } else if (filterText1 === "futureConfs") {
              if (
                Date.parse(item.startDate) > todaysUtcMiliSecond &&
                Date.parse(item.endDate) > todaysUtcMiliSecond &&
                item.completedAllMandatorySteps
              ) {
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
      : setConfList(filteredconfs);
  };

  const getMyConfs = async (userId) => {
    const url = `/conferences/users/${userId}?getAllOrganizationConferences=true`;
    try {
      const response = await api.get(url);

      if (response) {
        setConfList(response.data.data.conferences);
        setFilteredList(response.data.data.conferences);
        dispatch(loadAllMyConfsAction(response.data.data.conferences));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
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
    getMyConfs(user._id);
  }, []);

  return (
    <div>
      <div className="myconfs-header mb-24">
        <h1 className="mr-16">Conferences</h1>
        <button
          onClick={() => navigate("/dashboard/create-conf/step-1")}
          className="button button-green mt-4"
        >
          Create conference
        </button>
      </div>
      <div className="myconfs-sort mb-32">
        <div className="form-type-3">
          <div style={{ position: "relative" }}>
            <input
              type="text"
              id="myConfsSearchText"
              placeholder="Search Conferences"
              name="searchText"
              value={searchText}
              onChange={onInputChange}
              autoComplete="off"
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

        <div>
          <SelectFormType3
            id="filterText1"
            isClearable
            isSearchable
            name="filuterText1"
            options={options1}
            onChange={(value) => filterOneNew(value.value)}
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
            name="filterText2"
            options={options2}
            onChange={(value) => filterOneNew(value.value)}
            value={filterText2}
            placeholder="Filter"
            isDisabled={false}
            isMulti={false}
          />
        </div>
      </div>
      <div className="myconfs-table-wrap">
        <table className="myconfs-table ">
          <thead>
            <tr>
              <th>Conference</th>
              <th>Sold</th>
              <th>Gross</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {confList?.map((conf) => (
              <tr key={conf._id}>
                <td>
                  <MyConfsCard
                    banner={conf.banner}
                    title={conf.title}
                    timezone={conf.timezone}
                    startDate={conf.startDate}
                    credits={conf.credits}
                    city={conf.city}
                    mode={conf.mode}
                  />
                </td>
                <td>
                  {conf.totalSold ? conf.totalSold : 0}/
                  {conf.totalTickets ? conf.totalTickets : 0}
                </td>
                <td>{conf.grossPrice ? conf.grossPrice : 0}</td>
                <td>{getConfStatus(conf)}</td>
                <td>
                  <span
                    // className="mr-8 ml-12"
                    onClick={() => {
                      getOneIncompleteConf(conf?._id);
                    }}
                  >
                    {" "}
                    <EditIcon className="icon-size" />
                  </span>
                  <i>{/* <ThreeDotsVIcon className="icon-size" /> */}</i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
