import { useState } from "react";
import { zonedTimeToUtc } from "date-fns-tz";

import SearchFilters from "../../components/search/SearchFilters";
import SearchResult from "../../components/search/SearchResult";
import SearchInput from "../../components/search/SearchInput";
import api from "../../utility/api";
import ConfCard from "../../components/conf-card/ConfCard";

import "./searchPage.styles.scss";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [profession, setProfession] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [creditType, setCreditType] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [priceAmount, setPriceAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [searchType, setSearchType] = useState("searchConf");
  const [searchResults, setSearchResults] = useState([]);

  const onLocationChange = (selectedLocation) => {
    console.log("selected location", selectedLocation);
    setLocation(selectedLocation);
  };

  const loadLocations = async (searchText, callback) => {
    console.log("searchtext", searchText);
    const response = await api.get(`venues/search?venue=${searchText}`);
    console.log("veneu search", response);
    callback(response.data.data.venue);
  };

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log("sumbit clicked");
    e.preventDefault();
    const url = `homePage/conferences/search?page=1&limit=10&text=${query}`;
    let timezone;
    if (location && location.timezones.length > 0) {
      timezone = location?.timezones[0]?.zoneName;
    }
    let utcStartDate;
    let utcEndDate;
    if (startDate && timezone) {
      utcStartDate = zonedTimeToUtc(startDate, timezone).toISOString();
    }
    if (endDate && timezone) {
      utcEndDate = zonedTimeToUtc(endDate, timezone).toISOString();
    }

    let filters = [];

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

    if (currency && priceAmount) {
      filters.push({
        label: "price",
        currency: currency,
        min: 0,
        max: priceAmount,
      });
    }

    console.log("filters", filters);

    try {
      const response = await api.post(url, { filters });
      if (response) {
        console.log("search response", response);
        setSearchResults(response.data.data.conferences);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container pt-64 position-relative">
      <div className="sp-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <SearchFilters
            location={location}
            onLocationChange={onLocationChange}
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
            priceAmount={priceAmount}
            onPriceAmountChange={(e) => setPriceAmount(e.target.value)}
          />
          <div className="sb-container">
            <div style={{ flexGrow: 1 }} className="form-type-2">
              <input
                type="text"
                name="query"
                value={query}
                onChange={onQueryChange}
                placeholder="Search by conference title or tags..."
              />
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
                className={`mr-60 ${
                  searchType === "searchConf"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Conferences (5)
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
                className={`mr-20 ${
                  searchType === "searchOrg"
                    ? "active-search-type"
                    : "inactive-search-type "
                }`}
              >
                Organizations (0)
              </div>
            </label>
          </div>
        </form>
        <div className="sr-container">
          {searchResults &&
            searchResults.map((conf) => (
              <div key={conf._id}>
                <ConfCard
                  src={conf.banner[0]?.Location}
                  confName={conf.title}
                  startDate={conf.startDate}
                  location={conf.city}
                  credits={conf.credits[0]?.creditId}
                  currency={conf.currency}
                  creditAmount={conf.credits[0].quantity}
                  price={conf.basePrice}
                  // link
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
