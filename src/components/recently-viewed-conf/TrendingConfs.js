import React, { useEffect, useState } from "react";
import api from "../../utility/api";
import ConfCard from "../conf-card/ConfCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./recentlyViewedConfs.styles.scss";

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

function TrendingConfs() {
  const [data, setData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const r = await api.get("/homePage/trendings");
        const d = r.data.data.trendingConferences;
        d.length = 10;

        setData(d);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  return (
    <section className="bg-background conf-display recently-viewed-confs">
      <div>
        <h2>Trending Conferences</h2>
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
              data?.map((item) => {
                console.log("ddddddddd", item);
                return (
                  <div key={item._id}>
                    <ConfCard
                      confId={item.conference._id}
                      startDate={item.conference.startDate}
                      endDate={item.conference.endDate}
                      currency={item.conference.currency}
                      city={item.conference.city}
                      basePrice={item.conference.basePrice}
                      startTime={item.conference.startTime}
                      credits={item.conference.conferenceCredit}
                      mode={item.conference.mode}
                      timezone={item.conference.timezone}
                      title={item.conference.title}
                    />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default TrendingConfs;
