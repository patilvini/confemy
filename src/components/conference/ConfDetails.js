import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import { convertToHTML } from "draft-convert";

import api from "../../utility/api";
import BookingCard from "./BookingCard";
import SpeakerCard from "../booking/SpeakerCard";

import LocationIcon from "../icons/LocationIcon";
import DocumentIcon from "../icons/DocumentIcon";
import Carousel from "react-multi-carousel";

import "./ConfDetails.scss";
import "./slider.scss";

export default function ConfDetails() {
  const [selectedConference, setSelectedConference] = useState(null);
  const [action, setAction] = useState(false);
  const confId = useParams().confId;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 300 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const addRecentlyViewed = (Id) => {
    const data = {
      recentlyViewedConferenceDetails: {
        conferenceId: Id,
      },
    };
    try {
      api.post("homePage/recentlyviewed", data);
    } catch (err) {}
  };

  const loadConferenceDetails = async (Id) => {
    try {
      const response = await api.get(`common/conferences/${Id}`);
      console.log("conf Details:", response.data.data.conferences);
      setSelectedConference(response.data.data.conferences);
      // if (response.data.data.conferences.completedAllMandatorySteps) {
      //   addRecentlyViewed(Id);
      // }
    } catch (err) {
      console.error(err);
    }
  };

  // markup setup

  let blocks;
  let myHtml;
  if (
    selectedConference?.description &&
    Object.keys(selectedConference?.description).length > 0
  ) {
    blocks = convertFromRaw(selectedConference?.description);
    const myHtml = convertToHTML(blocks);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    loadConferenceDetails(confId);
    addRecentlyViewed(confId);
  }, [confId]);

  return (
    <div className="cd-container">
      <div className="cd-grid">
        <div className="cd-1st-col">
          <div className="cd-banner-container mb-40">
            {selectedConference?.banner?.length > 0 ? (
              <img
                className="cd-banner"
                src={selectedConference.banner?.[0].Location}
                alt="banner"
              />
            ) : (
              <div className="cd-no-banner">
                <div className="text-align-center">
                  <h4>Banner coming</h4>
                </div>
              </div>
            )}
          </div>
          <div className="cd-1stcol-cardwrap">
            <BookingCard
              data={selectedConference}
              reload={() => setAction(!action)}
            />
          </div>
          {selectedConference?.description &&
            Object.keys(selectedConference?.description).length > 0 && (
              <div className="mb-60">
                <h2 className="mb-16">Description</h2>
                <div
                  className="editor-text"
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(selectedConference?.description)
                  )}
                ></div>
              </div>
            )}
          {selectedConference?.mode.includes("venue") && (
            <div className="mb-60">
              <h2 className="mb-32">Venue and Amenities</h2>
              <div className="cd-venuecard">
                {selectedConference?.venueImages?.length > 0 && (
                  <div className="cd-carousel-wrap">
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
                      {selectedConference?.venueImages?.map((image) => (
                        <div key={image._id}>
                          <img width="100%" src={image.Location} alt="cover" />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                )}
                <div className="cd-venuecard-content">
                  <h4>{selectedConference?.venueName}</h4>
                  <div className="flex mt-16">
                    <LocationIcon fill="#c4c4c4" className="icon-xs mr-8" />
                    <div>
                      <div className="caption-1-regular-cblack">
                        {selectedConference?.street1}
                      </div>
                      <div className="caption-1-regular-cblack">
                        {selectedConference?.street2}
                      </div>
                      <div className="caption-1-regular-cblack">
                        <span>{selectedConference?.city}, </span>
                        <span className="caption-1-regular-cblack">
                          {selectedConference?.state}
                        </span>
                      </div>

                      <div className="caption-1-regular-cblack">
                        <span> {selectedConference?.country} </span>
                        <span className="caption-1-regular-cblack">
                          {selectedConference?.zipcode}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cd-amenities pt-16">
                    {selectedConference?.amenities?.map((amenity) => (
                      <div className="flex-vc " key={amenity._id}>
                        <img
                          className="icon-sm mr-8"
                          alt="preview"
                          src={amenity?.icon?.location}
                        />
                        <span className="caption-1-regular-cblack">
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedConference?.courseOutline &&
            Object.keys(selectedConference?.courseOutline).length > 0 && (
              <div className="mb-60">
                <h2 className="mb-16">Conference Outline</h2>
                <div
                  className="editor-text"
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(selectedConference?.courseOutline)
                  )}
                ></div>
              </div>
            )}

          {selectedConference?.schedules &&
            Object.keys(selectedConference?.schedules).length > 0 && (
              <div className="mb-60">
                <h2 className="mb-16">Conference Schedule</h2>
                <div
                  className="editor-text"
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(selectedConference?.schedules)
                  )}
                ></div>
              </div>
            )}
          <h2 className="mb-16">Conference Speakers</h2>
          <div className="cd-speakers-grid mb-60">
            {selectedConference?.speakers?.map((speaker) => (
              <div key={speaker._id}>
                <SpeakerCard
                  name={`${speaker.speaker.firstName} ${speaker.speaker.lastName}`}
                  degree={speaker.speaker.degree}
                />
              </div>
            ))}
          </div>
          {selectedConference?.refundPolicy &&
            Object.keys(selectedConference?.refundDescription).length > 0 && (
              <div className="mb-60">
                <h2 className="mt-92">Refund</h2>
                <div
                  className="editor-text mt-16"
                  dangerouslySetInnerHTML={createMarkup(
                    draftToHtml(selectedConference?.refundDescription)
                  )}
                ></div>
              </div>
            )}
        </div>
        <div className="cd-2nd-col">
          <BookingCard
            title={selectedConference?.title}
            organizer={selectedConference?.host}
            reload={() => setAction(!action)}
            startDate={selectedConference?.startDate}
            endDate={selectedConference?.endDate}
            timezone={selectedConference?.timezone}
            mode={selectedConference?.mode}
            city={selectedConference?.city}
            credits={selectedConference?.credits}
            currency={selectedConference?.currency}
            basePrice={selectedConference?.basePrice}
            confId={selectedConference?._id}
            bookingTickets={selectedConference?.bookingTickets}
            isLiked={selectedConference?.isLiked}
            setSelectedConference={setSelectedConference}
          />
        </div>
      </div>
    </div>
  );
}
