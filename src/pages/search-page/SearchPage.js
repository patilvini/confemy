import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { zonedTimeToUtc } from "date-fns-tz";
import SearchFilters from "../../components/search/SearchFilters";
import api from "../../utility/api";
import Loader from "../../components/loader/Loader";
import SearchIcon from "../../components/icons/SearchIcon";
import SearchResult from "../../components/search/SearchResult";

import {
  searchConfsAction,
  confSearchInitiatedAction,
} from "../../redux/conference/conferenceAction";
import { alertAction } from "../../redux/alert/alertAction";
import "./searchPage.styles.scss";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [creditType, setCreditType] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [mode, setMode] = useState("allConferences");
  const [spltDisabled, setSpltDisabled] = useState(true);
  const [creditAmountDisabled, setCreditAmountDisabled] = useState(true);
  const [priceDisabled, setPriceDisabled] = useState(true);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.conference.search);
  const { state } = useLocation();

  //  get utc date for location timezone
  let timezone;
  if (location) {
    timezone = location.timezone;
  } else {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  // const timezone = location?.timezone;
  const locationValue = location?.value;
  let utcStartDate;
  let utcEndDate;
  if (startDate && timezone) {
    utcStartDate = zonedTimeToUtc(startDate, timezone).toISOString();
  }
  if (endDate && timezone) {
    utcEndDate = zonedTimeToUtc(endDate, timezone).toISOString();
  }
  // construct filters array from state values of filters
  let filters = [];
  if (locationValue) {
    filters.push({ label: "location", value: locationValue });
  }
  if (profession) {
    filters.push({ label: "profession", value: profession });
  }
  if (specialities?.length > 0) {
    filters.push({ label: "specialities", values: specialities });
  }
  if (utcStartDate || utcEndDate) {
    filters.push({ label: "date", start: utcStartDate, end: utcEndDate });
  }
  if (creditType && creditAmount) {
    filters.push({
      label: "credits",
      value: creditType,
      quantity: creditAmount,
    });
  }

  let intMinPrice;
  if (minPrice >= 0) intMinPrice = parseInt(minPrice);

  let intMaxPrice;
  if (maxPrice >= 0) intMaxPrice = parseInt(maxPrice);

  if (currency || intMinPrice || intMaxPrice) {
    filters.push({
      label: "price",
      currency: currency,
      min: intMinPrice,
      max: intMaxPrice,
    });
  }

  // function to call search api. it will send above filters array
  async function loadSearchResults() {
    console.log("loadSearch called");
    dispatch(confSearchInitiatedAction());
    const url = `homePage/conferences/search?page=1&limit=10&text=${query}`;
    try {
      const response = await api.post(url, { filters });
      if (response) {
        dispatch(searchConfsAction(response.data.data));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const onProfessionChange = (value) => {
    if (profession !== value?.value) {
      setSpecialities([]);
    }
    if (!value?.value) {
      setSpltDisabled(true);
    } else {
      setSpltDisabled(false);
    }
    setProfession(value?.value);
  };

  const onCreditTypeChange = (credit) => {
    if (!credit?.value) {
      setCreditAmountDisabled(true);
      setCreditAmount(0);
    } else {
      setCreditAmountDisabled(false);
    }
    setCreditType(credit?.value);
  };

  const onCurrencyChange = (currency) => {
    if (!currency?.value) {
      setPriceDisabled(true);
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setPriceDisabled(false);
    }
    setCurrency(currency?.value);
  };

  // async function to get locations. its called on every key change in location filter
  const loadLocations = async (searchText, callback) => {
    const response = await api.get(`venues/search?venue=${searchText}`);
    callback(response.data.data.venue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadSearchResults();
  };

  function clearAllFilters() {
    setLocation("");
    setProfession("");
    setSpecialities([]);
    setStartDate(null);
    setEndDate(null);
    setCreditType("");
    setCreditAmount(0);
    setCurrency("");
    setMinPrice(0);
    setMaxPrice(0);
    setSpltDisabled(true);
    setCreditAmountDisabled(true);
    setPriceDisabled(true);
  }

  function renderSearch(type) {
    switch (type) {
      case "allConferences":
        return (
          <SearchResult
            result={search.conferences}
            isLoading={search.isLoading}
          />
        );
      case "livestreamConfs":
        return (
          <SearchResult
            result={search.liveStreamConfs}
            isLoading={search.isLoading}
          />
        );
      case "video":
        return <div>Coming Soon</div>;
      case "audio":
        return <div>Coming Soon</div>;
      default:
        return null;
    }
  }
  useEffect(() => {
    loadSearchResults();
  }, [
    location,
    profession,
    specialities,
    startDate,
    endDate,
    creditType,
    creditAmount,
    currency,
    maxPrice,
    minPrice,
  ]);

  useEffect(() => {
    setLocation(state);
  }, [state]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  return (
    <div className="container pt-64">
      <div className="sp-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <SearchFilters
            location={location}
            onLocationChange={(location) => setLocation(location)}
            loadLocations={loadLocations}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            profession={profession}
            onProfessionChange={onProfessionChange}
            specialities={specialities}
            onSpecialitiesChange={(speciality) => setSpecialities(speciality)}
            spltDisabled={spltDisabled}
            creditType={creditType}
            onCreditTypeChange={onCreditTypeChange}
            creditAmount={creditAmount}
            onCreditAmountChange={(e) =>
              setCreditAmount(parseInt(e.target.value))
            }
            creditAmountDisabled={creditAmountDisabled}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            minPrice={minPrice}
            onMinPriceChange={(e) => setMinPrice(e.target.value)}
            maxPrice={maxPrice}
            onMaxPriceChange={(e) => setMaxPrice(e.target.value)}
            priceDisabled={priceDisabled}
            clearAllFilters={clearAllFilters}
          />
          <div className="sb-container">
            <div
              style={{ flexGrow: 1, position: "relative" }}
              className="form-type-2"
            >
              <input
                type="text"
                name="query"
                value={query}
                onChange={onQueryChange}
                placeholder="Search by conference title or tags..."
              />
              <i
                className={
                  query?.length > 0 ? "display-none" : "conf-search-input-icon"
                }
              >
                <SearchIcon width="2.4rem" height="2.4rem" />
              </i>
            </div>
            <button
              type="submit"
              style={{
                padding: "1.4rem 2.4rem",
                maxHeight: "4.6rem",
                marginRight: "1.6rem",
              }}
              className="button button-primary ml-16"
            >
              Search
            </button>
          </div>
          <div className="flex mt-16 ml-20">
            <input
              type="radio"
              style={{ display: "none" }}
              id="searchAllConf"
              name="mode"
              value="allConferences"
              checked={mode === "allConferences"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label htmlFor="searchAllConf">
              <div
                className={`mr-40 ${
                  mode === "allConferences"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                All Conferences ({search.conferences.length})
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="mode"
              id="searchLivestreamConfs"
              value="livestreamConfs"
              checked={mode === "livestreamConfs"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label htmlFor="searchLivestreamConfs">
              <div
                className={`mr-40 ${
                  mode === "livestreamConfs"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Stream Live ({search.liveStreamConfs.length})
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="mode"
              id="searchVideo"
              value="video"
              checked={mode === "video"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label htmlFor="searchVideo">
              <div
                className={`mr-40 ${
                  mode === "video"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Video on demand (0)
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="mode"
              id="searchAudio"
              value="audio"
              checked={mode === "audio"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label htmlFor="searchAudio">
              <div
                className={`mr-20 ${
                  mode === "audio"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Audio podcast (0)
              </div>
            </label>
          </div>
        </form>
        {search.isLoading && search.conferences.length === 0 ? (
          <Loader />
        ) : (
          renderSearch(mode)
        )}
      </div>
    </div>
  );
}
