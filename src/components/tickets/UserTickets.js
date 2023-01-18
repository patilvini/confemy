import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";

import api from "../../utility/api";
import UserTicket from "./UserTicket";
import TicketModal from "./TicketModal";
import Loader from "../loader/Loader";
import NoPasses from "../SVG-assets/NoPasses";

import "./ticketForm.styles.scss";
import SearchIcon from "../icons/SearchIcon";

export default function UserTickets() {
  const [formData, setFormData] = useState({
    searchText: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const { searchText } = formData;

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onDismiss = () => navigate("/user-profile");

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await api.get(
        `/conferences/bookings/passes/users/${user?._id}`
      );
      setData(data?.data?.bookingDetails);
      setFiltered(data?.data?.bookingDetails);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    if (data) {
      const dataSet = data.filter((item) => {
        if (
          item.conference.title
            .toLowerCase()
            .indexOf(searchText.toLocaleLowerCase()) >= 0
        ) {
          return item;
        }
      });
      setFiltered(dataSet);
    }
  }, [searchText]);

  const noTickets = (
    <div style={{ textAlign: "center" }}>
      <NoPasses className="icon-plshld" />
      <div className="passes-list">
        <h2>You haven't booked any conference</h2>
        <button
          style={{ margin: "2rem 0 6rem 0" }}
          className="button button-primary"
        >
          Explore Trending Conferences
        </button>
      </div>
    </div>
  );

  const tickets = filtered?.map((item) => {
    return (
      <div
        onClick={() => {
          setModalOpen(true);
          setModalData(item);
        }}
      >
        <UserTicket key={item._id} data={item} />
      </div>
    );
  });

  return (
    <div className="user-ticket-list">
      <div className="form-type-3 mt-38">
        <div className="position-relative">
          <input
            type="text"
            id="searchtickets"
            placeholder="Search Tickets"
            name="searchText"
            value={searchText}
            onChange={onInputChange}
          />
          <i
            className={
              searchText?.length > 0 ? "display-none" : "conf-search-input-icon"
            }
          >
            <SearchIcon width="2.4rem" height="2.4rem" />
          </i>
        </div>
      </div>
      <h4 className="my-26 color-primary">Upcoming Conferences</h4>
      {isLoading ? <Loader /> : data?.length > 0 ? tickets : noTickets}
      {modalOpen && (
        <TicketModal
          data={modalData}
          onDismiss={() => {
            onDismiss();
          }}
        />
      )}
    </div>
  );
}
