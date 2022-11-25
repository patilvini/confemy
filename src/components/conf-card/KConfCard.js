export default function KConfCard() {
  return (
    <div className="preview-imgcard-wrap mb-44">
      <div className="preview-img-wrap">
        {newConference?.banner?.length > 0 ? (
          <img
            className="preview-img"
            alt="preview"
            src={newConference?.banner[0]?.Location}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: 40,
              backgroundColor: "#ecf0f2",
            }}
          >
            <div className="text-align-center">
              <h4>Add Banner to improve visibility through Details 2 step</h4>
            </div>
          </div>
        )}
      </div>
      <div className="preview-card">
        <div style={{ flex: 1 }}>
          <div className="confcard-header mb-8">
            <p>
              {newConference?.title ? newConference?.title : "Conference title"}
            </p>
          </div>
          <div className="confcard-body">
            <div className="flex-vc  mb-12">
              <DateIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {formattedStartDate ? formattedStartDate : "Date"}
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <LocationIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {getLocationString()}
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <CreditsIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {newConference?.credits?.length > 0
                  ? `${newConference?.credits[0].creditId.name} - ${newConference?.credits[0].quantity}`
                  : "Credits not added"}
              </span>
            </div>
            <div className="flex-vc ">
              <PriceIcon className="icon-xxs mr-12" />
              <span className="caption-2-regular-gray3">
                {newConference?.currency && newConference?.basePrice > 0
                  ? `${newConference?.currency} -  
                    ${newConference?.basePrice}`
                  : newConference?.currency && newConference?.basePrice === 0
                  ? "Free conference"
                  : "Price"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button onClick={openModal} className="button button-primary mt-24">
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
