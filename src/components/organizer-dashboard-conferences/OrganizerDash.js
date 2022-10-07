import api from "../../utility/api";
import ConferenceSec from "./ConferenceSec";
import "./organizer-conf-dashboard.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import Select from "react-select";
import { DateTime } from "luxon";


const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

export default function OrganizerDash() {
  const userID = useSelector((state) => state.auth.user?._id);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const getSaved = async (args) => {
    console.log(args);

    if (user.hasOrganization) {
      try {
        const r = await api.get(
          "/conferences/users/628ea4c65fc8c008249c6dc3?" +
            args +
            "&organizationId=62e728bdddc09c136b363680"
        );
        console.log(r.data.data.conferences);

        setData(r.data.data.conferences);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const r = await api.get(
          "/conferences/users/628ea4c65fc8c008249c6dc3?" + args
        );
        console.log(r.data.data.conferences);

        setData(r.data.data.conferences);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const sort = async (e) => {
    getSaved("status=" + e.value);
  };

  useEffect(() => {
    getSaved();
  }, [userID]);

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
      <div className="opposite-grid">
        <h1>Conferences</h1>
        <div className="grid-item-right">
          <button className="button button-green">Create Conference </button>
        </div>
        <div>
        <SearchBar
            onClear={() => setSearchValue("")}
            setValue={(value) => {
              setSearchValue(value);
            }}
            value={searchValue}
            data={data}
          />
        </div>
        <div className="grid-item-right" style={{width:"89%", margin:"2rem 0rem 2rem 4rem", alignSelf:"center"}}>

        <Select width='200px'  onChange={(e) => sort(e)} options={options} styles={customStyles}/>
        </div>
        
      </div>

      <div>
      
      
        
        

        
        
     
      
        
        

      </div>

     
 

      <div>
        <div className="dash-table-heading">
          <div style={{marginLeft:"3rem", fontSize:"2rem", alignSelf:"center", fontWeight:"bold"}}>Conference</div>
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
                className="dash-table-item"
              >
                <ConferenceSec data={item} />
              </div>
              <div className="dash-table-item">{item.totalSold}</div>

              <div className="dash-table-item">{item.grossPrice}</div>

              <div className="dash-table-item">{item.active.toString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
