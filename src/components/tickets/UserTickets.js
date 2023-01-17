import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import api from "../../utility/api";
import { useDispatch, useSelector } from "react-redux/es/exports";
import UserTicket from "./UserTicket";
// import TicketModal from "./TicketModal";
import SearchBar from "../search/SearchBar";
import NoPasses from "../SVG-assets/NoPasses";

export default function UserTickets() {
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState();
  const [pass, setPass] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onDismiss = () => navigate("/user-profile");
  let component;
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const { data } = await api.get(
        `/conferences/bookings/passes/users/${user?._id}`
      );
      setData(data?.data?.bookingDetails);
      console.log("passes---", data);
      setFiltered(data?.data?.bookingDetails);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  //   useEffect(() => {

  //     if (data) {
  //       const dataSet = data.filter((item) => {
  //         const lower = item.conference.title.toLowerCase();

  //         if (
  //           item.conference.title
  //             .toLowerCase()
  //             .indexOf(searchValue.toLocaleLowerCase()) >= 0
  //         ) {
  //           return item;
  //         }
  //       });

  //       console.log(dataSet);
  //       setFiltered(dataSet);
  //     }
  //   }, [searchValue]);

  const noPasses = (
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

  const search = (
    <div
      style={{ position: "relative", marginRight: "27%" }}
      className="search-bar "
    >
      <SearchBar
        onClear={() => setSearchValue("")}
        setValue={(value) => {
          setSearchValue(value);
        }}
        value={searchValue}
        data={data}
      />
    </div>
  );

  const passes = (
    <div>
      {search}
      <h3 style={{ margin: "2rem 0 2rem 29%" }}>Upcoming Conferences</h3>

      {filtered?.map((item, index) => {
        return (
          <div key={item._id}>
            <UserTicket
              data={data[index]}
              onClick={() => {
                setPass(index);
                setModalOpen(true);
              }}
            />
          </div>
        );
      })}
    </div>
  );

  if (true) {
    component = passes;
  }

  return (
    <div>
      {component}
      {/* 
      {modalOpen && (
        <TicketModal
          data={data[pass]}
          onDismiss={() => {
            onDismiss();
            setModalOpen(false);
          }}
        />
      )} */}
    </div>
  );
}
