import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../utility/api";
import "./step1.scss";

export default function BookingStep1() {
  const [data, setData] = useState();
  const confID = useParams().confID;

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get("/conferences/" + confID);
        console.log(r.data.data.conferences);
        setData(r.data.data.conferences);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const date1 = DateTime.fromISO(data?.startDate);
  let startDate = date1.toFormat("LLL dd");

  const date2 = DateTime.fromISO(data?.endDate);
  let endDate = date2.toFormat("LLL dd");

  return (
    <div className="step1-page">
      <div className="step1-heading">
        <h3>{data?.title}</h3>
        <p className="conference-card-text caption-2-regular-gray3">
          {data?.mode.map((item, index) => {
            return (
              <span style={{ marginRight: "1rem" }} key={index}>
                {item}
              </span>
            );
          })}{" "}
          {startDate} {data?.startTime} - {endDate} {data?.endTime}{" "}
        </p>
      </div>

      <div style={{marginTop:"10rem"}}>
        {data?.tickets.map((item, index) => {
          return (
            <div  className="step1-tickets-grid" key={index}>
              <div className="step1-grid-item">
                <h3>{item.name}</h3>
                <h4>{item.type}</h4>
                {/* {item.info && <p>{item.info}</p>} */}
                <p>Optional donation to support the National Independent Venue
                Association, a non-profit organization whose mission is to
                preserve and nurture the ecosystem of independent venues and
                promoters throughout the United States.</p>
              </div>
              <div style={{display:"flex"}} className="step1-grid-item">
                <div style={{marginLeft:"1rem"}}><h4>{item.currency} {item.price} x </h4></div>
                <div style={{marginLeft:"1rem"}}><Select options={options}/> </div>
              </div>
            </div>
          );
        })}
        <hr className="tickets-page-divider"/>

        <div style={{margin: '1rem 30.4rem 10rem 30.4rem '}} className="step1-tickets-grid">
          <div className="step1-grid-item">

          </div>
          <div className="step1-grid-item">
            <button className="button button-green">Buy</button>

          </div>
        </div>
      </div>
    </div>
  );
}
