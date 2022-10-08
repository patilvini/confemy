import { useEffect, useState } from "react";
import api from "../../utility/api";
import SearchBar from "../search/SearchBar";
import UploadModal from "./UploadModal";
import Select from "react-select";
import UploadIcon from "../icons/UploadIcon";
import DocumentIcon from "../icons/DocumentIcon";

const confemyWhite = "#ffffff";
const confemyBlac = "#000000";
const shade1 = "#ced9de";
const shade2 = "#ecf0f2";
const shade3 = "#fcfdfd";
const shade4 = "#aabdc7";

export default function CreditRequests() {
  const [modalOpen, setModalOpen] = useState(false);
  const [attendee, setAttendee] = useState();
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const customStyles = {
    control: (styles, state) => {
      // console.log("styles from control", styles);
      // console.log("control state", state);
      return {
        ...styles,
        height: "4.8rem",
        backgroundColor: confemyWhite,
        border: `1px solid ${confemyBlac}`,
        // padding: "13px 0px 13px 16px",
        fontFamily: "Avenir-Roman",
        fontSize: 16,

        ":hover": {
          border: state.isFocused ? "1px solid #55a0fa" : `solid 3px ${shade4}`,
        },

        ":focus": {
          border: "1px solid #55a0fa",
        },
      };
    },

    placeholder: (provided) => ({
      ...provided,
      // fontSize: "1em",
      // color: confemyBlac,
      // fontWeight: 400,
    }),

    option: (provided, state) => {
      return {
        ...provided,
        color: confemyBlac,
        backgroundColor: state.isSelected ? shade2 : "#fff",
        fontSize: 16,
        fontFamily: "Avenir-Roman",
        padding: 16,
      };
    },

    dropdownIndicator: (provided, state) => {
      // console.log("DownChevron provided", provided);
      // console.log("DownChevron state", state);
      return {
        ...provided,
        color: shade1,
        ":hover": {
          color: shade4,
        },
      };
    },
  };

  const options = [
    { value: "Physician", label: "Physician" },
    { value: "Nurse", label: "Nurse" },
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "Example 1", label: "Example 1" },
    { value: "Example 2", label: "Example 2" },
  ];

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

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get(
          "organizers/conferences/credits/users/6305be9942434c682442a724"
        );
        console.log(r.data.data.allCredits);
        setData(r.data.data.allCredits);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="dash-wrapper">
      <h1 style={{ marginRight: "1rem" }}>Credits Requests</h1>
      <div className="opposite-grid">
        <div>
          <SearchBar
            onClear={() => setSearchValue("")}
            setValue={(value) => {
              setSearchValue(value);
            }}
            value={searchValue}
            // data={data}
          />
        </div>

        <div
          className="grid-item-right"
          style={{
            width: "89%",
            margin: "2rem 0rem 2rem 4rem",
            alignSelf: "center",
          }}
        >
          <Select placeholder={"Sort"}  options={options} styles={customStyles} />
        </div>
      </div>

      <div>
        <div className="credit-request-table-heading">
          <div className="request-table-item">Name</div>
          <div className="request-table-item">Conference</div>

          <div className="request-table-item">Credit Type</div>

          <div style={{ textAlign: "center" }} className="request-table-item">
            Total Credits
          </div>
          <div></div>
        </div>

        {data?.map((item, index) => {
          console.log(item);
          return (
            <div className="credit-request-table" key={index}>
              <div className="request-table-item">
                {item.user.firstName} {item.user.lastName}
              </div>
              <div className="request-table-item">{item.conference.title}</div>

              <div className="request-table-date">
                {item.requestedCredit.name}
              </div>

              <div
                style={{ textAlign: "center" }}
                className="request-table-item"
              >
                {item.creditQuantity}
              </div>
              <div className="overview-table-item">
                {!item.creditCertificateUploaded && (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setAttendee(item._id);
                    }}
                    className="credits-button"
                  >
                    <UploadIcon /> Upload Certificate
                  </button>
                )}
                {item.creditCertificateUploaded && (
                  <button
                    onClick={() => downloadCertificate(item._id)}
                    className="credits-button"
                  >
                    <DocumentIcon /> View Certificate
                  </button>
                )}
              </div>
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
      </div>
    </div>
  );
}
