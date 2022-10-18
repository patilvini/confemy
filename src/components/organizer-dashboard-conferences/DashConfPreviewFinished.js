
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utility/api";
import DocumentIcon from "../icons/DocumentIcon";
import UploadIcon from "../icons/UploadIcon";
import UploadModal from "./UploadModal";

export default function DashConfPreviewFinished() {
  const [data, setData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [attendee, setAttendee] = useState();
  const conf = useParams().id

  console.log(conf)

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get(
          "/organizers/conferences/"+conf
        );
        console.log(r.data.data.conferenceDetails);
        setData(r.data.data.conferenceDetails);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [conf]);

  const date1 = DateTime.fromISO(data?.activeDate);

  // const userID = useSelector((state)=>state.auth.user?._id)
  let titleDate = date1.toLocaleString({
    ...DateTime.DATE_MED_WITH_WEEKDAY,
    weekday: "short",
  });

  const downloadCertificate = async (id) => {
    try {
      const r = await api.get("/attendees/credits/certificates/users/" + id);
      console.log(r);
      const pdfRaw = r.data;
      const file = new Blob([pdfRaw], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash-wrapper">
      <div className="opposite-grid">
        <div>
          <h2>{data?.title}</h2>
          <p className="caption-2-regular-gray3">{titleDate}</p>
        </div>

        <div className="grid-item-right">
          <button
            style={{ marginRight: "1rem" }}
            className="button button-primary"
          >
            Preview
          </button>
          <button className="button button-primary">Duplicate</button>
        </div>
      </div>
      <div className="data-grid-3">
        <div className="data-container">
          <p className="caption-2-regular-gray3">Tickets Sold</p>
          <h2 style={{ padding: "1rem" }}>
            {data?.totalTicketSold}/{data?.totalTicketQuantity}
          </h2>
        </div>
        <div className="data-container">
          <p className="caption-2-regular-gray3">Gross</p>
          <h2 style={{ padding: "1rem" }}>
            {data?.currency}
            {data?.grossPrice}
          </h2>
        </div>
        <div className="data-container">
          <p className="caption-2-regular-gray3">Status</p>
          <h2 style={{ padding: "1rem" }}>Live</h2>
        </div>
      </div>
      <h3>Sales by Ticket Type</h3>

      <div className="overview-table-heading">
        <div
          style={{ textAlign: "left", marginLeft: "2rem" }}
          className="overview-table-item"
        >
          <h4>Ticket Type</h4>
        </div>
        <div className="overview-table-item"><h4>Price</h4></div>

        <div className="overview-table-item"><h4>Sold</h4></div>

        <div className="overview-table-item"><h4>Status</h4></div>
      </div>

      {data?.tickets.map((item, index) => {
        return (
          <div key={index}>
            <div className="overview-table">
              <div
                style={{ textAlign: "left", marginLeft: "2rem" }}
                className="overview-table-item"
              >
                {item.name}{" "}
              </div>
              <div className="overview-table-item">
                {item.currency}
                {item.price}
              </div>

              <div className="overview-table-item">
                {item.sold}/{item.left}
              </div>

              <div className="overview-table-item">{item.left}</div>
            </div>{" "}
          </div>
        );
      })}

      <h3 style={{ marginTop: "9.2rem" }}>Attendee (#total attedees)</h3>

      <div className="overview-table-heading">
        <div
          style={{ textAlign: "left", marginLeft: "2rem" }}
          className="overview-table-item"
        >
          <h4>Name</h4>
          
        </div>
        <div className="overview-table-item"><h4>Registration no.</h4></div>

        <div className="overview-table-item"><h4>Booked</h4></div>

        <div className="overview-table-item"><h4>Credits</h4></div>
      </div>

      {/* <div>
      <div className="overview-table">
  <div style={{textAlign: "left", marginLeft: "2rem"}} className="overview-table-item"><h4>Felix J.</h4> <p className="caption-2-regular-gray3">Psyciatrist</p></div>
  <div className="overview-table-item">#3498r34b34</div>

  <div className="overview-table-item">Oct 21, 2021</div>

  <div className="overview-table-item">Confirmed Booking</div>

  
</div> </div> */}

      {data?.attendees.map((item, index) => {
        const date2 = DateTime.fromISO(item.createdAt);
        let regDate = date2.toLocaleString({
          ...DateTime.DATE_MED_WITH_WEEKDAY,
          weekday: "short",
        });
        return (
          <div key={index}>
            <div className="overview-table">
              <div
                style={{ textAlign: "left", marginLeft: "2rem" }}
                className="overview-table-item"
              >
                <h4>
                  {item.user.firstName} {item.user.lastName}
                </h4>{" "}
                <p className="caption-2-regular-gray3">
                  {item.user.profession}
                </p>
              </div>
              <div className="overview-table-item">
                {item.registrationNumber}
              </div>

              <div className="overview-table-item">{regDate}</div>

              <div className="overview-table-item">
                {!item.creditCertificateUploaded && (
                  <button
                    style={{
                      backgroundColor: "#fafbfc",
                      border: "2px solid lightGrey",
                      fontWeight: "bold",
                      padding: ".5rem .5rem",
                      borderRadius: "4px",
                    }}
                    onClick={() => {
                      setModalOpen(true);
                      setAttendee(item._id);
                    }}
                  >
                    <UploadIcon /> Upload Certificate
                  </button>
                )}
                {item.creditCertificateUploaded && (
                  <button
                    style={{
                      backgroundColor: "#fafbfc",
                      border: "2px solid lightGrey",
                      fontWeight: "bold",
                      padding: ".5rem .5rem",
                      borderRadius: "4px",
                    }}
                    onClick={() => downloadCertificate(item._id)}
                  >
                    {" "}
                    <DocumentIcon /> View Certificate
                  </button>
                )}
              </div>
            </div>{" "}
          </div>
        );
      })}

      {modalOpen && (
        <UploadModal
          attendee={attendee}
          onDismiss={() => {
            setModalOpen(false);
          }}
        />
      )}

      <h3 style={{ marginTop: "9.2rem" }}>Your Links</h3>
    </div>
  );
}
