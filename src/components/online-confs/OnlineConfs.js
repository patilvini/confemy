import React from "react";
import ConfCard from "../conf-card/ConfCard";
import "./onlineConfs.styles.scss";
import { useState, useEffect } from "react";
import api from "../../utility/api";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1440 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  smaller: {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get("/conferences?mode=onlineConf");
        setData(response.data.data.conferences);
      } catch (err) {
        console.log("error", err);
      }
    };

    loadData();
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
            {data?.length > 0 ? (
              data.map((item) => {
                return (
                  <div key={item._id}>
                    <ConfCard
                      link={item._id}
                      confName={item.title}
                      startDate={item.startDate}
                      endDate={item.endDate}
                      currency={item.currency}
                      location={item.location}
                      basePrice={item.basePrice}
                      startTime={item.startTime}
                      credits={item.credits}
                      timezone={item.timezone}
                      mode={item.mode}
                      title={item.title}
                      confId={item._id}
                    />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </Carousel>
        </div>
        <div className="see-all-button">
          <button
            onClick={() => navigate("/search-conference")}
            className="button button-primary"
          >
            See all
          </button>
        </div>
      </div>
    </section>
  );
}

export default OnlineConfs;
