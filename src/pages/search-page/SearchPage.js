import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zonedTimeToUtc } from "date-fns-tz";

import SearchFilters from "../../components/search/SearchFilters";
import SearchResult from "../../components/search/SearchResult";
import SearchInput from "../../components/search/SearchInput";
import api from "../../utility/api";
import ConfCard from "../../components/conf-card/ConfCard";
import Loader from "../../components/loader/Loader";
import SearchIcon from "../../components/icons/SearchIcon";

import { searchConfsAction } from "../../redux/conference/conferenceAction";
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
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchType, setSearchType] = useState("searchConf");

  const dispatch = useDispatch();
  const search = useSelector((state) => state.conference.search);

  //  get utc date for location timezone
  const timezone = location?.timezone;
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
  if (currency && maxPrice) {
    filters.push({
      label: "price",
      currency: currency,
      min: 0,
      max: maxPrice,
    });
  }

  // function to call search api. it will send above filters array
  async function loadSearchResults() {
    console.log("loadSearch called");
    const url = `homePage/conferences/search?page=1&limit=10&text=${query}`;
    try {
      const response = await api.post(url, { filters });
      if (response) {
        console.log("search response", response);
        dispatch(searchConfsAction(response.data.data.conferences));
      }
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  }

  const onQueryChange = (e) => {
    setQuery(e.target.value);
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
  ]);

  console.log("filters", filters);

  return (
    <div className="container pt-64 position-relative">
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
            onProfessionChange={(profession) =>
              setProfession(profession?.value)
            }
            specialities={specialities}
            onSpecialitiesChange={(speciality) => setSpecialities(speciality)}
            creditType={creditType}
            onCreditTypeChange={(credit) => setCreditType(credit?.value)}
            creditAmount={creditAmount}
            onCreditAmountChange={(e) => setCreditAmount(e.target.value)}
            currency={currency}
            onCurrencyChange={(currency) => setCurrency(currency?.value)}
            maxPrice={maxPrice}
            onMaxPriceChange={(e) => setMaxPrice(e.target.value)}
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
              style={{ padding: "1.4rem 2.4rem", maxHeight: "4.6rem" }}
              className="button button-primary ml-16"
            >
              Search
            </button>
          </div>
          <div className="flex mt-16 ml-20">
            <input
              type="radio"
              style={{ display: "none" }}
              id="searchConf"
              name="searchType"
              value="searchConf"
              checked={searchType === "searchConf"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="searchConf">
              <div
                className={`mr-40 ${
                  searchType === "searchConf"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Attend in person (5)
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="searchType"
              id="searchOrg"
              value="searchOrg"
              checked={searchType === "searchOrg"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="searchOrg">
              <div
                className={`mr-40 ${
                  searchType === "searchOrg"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Stream Live (0)
              </div>
            </label>
            <input
              type="radio"
              style={{ display: "none" }}
              name="searchType"
              id="searchVideo"
              value="video"
              checked={searchType === "video"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="searchVideo">
              <div
                className={`mr-40 ${
                  searchType === "video"
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
              name="searchType"
              id="searchAudio"
              value="audio"
              checked={searchType === "audio"}
              onChange={(e) => setSearchType(e.target.value)}
            />
            <label htmlFor="searchAudio">
              <div
                className={`mr-20 ${
                  searchType === "audio"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Audio podcast (0)
              </div>
            </label>
          </div>
        </form>
        {search?.isLoading ? (
          <Loader />
        ) : (
          <div className="sr-container">
            {search?.result.map((conf) => (
              <div key={conf._id}>
                <ConfCard
                  src={conf.banner[0]?.Location}
                  title={conf.title}
                  startDate={conf.startDate}
                  timezone={conf.timezone}
                  mode={conf.mode}
                  city={conf.city}
                  credits={conf.credits}
                  currency={conf.currency}
                  basePrice={conf.basePrice}
                  confId={conf._id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
