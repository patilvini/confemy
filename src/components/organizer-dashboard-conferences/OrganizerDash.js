import api from "../../utility/api";
import ConferenceSec from "./ConferenceSec";
import "./organizer-conf-dashboard.scss";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import Select from "react-select";
import { DateTime } from "luxon";
import OrganizersNavbar from "../navbar/OrganizersNavbar";
import DashMenuIcon from "../icons/DashMenuIcon";
import ExploreIcon from "../icons/ExploreIcon";
import ThreeDotsVIcon from "../icons/ThreeDotsVIcon";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

export default function OrganizerDash() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dashOpen, setDashOpen] = useState(false);
  const ref = useRef(null);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const navigate = useNavigate();

  const getSaved = async (args) => {
    console.log(args);

    // if (user.hasOrganization) {
    //   try {
    //     const r = await api.get(
    //       "/conferences/users/"+user._id+"?" +
    //         args +
    //         "&organizationId="+user.organizations[0].organization._id
    //     );
    //     console.log(r.data.data.conferences);

    //     setData(r.data.data.conferences);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    try {
      const r = await api.get(
        "/conferences/users/" + user._id + "?getAllOrganizationConferences=true"
      );
      console.log(r.data.data.conferences);

      setData(r.data.data.conferences);
    } catch (err) {
      console.log(err);
    }
    // }
  };

  const sort = async (e) => {
    getSaved("status=" + e.value);
  };

  useEffect(() => {
    getSaved();
  }, [user._id]);

  useEffect(() => {
    console.log("searchValue:", searchValue);

    if (data) {
      const dataSet = data.filter((item, index) => {
        if (
          item.title.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1
        ) {
          return item;
        }
      });

      console.log("dataset:", dataSet);
      setFiltered(dataSet);
    }
    if (searchValue.length === 0) {
      setFiltered(data);
    }
  }, [searchValue, data]);

  const options = [
    { value: "", label: "All Conferences" },
    { value: "live", label: "Live Conferences" },
    { value: "finished", label: "Finished Conferences" },
    { value: "drafts", label: "Drafts" },
  ];

  const customStyles = {
    control: (styles, state) => {
      // console.log("styles from control", styles);
      // console.log("control state", state);
      return {
        ...styles,
        height: "4.8rem",
        backgroundColor: confemyWhite,
        border: `1px solid ${confemyBlac}`,
        // padding: "13px 0px 13px 16px",
        fontFamily: "Avenir-Roman",
        fontSize: 16,
        zIndex: 1,

        width: "16rem",
        margin: ".5rem",

        ":hover": {
          border: state.isFocused ? "1px solid #55a0fa" : `solid 3px ${shade4}`,
        },

        ":focus": {
          border: "1px solid #55a0fa",
        },
      };
    },

    placeholder: (provided) => ({
      ...provided,
      // fontSize: "1em",
      // color: confemyBlac,
      // fontWeight: 400,
    }),

    option: (provided, state) => {
      return {
        ...provided,
        color: confemyBlac,
        backgroundColor: state.isSelected ? shade2 : "#fff",
        fontSize: 16,
        fontFamily: "Avenir-Roman",
        padding: 16,
      };
    },

    dropdownIndicator: (provided, state) => {
      // console.log("DownChevron provided", provided);
      // console.log("DownChevron state", state);
      return {
        ...provided,
        color: shade1,
        ":hover": {
          color: shade4,
        },
      };
    },
  };

  return (
    <div className="dash-wrapper">
      <div>
        <div className="grid-col-2 mb-20">
          <div>
            <h1>Conferences</h1>
          </div>

          <div className="dash-right-item">
            <button className="button button-green">Create Conference </button>
          </div>
        </div>

        <div className="grid-col-2-2_1">
          <div style={{ alignSelf: "center" }}>
            <SearchBar
              onClear={() => setSearchValue("")}
              setValue={(value) => {
                setSearchValue(value);
              }}
              value={searchValue}
              data={data}
            />
          </div>

          <div style={{ justifyContent: "right" }} className="flex-vc-sb">
            <Select
              placeholder={"Sort"}
              onChange={(e) => sort(e)}
              options={options}
              styles={customStyles}
            />
            <Select
              placeholder={"Sort"}
              onChange={(e) => sort(e)}
              options={options}
              styles={customStyles}
            />
          </div>
        </div>
      </div>

      {optionsOpen && (
        <div className="dash-options">
          <div className="dash-options-item">View</div>
          <div className="dash-options-item">Duplicate</div>
          <div className="dash-options-item">Edit</div>
        </div>
      )}

      <div>
        <div className="dash-table-heading mt-20">
          <div className="dash-table-item">Conference</div>
          <div className="dash-table-item">Sold</div>

          <div className="dash-table-item">Gross</div>

          <div className="dash-table-item">Status</div>
        </div>

        {filtered?.map((item, index) => {
          return (
            <div key={index} className="dash-table">
              <div
                onClick={() => {
                  console.log(DateTime.fromISO(item.endDate));
                  console.log(DateTime.now());

                  if (DateTime.fromISO(item.endDate) < DateTime.now()) {
                    navigate("/dashboard/my-conferences/finished/" + item._id);
                  } else {
                    navigate("/dashboard/my-conferences/live/" + item._id);
                  }
                }}
                className=""
              >
                <ConferenceSec data={item} />
              </div>
              <div className="dash-table-item">{item.totalSold}</div>

              <div className="dash-table-item">{item.grossPrice}</div>

              <div className="dash-table-item">
                <div className="flex-vc-se">
                  <div>{item.active.toString()}</div>
                  <div>
                    <i onClick={() => setOptionsOpen(!optionsOpen)}>
                      <ThreeDotsVIcon className={"icon-size mt-5  "} />
                    </i>{" "}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
