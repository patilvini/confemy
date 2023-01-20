import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router";

import api from "../../utility/api";
import UserTicket from "./UserTicket";
import Loader from "../loader/Loader";
import NoPasses from "../SVG-assets/NoPasses";

import "./ticketForm.styles.scss";
import SearchIcon from "../icons/SearchIcon";

export default function UserTickets() {
  const [formData, setFormData] = useState({
    searchText: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const { searchText } = formData;

  const onInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getData = async (userID) => {
    try {
      const { data } = await api.get(
        `/conferences/bookings/passes/users/${userID}`
      );
      setData(data?.data?.bookingDetails);
      setFiltered(data?.data?.bookingDetails);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getData(user?._id);
  }, [user?._id]);

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
    <div className="text-align-center">
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

  const tickets = filtered?.map((item) => (
    <div key={item._id}>
      <UserTicket ticketData={item} />
    </div>
  ));

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
      <h3 className="my-26 color-primary">Upcoming Conferences</h3>
      {isLoading ? <Loader /> : data?.length > 0 ? tickets : noTickets}
    </div>
  );
}
