import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utility/api";
import BookingCard from "./BookingCard";
import SpeakerCard from "../booking/SpeakerCard";

import LocationIcon from "../icons/LocationIcon";
import DocumentIcon from "../icons/DocumentIcon";
import Carousel from "react-multi-carousel";

import "./ConfDetails.scss";
import "./slider.scss";

export default function ConfDetails() {
  const [data, setData] = useState();
  const [action, setAction] = useState(false);
  const confID = useParams().confID;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // console.log(confID)

  const addRecentlyViewed = async () => {
    console.log(data);
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

      if (r.data.data.conferences.completedAllMandatorySteps) {
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
      <div className="conf-details-grid">
        <div className="conf-details-item">
          <img
            width="100%"
            src="https://wallpaperaccess.com/full/682838.jpg"
            alt="cover"
          />
          <div className="photo-card">
            <BookingCard data={data} reload={() => setAction(!action)} />
          </div>

          <h2>About this conference</h2>
          <p className="avenir-roman-18-gray3">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>
          <h3 className="venue-section-heading">Venue and Amenities</h3>
          <div className="venuecard">
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
                <img
                  width="100%"
                  src="https://wallpaperaccess.com/full/1406863.jpg"
                  alt="cover"
                />
              </div>
              <div>
                <img
                  width="100%"
                  src="https://wallpaperaccess.com/full/3137469.png"
                  alt="cover"
                />
              </div>
              <div>
                <img
                  width="100%"
                  src="https://wallpaperaccess.com/full/1406842.jpg"
                  alt="cover"
                />
              </div>
              <div>
                <img
                  width="100%"
                  src="https://wallpaperaccess.com/full/3443862.jpg"
                  alt="cover"
                />
              </div>
            </Carousel>

            <h4>Holiday Inn Norwich City</h4>

            <div className="icon-text">
              <LocationIcon fill="#c4c4c4" className="filter-icon" />
              <span>Norwich</span>
            </div>

            <div className="amenities-section">
              <div className="file">
                <DocumentIcon /> <span>Pool</span>
              </div>
              <div className="file">
                <DocumentIcon /> <span>Parking</span>
              </div>
              <div className="file">
                <DocumentIcon /> <span>Cafe</span>
              </div>
              <div className="file">
                <DocumentIcon /> <span>Laundry</span>
              </div>
              <div className="file">
                <DocumentIcon /> <span>Lounge</span>
              </div>
            </div>
          </div>

          <h3 className="course-outline-heading">Course Outline</h3>
          <p className="avenir-roman-18-gray3">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>

          <div className="added-docs">
            <div className="file">
              <DocumentIcon fill="#c4c4c4" className="icon-size" />
              <span>Document.docx</span>
            </div>
            <div className="file">
              <DocumentIcon fill="#c4c4c4" className="icon-size" />
              <span>Document2.docx</span>
            </div>
          </div>

          <h3>Conference Schedule</h3>

          <p className="avenir-roman-18-gray3">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>

          <h3 className="mt-92">Conference Speakers</h3>

          <div className="conference-details-speakers">
            <SpeakerCard name={"Pranit Deshpande"} degree={"MD MBBS"} />
            <SpeakerCard name={"Pranit Deshpande"} degree={"MD MBBS"} />
            <SpeakerCard name={"Pranit Deshpande"} degree={"MD MBBS"} />
            <SpeakerCard name={"Pranit Deshpande"} degree={"MD MBBS"} />
          </div>

          <h3 className="mt-92">Refund Policy</h3>
          <p className="avenir-roman-18-gray3 mb-88">
            Established in 1962, the MIT Press is one of the largest and most
            distinguished university presses in the world and a leading
            publisher of books and journals at the intersection of science,
            technology, art, social science, and design. MIT Press books and
            journals are known for their intellectual daring, scholarly
            standards, interdisciplinary focus, and distinctive design.
          </p>
        </div>
        <div className="side-card">
          <BookingCard data={data} reload={() => setAction(!action)} />
        </div>
      </div>
    </div>
  );
}
