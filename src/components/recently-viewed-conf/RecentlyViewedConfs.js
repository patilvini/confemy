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

function RecentlyViewedConfs() {
  const [data, setData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const r = await api.get("/homePage/recentlyviewed?page=1&limit=5");
        setData(r.data.data.viewedConferences);
      } catch (err) {}
    };

    loadData();
  }, []);

  console.log("recently viewed confs", data);

  return (
    <section className="bg-background conf-display recently-viewed-confs">
      <div>
        <h2>Recently Viewed</h2>
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
            {data ? (
              data.map((item, index) => {
                console.log(item.conference);
                return (
                  <div key={index}>
                    <ConfCard
                      mode={item.conference.mode}
                      city
                      src
                      title={item.conference.title}
                      // startDate={item.conference.startDate}
                      // endDate
                      // timezone
                      credits={item.conference.credits}
                      currency={item.conference.currency}
                      basePrice={item.conference.basePrice}
                      confId={item.conference._id}
                      // location={item.conference.location}
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

export default RecentlyViewedConfs;
