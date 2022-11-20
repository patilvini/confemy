import { useState } from "react";
import SearchFilters from "../../components/search/SearchFilters";
import SearchResult from "../../components/search/SearchResult";
import SearchInput from "../../components/search/SearchInput";
import api from "../../utility/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [profession, setProfession] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [creditType, setCreditType] = useState("");
  const [creditAmount, setCreditAmount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [priceAmount, setPriceAmount] = useState(null);
  const [location, setLocation] = useState("");

  const onLocationChange = (selectedLocation) => {
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
  const onQuerySubmit = async (text) => {
    const url = `homePage/conferences/search?page=1&limit=10&text=${text}`;

    let formData = {
      filters: [],
    };

    if (profession) {
      formData.filters.push({ label: "profession", value: profession });
    }

    if (specialities?.length > 0) {
      formData.filters.push({ label: "specialities", values: specialities });
    }

    if (startDate || endDate) {
      formData.filters.push({ label: "date", start: startDate, end: endDate });
    }

    if (creditType && creditAmount) {
      formData.filters.push({
        label: "credits",
        value: creditType,
        quantity: creditAmount,
      });
    }

    if (currency && priceAmount) {
      formData.filters.push({
        label: "price",
        currency: currency,
        min: 0,
        max: priceAmount,
      });
    }

    console.log("formData", formData);
    try {
      const response = await api.post(url, formData);
      console.log("search response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="container">
      <div className="mt-64"></div>
      {/* above empty div pushes content below navbar  */}
      <div className="flex">
        <div>
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
        </div>
        <div className="sr-container">
          <SearchInput
            query={query}
            setQuery={setQuery}
            onQueryChange={onQueryChange}
            onQuerySubmit={onQuerySubmit}
          />
        </div>
      </div>
    </main>
  );
}
