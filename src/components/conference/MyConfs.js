import SearchIcon from "../icons/SearchIcon";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SelectFormType3 from "../reselect/SelectFormType3";
import ThreeDotsVIcon from "../icons/ThreeDotsVIcon";

import MyConfsCard from "./MyConfsCard";
import EditIcon from "../icons/EditIcon";

import "./myConfs.styles.scss";
import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";
import { loadAllMyConfsAction } from "../../redux/conference/conferenceAction";

const options1 = [
  { value: "drafts", label: "Drafts" },
  { value: "pastConfs", label: "Prior Confs" },
  { value: "futureConfs", label: "Coming Confs" },
];

const options2 = [
  { value: "self", label: "User" },
  { value: "umn", label: "UMN" },
  { value: "mayo", label: "Mayo" },
];

export default function MyConfs() {
  const [searchText, setSearchText] = useState("");
  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");

  const user = useSelector((state) => state.auth.user);
  const myConfs = useSelector((state) => state.conference.myConfs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onInputChange = (e) => setSearchText(e.target.value);

  const keys = ["title", "city"];

  const filter = (data) => {
    let filteredConfs = data.filter((item) =>
      keys.some((key) => item[key]?.toLowerCase()?.includes(searchText))
    );

    return filteredConfs;
  };

  const getMyConfs = async (userId) => {
    const url = `/conferences/users/${userId}?getAllOrganizationConferences=true`;
    try {
      const response = await api.get(url);
      console.log("myconfs", response);
      if (response) {
        dispatch(loadAllMyConfsAction(response.data.data.conferences));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  // const myFilteredConfs = search(myConfs);

  useEffect(() => {
    getMyConfs(user._id);
  }, [user._id]);

  // console.log("myFilteredConfs", myFilteredConfs);

  // console.log("searchText", searchText);
  console.log("searchText1", filterText1);
  console.log("searchText2", filterText2);

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
            name="filuterText2"
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
            {filter(myConfs)?.map((conf) => (
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
