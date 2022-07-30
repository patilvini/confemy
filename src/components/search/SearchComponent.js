import { useEffect, useState } from "react";
import api from "../../utility/api";
import ConfCard from "../conf-card/ConfCard";
import Select from "react-select";

import "./searchComponent.scss";
import "../../utility/utility.styles.scss";
import DropdownIcon from "../icons/DropdownIcon";

import NextIcon from "../icons/NextIcon";
import DateSelect from "./DateSelect";
import TabButton from "./TabButton";
import LocationSelect from "./LocationSelect";
import ProfessionSelect from './ProfessionSelect'
import CreditsSelect from "./CreditsSelect";
import PriceSelect from "./PriceSelect";
import CreditsTabButton from "./CreditsTabButton";
import BackIcon from "../icons/BackIcon";

export default function SearchComponent() {
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(true)
  const [dateVisibility, setDateVisibility] = useState(false)
  const [locationVisibility, setLocationVisibility] = useState(false)
  const [professionVisibility, setProfessionVisibility] = useState(false)
  const [specialityVisibility, setSpecialityVisibility] = useState(false)
  const [creditsVisibility, setCreditsVisibility] = useState(false)
  const [priceVisibility, setPriceVisibility] = useState(false)

  const [dateValue, setDateValue] = useState({})
  const [locationValue, setLocationValue] = useState({})
  const [professionValue, setProfessionValue] = useState({})
  const [specialityValue, setSpecialityValue] = useState({})
  const [creditsValue, setCreditsValue] = useState({})
  const [priceValue, setPriceValue] = useState({})

  useEffect(() => {
    const loadData = async () => {
      try {
        const r = await api.post(
          "/conferences/search?page=1&limit=10&text=css"
        );
        console.log(r);
        setData(r.data.data.conferences);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);



  return (
    <>
   
      <div className="sidenav">

      {visibility && <div className="title-grid">
          <div className="title-grid-item">
            <h2 className="title">Filters</h2>
          </div>
          <div className="title-grid-item">
            <button
              onClick={() => {
                setDateValue({});
                setLocationValue({});
                setProfessionValue({});
                setSpecialityValue({});
                setCreditsValue({});
                setPriceValue({});
              }}
              className="clear-all-button"
            >
              Clear all
            </button>
          </div>
        </div>}
        

        <ul>
          <li>
            {visibility && <TabButton selected={dateValue} name="Date" open={
              ()=>{
                setVisibility(false)
                setDateVisibility(true)

              }}/>}
            {dateVisibility && <DateSelect setValue={(value)=>setDateValue(value)} close={()=>{
              setVisibility(true)
              setDateVisibility(false)
              }}/> }
            
         
          </li>
          <li>
          {visibility && <TabButton name="Location" open={
            ()=>{
              setVisibility(false)
              setLocationVisibility(true)

            }}/>}
          {locationVisibility && <LocationSelect close={()=>{
            setVisibility(true)
            setLocationVisibility(false)
            }}/> }
          </li>
          
          <li>
          {visibility && <TabButton selected={professionValue} name="Profession" open={
            ()=>{
              setVisibility(false)
              setProfessionVisibility(true)

            }}/>}
            {professionVisibility && <ProfessionSelect  setValue={(value)=>{setProfessionValue(value)}} close={()=>{
              setVisibility(true)
              setProfessionVisibility(false)
              }}/> }
         
          </li>
          <li>
          {visibility && <TabButton selected={specialityValue} name="Speciality" open={
            ()=>{
              setVisibility(false)
              setSpecialityVisibility(true)

            }}/>}
            {specialityVisibility && <ProfessionSelect setValue={(value)=>{setSpecialityValue(value)}} close={()=>{
              setVisibility(true)
              setSpecialityVisibility(false)
              }}/> }
         
          </li>
          <li>
          {visibility && <CreditsTabButton selected={creditsValue} name="Credits" open={
            ()=>{
              setVisibility(false)
              setCreditsVisibility(true)

            }}/>}
            {creditsVisibility && <CreditsSelect setValue={(value)=>setCreditsValue(value)} close={()=>{
              setVisibility(true)
              setCreditsVisibility(false)
              }}/> }
          </li>
          <li>
          {visibility && <TabButton name="Price" open={
            ()=>{
              setVisibility(false)
              setPriceVisibility(true)

            }}/>}
            {priceVisibility && <PriceSelect close={()=>{
              setVisibility(true)
              setPriceVisibility(false)
              }}/> }
         
          </li>
        </ul>

        
      </div>

      <div className="search-nav">
      <BackIcon className="icon-size" />
        <div className="flex-container">
          <div className="flex-item">
            <input
              placeholder="Search"
              label="Search"
              className="material-textfield"
            />
          </div>
          <div className="flex-item">
            <button
              style={{ marginBottom: "1000px" }}
              className="button button-secondary"
            >
              Search
            </button>
          </div>
        </div>

        {/* <div className="flex-container">
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
        </div> */}
      </div>
    </>
  );
}
