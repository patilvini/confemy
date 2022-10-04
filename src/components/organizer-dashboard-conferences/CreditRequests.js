import { useEffect, useState } from "react";
import api from "../../utility/api";
import SearchBar from "../search/SearchBar";
import UploadModal from "./UploadModal";
import Select from "react-select";



export default function CreditRequests() {
  const [modalOpen, setModalOpen] = useState(false);
  const [attendee, setAttendee] = useState();
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const options = [
    { value: "Physician", label: "Physician" },
    { value: "Nurse", label: "Nurse" },
    { value: "Pharmacist", label: "Pharmacist" },
    { value: "Example 1", label: "Example 1" },
    { value: "Example 2", label: "Example 2" },
  ];
  
  const downloadCertificate = async (id) => {

      
    try{
      const r = await api.get("/attendees/credits/certificates/users/"+id)
      console.log(r)
      const pdfRaw = r.data
      const file = new Blob([pdfRaw], {type: 'application/pdf'})
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
      
    } catch (err) {
      console.log(err)
    }

  }
  

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get(
          "organizers/conferences/credits/users/6305be9942434c682442a724"
        );
        console.log(r.data.data.allCredits);
        setData(r.data.data.allCredits)
        
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="dash-wrapper">
      <div className="flex-container">
        <h1 style={{marginRight:"1rem"}}>Credits Requests</h1>
        
        <div>
          <SearchBar
            onClear={() => setSearchValue("")}
            setValue={(value) => {
              setSearchValue(value);
            }}
            value={searchValue}
            data={data}
          />
        </div>
        <Select width='200px' options={options}/>
      </div>

      <div>
        <div className="request-table-heading">
          <div className="request-table-item">Name</div>
          <div className="request-table-item">Conference</div>

          <div className="request-table-item">Credit Type</div>

          <div className="request-table-item">Total Credits</div>
          <div></div>
        </div>

        {data?.map((item, index) => {
          console.log(item)
          return (
   
            <div className="request-table" key={index}>
              <div className="request-table-item">
                {item.user.firstName} {item.user.lastName}
              </div>
              <div className="request-table-item">
                {item.conference.title}
              </div>

              <div className="request-table-item">
                <p
                  style={{ fontSize: "2rem" }}
                  className="caption-2-regular-gray3"
                >
                  AMA cat 1
                </p>
              </div>

              <div className="request-table-item">
                <p className="caption-2-regular-gray3">3</p>
              </div>
              <div className="overview-table-item">
                {!item.creditCertificateUploaded && (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setAttendee(item._id);
                    }}
                    className="button button-green"
                  >
                    Upload Certificate
                  </button>
                )}
                {item.creditCertificateUploaded && (
                  <button onClick={()=>downloadCertificate(item._id)} className="button button-primary">
                    View Certificate
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
