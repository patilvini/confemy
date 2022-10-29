import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import api from "../../utility/api";
import BookingCard from "../booking/BookingCard";
import SpeakerCard from "../booking/SpeakerCard";
import CreditsIcon from "../icons/CreditsIcon";
import DateIcon from "../icons/DateIcon";
import LikeBlueIcon from "../icons/LikeBlueIcon";
import LocationIcon from "../icons/LocationIcon";
import PriceIcon from "../icons/PriceIcon";
import ShareIcon from "../icons/ShareIcon";
import RadioFilled from "../icons/RadioFilled";
import RadioIcon from "../icons/RadioIcon";
import Modal from "../modal/Modal";
import "./preview.scss";
import { useSelector } from "react-redux";

export default function Preview() {
  const [data, setData] = useState();
  const [visibility, setVisibitly] = useState(false);

  const [select, setSelect] = useState("now");
  const conferenceId = useSelector(
    (state) => state.conference.newConference._id
  );

  const getData = async () => {
    try {
      const r = await api.get("/conferences/"+conferenceId);
      console.log(r.data.data.conferences);
      setData(r.data.data.conferences);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function onClose() {
    setVisibitly(false);
  }
  function onOpen() {
    setVisibitly(true);
  }


  const date1 = DateTime.fromISO(data?.startDate);
  console.log(date1)
  let startDate = date1.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const date2 = DateTime.fromISO(data?.endDate);
  let endDate = date2.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const startTime = DateTime.fromISO(data?.startTime)
  const endTime = DateTime.fromISO(data?.endTime)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300},
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    
  };
  


  return (
    <div className="conf-form-wrap">
      <h2>Pubish Your Conference</h2>
      <div style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)"}} className="preview-card">
        <div>
          <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbmZlcmVuY2V8ZW58MHx8MHx8&w=1000&q=80" />
        </div>
        <div className="preview-details">
          <h3 style={{ fontSize: "2rem" }}>{data?.title}</h3>
          <div className="ticket-details-grid">
            <DateIcon className="preview-icon" />
            <p className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {startDate}, 
              {startTime.toFormat('h:mm a')} {data?.timezone}
            </p>
            <LocationIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {data?.mode?.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item}
                  </span>
                );
              })}
            </div>

            <CreditsIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">
              {data?.credits?.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {item.creditType} {item.quantity}
                  </span>
                );
              })}
            </div>


            <PriceIcon className="preview-icon" />
            <div className="preview-grid-item ticket-details-text caption-2-regular-gray3">@{data?.basePrice} {data?.currency} onwards</div>
          </div>

          <button
            style={{ margin: ".4rem 0 0rem 0", width: "95%" }}
            className="button button-primary"
            onClick={() => onOpen()}
          >
            Preview
          </button>
        </div>
      </div>

      <h3> When should we publish your event?</h3>

     
        <div style={{ marginTop: "2rem",width: "20rem" }} className="preview-select-grid">
          <div className="preview-grid-item">
            
            <div onClick={()=>setSelect("now")}>
              {select === "now" && <RadioFilled/>}
              {select === "later" && <RadioIcon/>}
            
            </div>
           
         
            
           
          </div>
          <div className="preview-grid-item" onClick={()=>setSelect("now")}>
            <p className="caption-2-regular-gray3">Publish Now</p>
          </div>
          <div className="preview-grid-item">
          <div onClick={()=>setSelect("later")}>
              {select === "later" && <RadioFilled/>}
              {select === "now" && <RadioIcon/>}
            
            </div>
          </div>
          <div className="preview-grid-item" onClick={()=>setSelect("later")}>
            <p className="caption-2-regular-gray3">Schedule for later</p>
          </div>
        </div>

        {select === "later" && 
        <div>
          <h1>Date and Time</h1>

      
        </div> }
      

      {visibility &&  <Modal onDismiss={onClose}>
      <div className="preview-wrapper">
      <div style={{textAlign:"center", paddingTop:"2rem"}}><h1>Preview</h1>
     </div>
      
      <div className="preview-modal-grid">
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
                {data?.venue?.ameneties?.map((item, index) => {
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
            {data?.schedules?.map((item, index) => {
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
              {data?.speakers?.map((item) => {
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
        <div className="conference-card">
        <h4 className="conference-card-heading">{data?.title}</h4>
        <div style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
          <p className="conference-card-text caption-2-regular-gray3">
            by Harward School of Medicine{" "}
          </p>
          <button
            style={{
              marginTop: ".5rem",
              padding: ".2rem 1rem",
              color: "#08415c",
              border: "2px solid #08415c",
              backgroundColor: "white",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Follow
          </button>
        </div>

        <div className="conference-card-grid">
          <div className="conference-card-grid-item">
            <DateIcon className="conf-card-icons" />
          </div>

          <div className="conference-card-grid-item">
            <p className="conference-card-text caption-2-regular-gray3">
              {startDate}, {startTime.toFormat('h:mm a')} - {endDate} {endTime.toFormat('h:mm a')}
            </p>
          </div>
          <div className="conference-card-grid-item">
            <LocationIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <div className="conference-card-text caption-2-regular-gray3">
              {data?.mode?.map((item) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={item}>
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="conference-card-grid-item">
            <CreditsIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <div className="conference-card-text caption-2-regular-gray3">
              {data?.credits?.map((item, index) => {
                return (
                  <span style={{ marginRight: "1rem" }} key={index}>
                    {" "}
                    {item.creditType} {item.quantity}{" "}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="conference-card-grid-item">
            <PriceIcon className="conf-card-icons" />
          </div>
          <div className="conference-card-grid-item">
            <p
              style={{ fontWeight: "bold" }}
              className="conference-card-text caption-2-regular-gray3"
            >
              {data?.currency} {data?.basePrice} onwards
            </p>
          </div>
          <div
            style={{ marginTop: "18rem", display: "flex" }}
            className="conference-card-grid-item"
          >
            <div>
              <ShareIcon className="conf-card-icons" />
            </div>
            <div>
              

               <button className="conference-card-buttons" >
                  <LikeBlueIcon className="conf-card-icons" />
                </button>


            </div>
          </div>
          <div className="conference-card-grid-item">
            <button
             
              style={{
                fontSize: "1.2rem",
                marginTop: "16.5rem",
                marginLeft: "4rem",
                marginBottom: "1rem",
                padding: "1rem",
                width: "80%",
              }}
              className="button button-green"
            >
              Book
            </button>
          </div>
        </div>
      </div>

        </div>
      </div>
      <div style={{textAlign:"center", marginBottom:"5rem", paddingBottom:"5rem"}}><button className="button button-green" onClick={()=>onClose()}>Close</button>
     </div>
      
    </div>
    

        </Modal>}
    </div>
  );
}
