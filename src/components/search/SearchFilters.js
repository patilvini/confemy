import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import AsyncSelect from "react-select/async";
import Select from "react-select";

import NextIcon from "../icons/NextIcon";
import DropdownIcon from "../icons/DropdownIcon";

import OnlyDatepicker from "../react-datepicker/OnlyDatePicker";
import "./searchFilters.styles.scss";
import api from "../../utility/api";
import {
  professions,
  subspecialties,
  currencylist,
} from "../../utility/commonUtil";
import { alertAction } from "../../redux/alert/alertAction";
import { hover } from "@testing-library/user-event/dist/hover";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

const customStyles = {
  control: (styles, state) => {
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

export default function SearchFilters({
  location,
  onLocationChange,
  loadLocations,

  startDate,
  setStartDate,
  endDate,
  setEndDate,

  profession,
  onProfessionChange,
  specialities,
  onSpecialitiesChange,
  spltDisabled,

  creditType,
  onCreditTypeChange,

  creditAmount,
  onCreditAmountChange,
  creditAmountDisabled,

  currency,
  onCurrencyChange,
  maxPrice,
  onMaxPriceChange,
  minPrice,
  onMinPriceChange,
  priceDisabled,

  clearAllFilters,
}) {
  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openProfession, setOpenProfession] = useState(false);
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [creditOptions, setCreditOptions] = useState([]);

  const dispatch = useDispatch();

  const getValue = (options, value, isMulti) => {
    if (isMulti) {
      return value;
    } else {
      return options ? options?.find((option) => option.value === value) : "";
    }
  };

  // load credit types from backend
  async function getCreditTypes() {
    try {
      const response = await api.get("conferences/credits");
      if (response) {
        setCreditOptions(response.data.data.credits);
      }
    } catch (err) {
      if (err) dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  useEffect(() => {
    getCreditTypes();
  }, []);

  return (
    <div className="sf-container">
      <div>
        <div className="sf-header">
          <h3>Filters</h3>
          <div
            onClick={() => clearAllFilters()}
            className="caption-1-heavy-gray3 clearall-btn-wrap"
          >
            Clear All
          </div>
        </div>
        <div
          onClick={() => setOpenLocation((prev) => !prev)}
          className={openLocation ? "active-sf-item" : "sf-item"}
        >
          <p>Location</p>
          {openLocation ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openLocation ? "sf-input-wrap" : "display-none"}>
          <AsyncSelect
            value={location}
            onChange={onLocationChange}
            placeholder={"Select country, state or city..."}
            loadOptions={loadLocations}
            isClearable
            styles={customStyles}
          />
        </div>
        <div
          onClick={() => setOpenDate((prev) => !prev)}
          className={openDate ? "active-sf-item" : "sf-item"}
        >
          <p>Date</p>
          {openDate ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openDate ? "sf-input-wrap flex" : "display-none"}>
          <div className="mr-4">
            <OnlyDatepicker
              name="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // minDate={new Date()}
              placeholder="Start date"
              disabled={false}
            />
          </div>
          <div className="ml-4">
            <OnlyDatepicker
              name="endDate"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              placeholder="End date"
              disabled={false}
            />
          </div>
        </div>
        <div
          onClick={() => setOpenProfession((prev) => !prev)}
          className={openProfession ? "active-sf-item" : "sf-item"}
        >
          <p>Profession</p>
          {openProfession ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openProfession ? "sf-input-wrap" : "display-none"}>
          <Select
            key={getValue(professions, profession)}
            name="profession"
            options={professions}
            value={getValue(professions, profession)}
            onChange={onProfessionChange}
            placeholder="Select Profession"
            isClearable={true}
            isMulti={false}
            styles={customStyles}
          />
        </div>
        <div
          onClick={() => setOpenSpecialty((prev) => !prev)}
          className={openSpecialty ? "active-sf-item" : "sf-item"}
        >
          <p>Specialty</p>
          {openSpecialty ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openSpecialty ? "sf-input-wrap" : "display-none"}>
          <Select
            name="specialties"
            value={specialities}
            isMulti
            options={subspecialties}
            placeholder="Select specialties"
            onChange={onSpecialitiesChange}
            isClearable={false}
            styles={customStyles}
            isDisabled={spltDisabled}
          />
        </div>

        <div
          onClick={() => setOpenCredits((prev) => !prev)}
          className={openCredits ? "active-sf-item" : "sf-item"}
        >
          <p>Credits</p>
          {openCredits ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openCredits ? "sf-input-wrap" : "display-none"}>
          <Select
            key={getValue(creditOptions, creditType)}
            name="creditType"
            options={creditOptions}
            value={getValue(creditOptions, creditType)}
            onChange={onCreditTypeChange}
            placeholder="Select credit"
            isClearable={true}
            isMulti={false}
            styles={customStyles}
          />
          <div className="form-type-3 mt-8">
            <input
              style={{
                ...(creditAmountDisabled && {
                  backgroundColor: shade2,
                  color: shade4,
                }),
              }}
              type="number"
              name="creditAmount"
              placeholder="Credit Amount"
              value={creditAmount}
              onChange={onCreditAmountChange}
              disabled={creditAmountDisabled}
            />
          </div>
        </div>
        <div
          onClick={() => setOpenPrice((prev) => !prev)}
          className={openPrice ? "active-sf-item" : "sf-item"}
        >
          <p>Price</p>
          {openPrice ? (
            <DropdownIcon className="icon-size" />
          ) : (
            <NextIcon className="icon-size" />
          )}
        </div>
        <div className={openPrice ? "sf-input-wrap" : "display-none"}>
          <Select
            key={getValue(currencylist, currency)}
            name="currency"
            options={currencylist}
            value={getValue(currencylist, currency)}
            onChange={onCurrencyChange}
            placeholder="Select currency"
            isClearable={true}
            isMulti={false}
            styles={customStyles}
          />
          <div className="form-type-3 mt-8">
            <p className="caption-3 ml-4">Max Price</p>
            <input
              style={{
                ...(priceDisabled && {
                  backgroundColor: shade2,
                  color: shade4,
                }),
              }}
              // style={{ backgroundColor: priceDisabled ? shade2 : null }}
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={maxPrice}
              onChange={onMaxPriceChange}
              disabled={priceDisabled}
            />
          </div>
          <div className="form-type-3 mt-8">
            <p className="caption-3 ml-4">Min Price</p>
            <input
              style={{
                ...(priceDisabled && {
                  backgroundColor: shade2,
                  color: shade4,
                }),
              }}
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={minPrice}
              onChange={onMinPriceChange}
              disabled={priceDisabled}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
