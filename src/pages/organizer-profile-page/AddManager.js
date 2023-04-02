import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import api from "../../utility/api";

import "./addManager.scss";

export default function AddManager() {
  const [orgs, setOrgs] = useState([]);
  const userID = useSelector((state) => state.auth.user._id);
  const [orgId, setId] = useState("");

  const [modal, setModal] = useState(false);
  useEffect(() => {
    api
      .get("/organizations/users/" + userID)
      .then((r) => {
        setOrgs(r.data.data.organization);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="conf-form-wrap">
        <div>
          <label>
            <h4>Organizations</h4>
          </label>
          <div className="orgFlex">
            <div className="grid-item">
              <strong>Organization Name</strong>{" "}
            </div>

            <div className="grid-item">
              <strong>Actions</strong>
            </div>
          </div>
          <div className="">
            {orgs.map((i) => {
              return (
                <div key={i.organization._id}>
                  <div className="orgFlex">
                    <div className="grid-item">{i.organization.name} </div>

                    <div
                      onClick={() => {
                        setModal(true);
                        setId(i.organization._id);
                      }}
                      className="grid-item"
                    >
                      <button>Manage</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal show={modal} close={() => setModal(false)} orgId={orgId} />
    </>
  );
}
