import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import DateIcon from "../icons/DateIcon";
import CreditsIcon from "../icons/CreditsIcon";
import LocationIcon from "../icons/LocationIcon";
import ResendIcon from "../icons/ResendIcon";
import ReceiptIcon from "../icons/ReceiptIcon";

export default function UserTicket({ data }) {
  const startDateObj = new Date(data?.conference?.startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    data?.conference?.timezone,
    "MMM-dd-yyyy, HH:mm aa",
    { locale: enGB }
  );

  const getLocationString = () => {
    let locationStrig = "Location";
    if (data?.conference?.mode?.length > 0) {
      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.location
      ) {
        locationStrig = data?.conference?.location;
      }

      if (data?.conference?.mode?.includes("onlineConf")) {
        locationStrig = "Online";
      }

      if (
        data?.conference?.mode?.includes("venue") &&
        data?.conference?.mode?.includes("onlineConf")
      ) {
        locationStrig = `${data?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  return (
    <div className="user-ticket-card">
      <div className="pt-20 pl-25 mb-11">
        <h4>
          {data.conference?.title ? data.conference?.title : "Ticket title"}
        </h4>
        <div className="pt-16">
          <div className="flex-vc  mb-12">
            <DateIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">{`${formattedStartDate} GMT+4`}</span>
          </div>
          <div className="flex-vc  mb-12">
            <LocationIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {" "}
              {getLocationString()}
            </span>
          </div>
          <div className="flex-vc  mb-12">
            <CreditsIcon className="icon-sm mr-12" />
            <span className="caption-2-regular-gray3">
              {data?.conference?.credits?.length > 0
                ? `${data?.conference?.credits[0]?.quantity} credits`
                : "Credits not added"}
            </span>
          </div>
        </div>
        <div className="flex-vc-sb mt-30">
          <div>
            <h5 className="caption-1-regular-gray2 mb-4">Items</h5>
            <h4 className="body-bold">
              {data?.tickets?.map((item) => {
                return `${item.quantity} x ${item.ticket?.name}`;
              })}
            </h4>
          </div>
          <div className="user-ticket-status">
            <h6 className="caption-1-regular-gray2 mb-4 mr-28">Status</h6>
            <h4 className="body-bold mr-20">
              {data?.status === 1
                ? "Success"
                : data?.status === 2
                ? "Pending"
                : "Canceled"}
            </h4>
          </div>
        </div>
      </div>

      <div className="flex-vc-sb">
        <div className="user-ticket-resend flex-vchc">
          <ResendIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Resend Tickets</p>
        </div>
        <div className="user-ticket-print flex-vchc ">
          <ReceiptIcon className="icon-button" fill="#fff" />
          <p className="ml-4 avenir-roman-18 ">Print Receipt</p>
        </div>
      </div>
    </div>
  );
}
