import { useEffect, useState } from "react";
import api from "../../utility/api";
import ConfCard from "../conf-card/ConfCard";
import Accordion from "./Accordion";
import "./searchComponent.scss";

export default function SearchComponent() {
  const [data, setData] = useState([]);

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
        <h1>Filters</h1>

        <ul>
            <li><Accordion name={<h3>Topic</h3>} /></li>
            <li><Accordion name={<h3>Date</h3>} /></li>
            <li><Accordion name={<h3>Location</h3>} /></li>
            <li><Accordion name={<h3>Credits</h3>} /></li>
            <li><Accordion name={<h3>Price</h3>} /></li>
        </ul>


      </div>

      <div className="search-nav">
        <div className="flex-container">
          <div className="flex-item">
            <input
              placeholder="Search"
              label="Search"
              className="material-textfield"
            />
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
