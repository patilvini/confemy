import SearchIcon from "../icons/SearchIcon";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectFormType3 from "../reselect/SelectFormType3";

import MyConfsCard from "./MyConfsCard";
import EditIcon from "../icons/EditIcon";

import { alertAction } from "../../redux/alert/alertAction";
import { loadAllMyConfsAction } from "../../redux/conference/conferenceAction";
import { loadMyOrganizationsSelectListAction } from "../../redux/organization/myOrganizationsAction";

import "./myConfs.styles.scss";
import api from "../../utility/api";

const options1 = [
  { value: "drafts", label: "Drafts" },
  { value: "expiredConfs", label: "Expired Confs" },
  { value: "futureConfs", label: "Upcoming Confs" },
];

export default function MyConfs() {
  const [searchText, setSearchText] = useState("");
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");

  const user = useSelector((state) => state.auth.user);
  const myConfs = useSelector((state) => state.conference.myConfs);
  const organizationsList = useSelector(
    (state) => state.myOrganizations.organizationsListForSelect
  );
  const dispatch = useDispatch();

  const options2 = [{ value: "self", label: "User" }];

  const onInputChange = (e) => setSearchText(e.target.value);

  const keys = ["title", "city"];

  const filter = (data) => {
    let filteredConfs = data?.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase()?.includes(searchText))
    );
    return filteredConfs;
  };

  const filterOne = (data) => {
    let filterdData = data?.filter((item) => {
      let filteredconfs = [];
      if (filterText1 === "") {
        return data;
      }
      if (filterText1 === "drafts") {
        if (item.completedAllMandatorySteps === false) {
          filteredconfs.push(item);
          return filteredconfs;
        }
      }
      if (filterText1 === "expiredConfs") {
        if (Date.parse(item.endDate) < new Date()) {
          filteredconfs.push(item);
          return filteredconfs;
        }
      }
      if (filterText1 === "futureConfs") {
        if (
          Date.parse(item.startDate) > new Date() &&
          Date.parse(item.endDate) > new Date()
        ) {
          filteredconfs.push(item);
          return filteredconfs;
        }
      }
      if (filterText2 === "self") {
        if (item.host === "user") {
          filteredconfs.push(item);
          return filteredconfs;
        }
      }
    });
    return filterdData;
  };

  // const filterTwo = (data) => {
  //   let secondFilterData = [];
  //   myConfs.filter((item) => {
  //     if (item.host === "user") {
  //       secondFilterData.push(item);
  //     }
  //     console.log("data", secondFilterData);
  //     return secondFilterData;
  //   });

  //   myConfs.filter((item) => {
  //     if (item.host === "organization") {
  //       if (item.hostedBy.organization._id === filterText2) {
  //         secondFilterData.push(item);
  //       }
  //     }
  //     return secondFilterData;
  //   });
  // };

  const getMyConfs = async (userId) => {
    const url = `/conferences/users/${userId}?getAllOrganizationConferences=true`;
    try {
      const response = await api.get(url);
      if (response) {
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
  }, [user._id]);

  return (
    <div>
      <div className="myconfs-header mb-24">
        <h1 className="mr-16">Conferences</h1>
        <button className="button button-green">Create conference</button>
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
            onChange={(value) => setFilterText1(value?.value)}
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
            onChange={(value) => setFilterText2(value?.value)}
            value={filterText2}
            placeholder="Filter"
            isDisabled={false}
            isMulti={false}
          />
        </div>
      </div>
      <div>
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
            {filter(filterOne(myConfs))?.map((conf) => (
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
                <td>Live</td>
                <td>
                  <i>
                    {/* <ThreeDotsVIcon className="icon-size" /> */}
                    <EditIcon className="icon-size" />
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
