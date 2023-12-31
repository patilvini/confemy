import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatInTimeZone } from 'date-fns-tz';
import enGB from 'date-fns/locale/en-GB';
import ReactDOM from 'react-dom';

import DateIcon from '../icons/DateIcon';
import CreditsIcon from '../icons/CreditsIcon';
import LocationIcon from '../icons/LocationIcon';
import ResendIcon from '../icons/ResendIcon';
import ReceiptIcon from '../icons/ReceiptIcon';
import ModalX from '../modal/ModalX';
import BookingDetails from './BookingDetails';

import { alertAction } from '../../redux/alert/alertAction';
import api from '../../utility/api';
import './userTickets.styles.scss';
import PrintTicket from './PrintTicket';

export default function UserTicket({ ticketData, setOpenModal }) {
  const [openModalX, setOpenModalX] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openPrint, setOpenPrint] = useState(false);

  const dispatch = useDispatch();

  const startDateObj = new Date(ticketData?.conference?.startDate);
  const formattedStartDate = formatInTimeZone(
    startDateObj,
    ticketData?.conference?.timezone,
    'MMM-dd-yyyy, HH:mm aa',
    { locale: enGB }
  );

  const getLocationString = () => {
    let locationStrig = 'Location';
    if (ticketData?.conference?.mode?.length > 0) {
      if (
        ticketData?.conference?.mode?.includes('venue') &&
        ticketData?.conference?.location
      ) {
        locationStrig = ticketData?.conference?.location;
      }

      if (ticketData?.conference?.mode?.includes('onlineConf')) {
        locationStrig = 'Online';
      }

      if (
        ticketData?.conference?.mode?.includes('venue') &&
        ticketData?.conference?.mode?.includes('onlineConf')
      ) {
        locationStrig = `${ticketData?.conference?.location} & Online`;
      }
    }
    return locationStrig;
  };

  const getBookingDetails = async (bookingId) => {
    try {
      let { data } = await api.get(`/conferences/bookings/${bookingId}`);
      setBookingDetails(data.data.bookingDetails);
      setIsLoading(false);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, 'danger'));
    }
  };

  const resendTicket = async (bookingId) => {
    try {
      const response = await api.get(`attendees/bookings/${bookingId}`);
      dispatch(alertAction(response.data.message, 'success'));
    } catch (err) {
      dispatch(alertAction(err.response.data.message, 'danger'));
    }
  };

  const printTicket = (url, id) => {
    localStorage.setItem('ticketData', JSON.stringify(id));
    window.open(url);
  };

  const printReceipt = (url, id) => {
    localStorage.setItem('receiptData', JSON.stringify(id));
    window.open(url);
  };

  return (
    <>
      <div className="user-ticket-card">
        <div
          onClick={() => {
            setOpenModalX(true);
            setIsLoading(true);
            getBookingDetails(ticketData?._id);
          }}
          className="p-16"
        >
          <h4>
            {ticketData?.conference?.title
              ? ticketData?.conference?.title
              : 'Ticket title'}
          </h4>
          <div className="pt-16">
            <div className="flex-vc  mb-12">
              <DateIcon className="icon-sm mr-12" />
              <span className="caption-2-regular-gray3">{`${formattedStartDate} GMT+4`}</span>
            </div>
            <div className="flex-vc  mb-12">
              <LocationIcon className="icon-sm mr-12" />
              <span className="caption-2-regular-gray3">
                {getLocationString()}
              </span>
            </div>
            <div className="flex-vc  mb-12">
              <CreditsIcon className="icon-sm mr-12" />
              <span className="caption-2-regular-gray3">
                {ticketData?.conference?.credits?.length > 0
                  ? `${ticketData?.conference?.credits[0]?.quantity} credits`
                  : 'Credits not added'}
              </span>
            </div>
          </div>
          <div className="flex-vc-sb mt-30">
            <div>
              <h5 className="caption-1-regular-gray2 mb-4">Items</h5>
              <p className="avenir-heavy-18">
                {ticketData?.tickets?.map((item) => {
                  return `${item.quantity} x ${item.ticket?.name}`;
                })}
              </p>
            </div>
            <div className="user-ticket-status">
              <h6 className="caption-1-regular-gray2 mb-4 mr-28">Status</h6>
              <p className="avenir-heavy-18 mr-20">
                {ticketData?.status === 1
                  ? 'Success'
                  : ticketData?.status === 2
                  ? 'Pending'
                  : 'Canceled'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid-col-3 " style={{ columnGap: '1px' }}>
          <div
            className="user-ticket-btn user-ticket-resend flex-vchc"
            onClick={() => resendTicket(ticketData._id)}
          >
            <ResendIcon className="icon-button" fill="#fff" />
            <p className="ml-4 avenir-roman-18 ">Resend Tickets</p>
          </div>
          <div className="user-ticket-btn   flex-vchc ">
            <ReceiptIcon className="icon-button" fill="#fff" />
            <p
              className="ml-4 avenir-roman-18 "
              onClick={() => printReceipt('/print-receipt', ticketData._id)}
            >
              Print Receipt
            </p>
          </div>
          <div
            className="user-ticket-btn user-ticket-print flex-vchc "
            onClick={() => printTicket('/print-ticket', ticketData._id)}
          >
            <ReceiptIcon className="icon-button" fill="#fff" />
            <p className="ml-4 avenir-roman-18 ">Print Ticket</p>
          </div>
        </div>
        {openModalX && isLoading && <div className="user-ticket-overlay"></div>}
        {openModalX && !isLoading && (
          <ModalX onDismiss={() => setOpenModalX(false)}>
            <BookingDetails bookingDetails={bookingDetails} />
          </ModalX>
        )}
      </div>
      {openPrint && <PrintTicket ticketData={ticketData} />}
    </>
  );
}
