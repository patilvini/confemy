import { useEffect, useState } from "react";
import api from "../../utility/api";
import ConfCard from "../conf-card/ConfCard";
import Select from "react-select";

import "./searchComponent.scss";
import "../../utility/utility.styles.scss";
import DropdownIcon from "../icons/DropdownIcon";

import NextIcon from "../icons/NextIcon";
import SearchIcon from "../icons/SearchIcon";
import DateSelect from "./DateSelect";
import TabButton from "./TabButton";
import LocationSelect from "./LocationSelect";
import ProfessionSelect from "./ProfessionSelect";
import CreditsSelect from "./CreditsSelect";
import PriceSelect from "./PriceSelect";
import MultiTabButton from "./MultiTabButton";
import BackIcon from "../icons/BackIcon";
import DisabledTab from "./DisabledTab";
import SpecialitySelect from "./SpecialitySelect";
import SearchBar from "./SearchBar";

export default function SearchComponent() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [dateVisibility, setDateVisibility] = useState(false);
  const [locationVisibility, setLocationVisibility] = useState(false);
  const [professionVisibility, setProfessionVisibility] = useState(false);
  const [specialityVisibility, setSpecialityVisibility] = useState(false);
  const [creditsVisibility, setCreditsVisibility] = useState(false);
  const [priceVisibility, setPriceVisibility] = useState(false);

  const [dateValue, setDateValue] = useState();
  const [locationValue, setLocationValue] = useState();
  const [professionValue, setProfessionValue] = useState();
  const [specialityValue, setSpecialityValue] = useState([]);
  const [creditsValue, setCreditsValue] = useState();
  const [priceValue, setPriceValue] = useState();

  const [filters, setFilter] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const r = await api.post("/conferences/search?page=1&limit=10");
        console.log(r);
        setData(r.data.data.conferences);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    console.log(filters);

    const call = async () => {
      try {
        const r = await api.post("/conferences/search?page=1&limit=10", {
          filters: filters,
        });
        console.log(r);
        setData(r.data.data.conferences);
      } catch (err) {
        console.log(err);
      }
    };

    call();
  }, [filters]);

  return (
    <>
      <div className="sidenav">
        {visibility && (
          <div className="title-grid">
            <div className="title-grid-item">
              <h2 className="title">Filters</h2>
            </div>
            <div className="title-grid-item">
              <button
                onClick={() => {
                  setDateValue();
                  setLocationValue();
                  setProfessionValue();
                  setSpecialityValue();
                  setCreditsValue();
                  setPriceValue();
                  setFilter([]);
                }}
                className="clear-all-button"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        <div>
          <div>
            {visibility && (
              <TabButton
                clear={() => {
                  setDateValue();

                  const values = filters.filter((item) => {
                    if (item.label !== "dates") {
                      return item;
                    }
                  });
                 
                  setFilter(values);
                }}
                selected={dateValue}
                name="Date"
                open={() => {
                  setVisibility(false);
                  setDateVisibility(true);
                }}
              />
            )}
            {dateVisibility && (
              <DateSelect
                setValue={(value) => {
                  setDateValue(value);

                  setFilter([
                    ...filters,
                    {
                      label: "dates",
                      startDate: value.startDate,
                      endDate: value.endDate,
                    },
                  ]);
                }}
                close={() => {
                  setVisibility(true);
                  setDateVisibility(false);
                }}
              />
            )}
          </div>
          <div>
            {visibility && (
              <TabButton
                name="Location"
                clear={() => setLocationValue()}
                open={() => {
                  setVisibility(false);
                  setLocationVisibility(true);
                }}
              />
            )}
            {locationVisibility && (
              <LocationSelect
                close={() => {
                  setVisibility(true);
                  setLocationVisibility(false);
                }}
              />
            )}
          </div>

          <div>
            {visibility && (
              <TabButton
                clear={() => {
                  const values = filters.filter((item) => {
                    if (
                      item.label !== "profession" &&
                      item.label !== "specialities"
                    ) {
                      return item;
                    }
                  });
               

                  setFilter(values)
                  setProfessionValue();
                  setSpecialityValue();
                }}
                selected={professionValue}
                name="Profession"
                open={() => {
                  setVisibility(false);
                  setProfessionVisibility(true);
                }}
              />
            )}
            {professionVisibility && (
              <ProfessionSelect
                setValue={(value) => {
                  setProfessionValue(value);
                  setFilter([
                    ...filters,
                    { label: "profession", value: value.value },
                  ]);
                }}
                close={() => {
                  setVisibility(true);
                  setProfessionVisibility(false);
                }}
              />
            )}
          </div>
          <div>
            {visibility && (
              <MultiTabButton
                clearOne={(value) => {
                  let values = specialityValue.filter((item) => {
                    if (item.label !== value) {
                      return item;
                    }
                  });
                  setSpecialityValue(values);
                  
                  console.log(values)

                 



                
                }}
                prerequisite={professionValue}
                clear={() => {
                  setSpecialityValue([]);

                  const values = filters.filter((item) => {
                    if (item.label !== "specialities") {
                      return item;
                    }
                  });

                  setFilter(values);
                }}
                selected={specialityValue}
                name="Speciality"
                open={() => {
                  setVisibility(false);
                  setSpecialityVisibility(true);
                }}
              />
            )}
            {specialityVisibility && (
              <SpecialitySelect
                setValue={(value) => {
                  setSpecialityValue(value);
                  
                  const values = [];
                  for (let i in value) {
                 
                    values.push(value[i].value);
                  }
                  setFilter([
                    ...filters,
                    { label: "specialities", values: values },
                  ]);
                }}
                close={() => {
                  setVisibility(true);
                  setSpecialityVisibility(false);
                }}
              />
            )}
          </div>
          <div>
            {visibility && (
              <TabButton
                clear={() => {
                  setCreditsValue()

                  const values = filters.filter((item) => {
                    if (item.label !== "credits") {
                      return item;
                    }
                  });

                  setFilter(values);
                
                }}
                selected={creditsValue}
                name="Credits"
                open={() => {
                  setVisibility(false);
                  setCreditsVisibility(true);
                }}
              />
            )}
            {creditsVisibility && (
              <CreditsSelect
                setValue={(value) => {
                  setCreditsValue(value);

                  setFilter([
                    ...filters,
                    {
                      label: "credits",
                      value: {
                        type: value.value.type.value,
                        amount: value.value.amount,
                      },
                    },
                  ]);
                }}
                close={() => {
                  setVisibility(true);
                  setCreditsVisibility(false);
                }}
              />
            )}
          </div>
          <div>
            {visibility && (
              <TabButton
                selected={priceValue}
                clear={() => {
                  setPriceValue();

                  const values = filters.filter((item) => {
                    if (item.label !== "price") {
                      return item;
                    }
                  });

                  setFilter(values);


                }}
                name="Price"
                open={() => {
                  setVisibility(false);
                  setPriceVisibility(true);
                }}
              />
            )}
            {priceVisibility && (
              <PriceSelect
                setValue={(value) => {
                  setPriceValue(value);
                  setFilter([
                    ...filters,
                    {
                      label: "price",
                      min: value.value.min,
                      max: value.value.min,
                    },
                  ]);
                }}
                close={() => {
                  setVisibility(true);
                  setPriceVisibility(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="search-nav">
        <BackIcon className="icon-size" />
        <div className="flex-container">
          <div className="flex-item">
            <SearchBar />
          </div>
          <div className="flex-item">
            <button className="button button-secondary">Search</button>
          </div>
        </div>

        <div className="flex-container">
          {data.map((item) => {
            return (
              <div className="flex-item" key={item._id}>
                <ConfCard
                  title={item.title}
                  startDate={item.startDate}
                  startTime={item.startTime}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
