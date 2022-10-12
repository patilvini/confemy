import React from "react";
import ConfCard from "../conf-card/ConfCard";
import "./onlineConfs.styles.scss";
import { useState, useEffect } from "react";
import api from "../../utility/api";
import Carousel from "react-multi-carousel";
import { Navigate, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  smaller:{
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.

  },
  tablet: {
    breakpoint: { max: 1024, min: 761 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 761, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function OnlineConfs() {
  const [data, setData] = useState();
  const navigate = useNavigate()

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
        <div className="recently-viewed-confs">
        <Carousel
            // swipeable={true}
            // draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
          {data ? data.map((item, index)=> {
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
          }) : <div></div>}
          </Carousel>
        </div>
        <div className="see-all-button">
          <button onClick={()=>navigate("/search-conference")} className="button button-primary">See all</button>
        </div>
      </div>
    </section>
  );
}

export default OnlineConfs;
