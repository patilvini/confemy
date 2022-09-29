import React from "react";
import ConfCard from "../conf-card/ConfCard";
import "./onlineConfs.styles.scss";
import { useState, useEffect } from "react";
import api from "../../utility/api";

function OnlineConfs() {
  const [data, setData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const r = await api.get("/conferences?mode=onlineConf");
        // setData(r.data.data.conferences);

        const d = r.data.data.conferences

        d.length = 8

        setData(d)


        
      } catch (err) {
        console.log(err);
      }
    }

    loadData()
  }, []);

  return (
    <section className="bg-background conf-display">
      <div>
        <h2>Online Conferences</h2>
        <div className="grid-col-4 conf-display-grid">
          {data?.map((item, index)=> {
            return (
              <div key={index}>
                 <ConfCard
                  link={item._id}
                  confName={item.title}
                  startDate={item.startDate}
                  currency={item.currency}
                  location={item.location}
                  price={item.basePrice}
                  startTime={item.startTime}
                  credits={item.credits}
                />
              </div>
            )
          })}
        </div>
        <div className="see-all-button">
          <button className="button button-primary">See all</button>
        </div>
      </div>
    </section>
  );
}

export default OnlineConfs;
