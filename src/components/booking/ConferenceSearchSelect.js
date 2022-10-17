import "./confSelect.scss";
import "./slider.scss";
import { useParams } from "react-router-dom";
import api from "../../utility/api";
import BookingCard from "./BookingCard";
import SpeakerCard from "./SpeakerCard";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Slider from "react-slick";
import LocationIcon from "../icons/LocationIcon";
import Carousel from "react-multi-carousel";

export default function ConferenceSearchSelect() {
  const [data, setData] = useState();
  const [action, setAction] = useState(false)
  const confID = useParams().confID;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    
  };
  // console.log(confID)

  

  const addRecentlyViewed = async () => {

    console.log(data)
    // try {
    //   const r = await api.post("/homePage/recentlyviewed", {
    //     recentlyViewedConferenceDetails: {
    //       conferenceId: confID,
    //     },


    //   });
    //   console.log(r.data.data);
      
    // } catch (err) {
    //   // console.error(err);
    // }
  };

  const getData = async () => {
    try {
      const r = await api.get("/conferences/" + confID);
      console.log(r.data.data.conferences);
      setData(r.data.data.conferences);

      if(r.data.data.conferences.completedAllMandatorySteps){
        addRecentlyViewed();

      }

      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();

  
  }, [action]);

  return (
    <div className="conference-component">
      <div></div>
      <div className="conference-gird-container">
        <div className="conference-grid-item">
          <img
            width="100%"
            src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_486734270_86526.jpg"
            alt="cover"
          />

          <h2 className="section-heading1">About this conference</h2>
          <p className="conference-card-text caption-2-regular-gray3">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>
          <h3 className="section-heading">Venue and Amenities</h3>
          <div className="venueCard ">
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
             <div>
                  <img width="100%" src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_486734270_86526.jpg" />
                </div>
                <div>
                  <img width="100%" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZmVyZW5jZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                </div>
                <div>
                  <img width="100%" src="https://media.istockphoto.com/photos/audience-listens-to-the-lecturer-at-the-conference-picture-id974238866?k=20&m=974238866&s=612x612&w=0&h=DUBZOmGYNntkcIlfY8xFJYcVYFzO5HxnL9YaoqbV3xc=" />
                </div>
                <div>
                  <img width="100%" src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8&w=1000&q=80" />
                </div>
          </Carousel>
            <div></div>
            <div style={{ paddingLeft: "2rem" }}>
              <h3 className="section-heading">{data?.venue?.venueName}</h3>

              <h4 className="venue-card-text">
                {" "}
                <LocationIcon fill="#c4c4c4" className="filter-icon" />{" "}
                {data?.venue?.city}
              </h4>
              <div className="venue-card-flex">
                {data?.venue?.ameneties.map((item, index) => {
                  return (
                    <div className="venue-flex-item" key={index}>
                      <h4 className="venue-card-text">
                        {item.icon}
                        {item.name}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <h3 className="section-heading">Course Outline</h3>
          <p className="conference-card-text caption-2-regular-gray3">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>

          <h3 className="section-heading">Course Schedule</h3>
          <div>
            {data?.schedules.map((item, index) => {
              const date = DateTime.fromISO(item.date);
              let scheduleDate = date.toLocaleString({
                ...DateTime.DATE_MED_WITH_WEEKDAY,
                weekday: "short",
              });

              return (
                <div key={index}>
                  <h4 className="conference-schedule-day">
                    Day {index + 1} {scheduleDate} {item.startTime} -{" "}
                    {item.endTime}
                  </h4>
                  <p className="conference-card-text caption-2-regular-gray3">
                    {item.description}
                  </p>
                </div>
              );
            })}

            <h2 className="section-heading">Conference Speakers</h2>
            <div className="speaker-grid">
              {data?.speakers.map((item) => {
                return (
                  <div key={item._id}>
                    <SpeakerCard
                      firstName={item.speaker.firstName}
                      lastName={item.speaker.lastName}
                      designation={item.speaker.designation}
                    />
                  </div>
                );
              })}
            </div>

            <h2 className="section-heading">Refund Policy</h2>
            <div>
              {data?.refundPolicy && (
                <p className="conference-card-text caption-2-regular-gray3">
                  If you are entitled to a replacement or refund, we will
                  replace the product or refund the purchase price, using the
                  original method of payment.
                </p>
              )}
              {data?.refundPolicy === false && (
                <h4 className="conference-schedule-day">Non-refundable</h4>
              )}
            </div>
          </div>
        </div>
        <div className="conference-grid-item">
          <BookingCard data={data} reload={()=>setAction(!action)}/>
        </div>
      </div>
    </div>
  );
}
