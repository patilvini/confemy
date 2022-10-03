import AddIcon from "../icons/AddIcon.js";
import GlobeSketch from "../icons/GlobeSketch";
import DropdownIcon from "../icons/DropdownIcon";
import EditIcon from "../icons/EditIcon.js";
import api from "../../utility/api.js";
import { useSelector } from "react-redux/es/exports.js";
import { useEffect, useState } from "react";
import ExternalCredModal from "./ExternalCredModal.js";
import SetGoalModal from "./SetGoalModal.js";
import UpdateGoalModal from "./UpdateGoalModal.js";

export default function Credits() {
  let component;

  const [externalOpen, setExternalOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [data, setData] = useState();
  const [creditData, setCredit] = useState();
  const [updateGoal, setUpdateOpen] = useState(false);
  const userID = useSelector((state) => state.auth.user?._id);
  const [confs, setConfs] = useState();
  const [externalCreds, setExternalCreds] = useState([]);

  // console.log(userID)

  const downloadCertificate = async (data) => {
    try {
      window.open(data.location);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const r = await api.get(
          "/attendees/credits/users/" + userID + "?getAllCreditTypes=true"
        );
        console.log(r.data.data.allCredits);
        setData(r.data.data.allCredits);
      } catch (err) {
        console.log(err);
      }
    };

    const getConfs = async () => {
      try {
        const r = await api.get("/attendees/credits/users/" + userID);
        console.log(r);
        setConfs(r.data.data.allCredits);
      } catch (err) {
        console.log(err);
      }
    };

    const getExtCreds = async () => {
      try {
        const r = await api.get("/attendees/" + userID + "/credits/externals");
        console.log(r);
        setExternalCreds(r.data.data.externalCredits);
      } catch (err) {
        console.log(err);
      }
    };

    getExtCreds();
    getConfs();
    getData();
  }, [userID, goalOpen, updateGoal]);

  const noCredits = (
    <div>
      <GlobeSketch className="icon-plshld" />
      <div className="passes-list">
        <h2>No Credits found. Book Conference to earn credits. </h2>
        <h3 style={{ color: "grey", margin: "2rem" }}>OR</h3>
        <button
          style={{ margin: "0rem 0 6rem 0" }}
          className="button button-primary"
        >
          Add CME Credits
        </button>
        <button
          onClick={() => setExternalOpen()}
          style={{ margin: "0rem 1rem 6rem 1rem" }}
          className="button button-primary"
        >
          Set Credit Goals
        </button>
      </div>
      {/* 
      {externalOpen && (
        <ExternalCredModal
          onDismiss={() => {
            setExternalOpen(false);
          }}
        />
      )}
      {goalOpen && (
        <SetGoalModal
          onDismiss={() => {
            setGoalOpen(false);
          }}
        />
      )} */}
    </div>
  );

  const credits = (
    <div>
      <h1 style={{ margin: "7.7rem 0 3rem 12.2rem" }}>Credits</h1>

      <div className="credits-wrapper">
        <div style={{ width: "100%" }} className="opposite-grid">
          <div className="grid-item-left flex-container">
            <div style={{ alignSelf: "center" }}>
              <button
                onClick={() => {
                  setExternalOpen(true);
                }}
                className="circle-button"
              >
                <AddIcon />
              </button>
            </div>
            <div className="circle-label">
              <span className="caption-2-regular-gray3">
                Add external credits
              </span>
            </div>
          </div>
          <div className="grid-item-right">
            <button className="button button-secondary">
              Last 30 days <DropdownIcon className="icon-size" />
            </button>
          </div>
        </div>

        <div className="credits-table-heading">
          <div className="credit-table-item">Credit Type</div>
          <div className="credit-table-item">Total Credits</div>

          <div className="credit-table-item">Registered Credits</div>

          <div className="credit-table-item">Pending Clearance</div>

          <div className="credit-table-item">To Goal</div>
        </div>
        {data?.map((item, index) => {
          return (
            <div key={index}>
              <div className="credits-table">
                <div className="credit-table-item">{item.creditName}</div>
                <div className="credit-table-item">
                  {item.approvedCreditQuantity}
                </div>

                <div className="credit-table-item">
                  {item.registeredCreditQuantity}
                </div>

                <div className="credit-table-item">
                  {item.pendingCreditQuantity}
                </div>

                <div className="credit-table-item">
                  {item.goal}

                  {item.goal && (
                    <button
                      onClick={() => {
                        setCredit(item);
                        setUpdateOpen(true);
                      }}
                      style={{ backgroundColor: "#fafbfc", border: "none" }}
                    >
                      <EditIcon />
                    </button>
                  )}

                  {!item.goal && (
                    <button
                      onClick={() => setGoalOpen(true)}
                      className="button button-green"
                    >
                      Set Goal
                    </button>
                  )}
                </div>
              </div>{" "}
            </div>
          );
        })}

        <h3 style={{ margin: "7.7rem 0 0rem 0rem" }}>Conferences</h3>

        <div className="conferences-table-heading">
          <div className="credit-table-item">Date</div>
          <div className="credit-table-item">Conference</div>

          <div className="credit-table-item">Credit Type</div>

          <div className="credit-table-item">Total Credits</div>

          <div className="credit-table-item">Status</div>
        </div>
        {confs?.map((item, index) => {
          return (
            <div key={index}>
              <div className="conference-table">
                <div className="credit-table-item">{item.bookingDate}</div>
                <div className="credit-table-item">{item.conference.title}</div>

                <div className="credit-table-item">
                  {item.registeredCreditQuantity}
                </div>

                <div className="credit-table-item">
                  {item.pendingCreditQuantity}
                </div>

                <div className="credit-table-item">
                 

                  {item.goal && (
                    <button
                      onClick={() => {
                        // setCredit(item);
                        // setUpdateOpen(true);
                      }}
                      style={{ backgroundColor: "#fafbfc", border: "none" }}
                    >
                     Request Credit Cetificate
                    </button>
                  )}

                  
                    
                  
                </div>
              </div>{" "}
            </div>
          );
        })}

        <h3 style={{ margin: "7.7rem 0 0rem 0rem" }}>External Credits</h3>

        <div className="conferences-table-heading">
          <div className="credit-table-item">Date</div>
          <div className="credit-table-item">Conference</div>

          <div className="credit-table-item">Credit Type</div>

          <div className="credit-table-item">Total Credits</div>

          <div className="credit-table-item">Status</div>
        </div>

        {externalCreds?.map((item, index) => {
          // console.log(item)
          return (
            <div key={index}>
              <div className="conference-table">
                <div className="credit-table-item">{item.createdAt}</div>
                <div className="credit-table-item">{item.conferenceTitle}</div>

                <div className="credit-table-item">{item.credit.name}</div>

                <div className="credit-table-item">{item.quantity}</div>

                <div className="credit-table-item">
                  {item.creditCertificateUploaded && (
                    <button
                      onClick={() => downloadCertificate(item.certificate)}
                      className="button button-primary"
                    >
                      View Certificate
                    </button>
                  )}
                </div>
              </div>{" "}
            </div>
          );
        })}
      </div>

      {externalOpen && (
        <ExternalCredModal
          onDismiss={() => {
            setExternalOpen(false);
          }}
        />
      )}
      {goalOpen && (
        <SetGoalModal
          onDismiss={() => {
            setGoalOpen(false);
          }}
        />
      )}
      {updateGoal && (
        <UpdateGoalModal
          creditData={creditData}
          onDismiss={() => {
            setUpdateOpen(false);
          }}
        />
      )}
    </div>
  );

  if (data?.length === 0) {
    component = credits;
  } else {
    component = credits;
  }
  return <div>{component}</div>;
}
