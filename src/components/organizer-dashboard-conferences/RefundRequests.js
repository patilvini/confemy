import { useState } from "react";
import SearchBar from "../search/SearchBar";
import Select from "react-select";


const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

export default function RefundRequests() {
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");




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

const options = [
  { value: "Physician", label: "Physician" },
  { value: "Nurse", label: "Nurse" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Example 1", label: "Example 1" },
  { value: "Example 2", label: "Example 2" },
];

  const a = [0, 0, 0];
  return (
    <div className="dash-wrapper">
      <h1 style={{marginRight:"2rem"}}>Refund Requests</h1>
      <div className="opposite-grid">
        
      
        
        <div>
          <SearchBar
            onClear={() => setSearchValue("")}
            setValue={(value) => {
              setSearchValue(value);
            }}
            value={searchValue}
            // data={data}
          />
        </div>

        <div className="grid-item-right" style={{width:"89%", margin:"2rem 0rem 2rem 4rem", alignSelf:"center"}}>

        <Select width='200px' options={options} styles={customStyles}/>
        </div>
        
      </div>

      <div>
        <div className="request-table-heading">
          <div className="request-table-name">Name</div>
          <div className="request-table-item">Conference</div>

          <div className="request-table-item">Booked</div>

          <div className="request-table-item">Registration #</div>
          <div className="request-table-item">
          
            <button>Approve all</button>
          </div>
        </div>

        {a.map((item, index) => {
          return (
            <div className="request-table" key={index}>
              <div className="request-table-name">Mohamad Ali Khan</div>
              <div className="caption-2-regular-gray3 request-table-conf">
                
                  Future of innovation in medicines after COVID-19
              
              </div>

              <div className="request-table-date">
                
                  OCT 21, 2021
          
              </div>

              <div className="request-table-registration">
                <p className="caption-2-regular-gray3">2164516123168</p>
              </div>
              <div className="request-table-item">
                
                <button className="button-green" >Approve Refund</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
