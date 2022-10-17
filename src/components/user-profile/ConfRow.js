import DocumentIcon from "../icons/DocumentIcon";
import Select from "react-select";
import { useState } from "react";
import api from "../../utility/api";
import { useSelector } from "react-redux";


export default function ConfRow ({item, booking, credits, requestCredit}) {

  console.log(credits)
    

    const [credit, setCredit] = useState()
    const userID = useSelector((state) => state.auth.user?._id);


    const downloadCertificate = async (data) => {
        try {
          window.open(data.location);
        } catch (err) {
          console.log(err);
        }
      };


    


    return (
        <div className="conference-table">
            <div className="credit-table-item">{booking}</div>
                <div className="credit-table-item">{item.conference.title}</div>

                <div className="credit-table-item">
                  {item.creditRequest && item.creditCertificateUploaded && (
                    <div>{item.requestedCredit.name}</div>
                  )}
                  {item.creditRequest && !item.creditCertificateUploaded && (
                    <div> {item.requestedCredit.name} </div>
                  )}
                  {!item.creditRequest && !item.creditCertificateUploaded && (
                    <Select
                      onChange={(e) => {
                        console.log(e)
                        setCredit(e);
                      }}
                      options={credits}
                    />
                  )}
                </div>

                <div className="credit-table-item">
                  {item.creditRequest && item.creditCertificateUploaded && (
                    <div>{item.creditQuantity}</div>
                  )}
                  {item.creditRequest && !item.creditCertificateUploaded && (
                    <div> {item.creditQuantity} </div>
                  )}
                  {!item.creditRequest && !item.creditCertificateUploaded && (
                    <div>
                        {credit && <div>{credit.value.quantity} </div>}
                        {!credit && <div>Choose credit type</div>}
                    </div>
                  )}
                </div>

                <div className="credit-table-item">
                  {item.creditRequest && item.creditCertificateUploaded && (
                    <button
                      onClick={() => {
                        downloadCertificate(item.creditCertificate);
                      }}
                      style={{
                        backgroundColor: "#fafbfc",
                        border: "2px solid lightGrey",
                        fontWeight: "bold",
                        padding: ".5rem 1rem",
                        borderRadius: "4px",
                      }}
                    >
                      <DocumentIcon /> View Certificate
                    </button>
                  )}

                  {item.creditRequest && !item.creditCertificateUploaded && (
                    <div> Pending </div>
                  )}

                  {!item.creditRequest && !item.creditCertificateUploaded && (
                    <button
                      onClick={() => {
                        requestCredit(item, credit)
                      }}
                      style={{
                        backgroundColor: "#fafbfc",
                        border: "2px solid lightGrey",
                        fontWeight: "bold",
                        padding: ".5rem .5rem",
                        borderRadius: "4px",
                      }}
                    >
                      Request Credit Certificate
                    </button>
                  )}
                </div>
        </div>
    )
}