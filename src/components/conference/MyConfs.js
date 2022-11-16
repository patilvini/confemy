import SearchIcon from "../icons/SearchIcon";
import { useState } from "react";
import Select from "react-select";
import SelectFormType3 from "../reselect/SelectFormType3";
import ThreeDotsVIcon from "../icons/ThreeDotsVIcon";

import MyConfsCard from "./MyConfsCard";
import EditIcon from "../icons/EditIcon";

import "./myConfs.styles.scss";

const options1 = [
  { value: "drafts", label: "Drafts" },
  { value: "pastConfs", label: "Prior Confs" },
  { value: "futureConfs", label: "Coming Confs" },
];

const options2 = [
  { value: "all", label: "All" },
  { value: "umn", label: "UMN" },
  { value: "mayo", label: "Mayo" },
];

export default function MyConfs() {
  const [formData, setFormData] = useState({
    searchText: "",
  });

  const [filterText1, setFilterText1] = useState("");
  const [filterText2, setFilterText2] = useState("");

  const { searchText } = formData;

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = { searchText, filterText1 };
  };

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
            <tr>
              <td>
                <MyConfsCard />
              </td>
              <td>10/50</td>
              <td>$200</td>
              <td>Live</td>
              <td>
                <i>
                  {/* <ThreeDotsVIcon className="icon-size" /> */}
                  <EditIcon className="icon-size" />
                </i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
