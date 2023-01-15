import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AsyncSelect from "react-select/async";
import LocationIcon from "../icons/LocationIcon";
import WorldIcon from "../icons/WorldIcon";

import api from "../../utility/api";
import { loadLocations } from "../../utility/commonUtil";
import "./locationDropdown.styles.scss";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

export default function LocationDropdown({ className }) {
  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
  const [location, setLocation] = useState("");
  const [topCities, setTopCities] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredTopCities, setFilteredTopCities] = useState([]);

  const onDropdownClick = () => {
    setOpenLocationDropdown(!openLocationDropdown);
  };

  const getGeoInfo = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      console.log("get geolocation", response);
      if (response) {
        try {
          const res = await api.get(
            `venues/locations?country=${response.data.country_name}`
          );
          console.log("citiesRes", res);
          if (res) {
            setTopCities(res.data.data.venues);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLocationChange = (location) => setLocation(location);

  //   async function getGeoInfo() {
  //     try {
  //       const response = await axios.get("https://ipapi.co/json/");
  //       console.log("get geolocation", response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  const customStyles = {
    control: (styles, state) => {
      console.log("async state", state);
      if (state.isFocused) {
        setSearchFocused(true);
      } else {
        setSearchFocused(false);
      }
      return {
        ...styles,
        backgroundColor: state.isDisabled ? shade2 : confemyWhite,
        border: state.isFocused ? "1px solid #55a0fa" : `1px solid ${shade1}`,
        padding: "4px 0px 4px 0px",
        fontFamily: "Avenir-Roman",
        fontSize: "1.6rem",
        ":hover": {
          border: state.isFocused ? "1px solid #55a0fa" : `solid 1px ${shade4}`,
        },
      };
    },
    placeholder: (provided, state) => {
      return {
        ...provided,
        color: state.isDisabled ? shade4 : "hsl(0, 0%, 50%)",
        fontFamily: "Avenir-Roman",
        fontSize: "1.6rem",
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: confemyBlac,
        fontSize: "1.4rem",
        fontFamily: "Avenir-Roman",
      };
    },
    dropdownIndicator: (provided, state) => {
      return {
        ...provided,
        paddingRight: 6,
        paddingLeft: 4,
      };
    },

    noOptionsMessage: (provided, state) => {
      return {
        ...provided,
        backgroundColor: shade3,
        color: confemyBlac,
        fontSize: 16,
      };
    },
  };

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpenLocationDropdown(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    getGeoInfo();
  }, []);

  // console.log("top cities", topCities);
  // console.log("filtered cities:", filteredTopCities);

  return (
    <div ref={ref}>
      <div className="flex-vc" onClick={onDropdownClick}>
        <LocationIcon className="icon-sm " />
        <span className="location-text">Location</span>
      </div>
      <div
        className={openLocationDropdown ? "location-dropdown" : "display-none"}
      >
        <div className="location-item flex-vc">
          <i className="mr-16">
            <WorldIcon className="icon-sm" />
          </i>
          <span className="body-regular-gray3">Online</span>
        </div>
        <div className="location-item flex-vc">
          <i className="mr-16">
            <LocationIcon className="icon-sm" />
          </i>
          <span className="body-regular-gray3">World</span>
        </div>
        <div className="ld-topcities">Top Cities</div>
        <div className="ld-searchbox">
          <div className="form-type-2">
            <input
              type="text"
              name="searchText"
              value={searchText}
              onChange={onSearchChange}
              placeholder="Enter city"
            />
          </div>
        </div>
        <div className="ld-citieswrap">
          {topCities
            .filter((city) =>
              city.label.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((city) => (
              <div
                onClick={() => {
                  setOpenLocationDropdown(false);
                  navigate("/search-conference", { state: city });
                }}
                className="location-item"
                key={city._id}
              >
                {city.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
