import { useState, useEffect } from "react";
import api from "../../utility/api";

import "./dashboard.scss";

export default function OrganizationDash() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    api
      .get("/organizations")
      .then((r) => {
        setOrgs(r.data.data.organizations);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(orgs);

  return (
    <>
      <div className="conf-form-wrap">
        <div>
          <label>
            <h4>Organizations</h4>
          </label>
          <div className="">
            {orgs.map((i) => {
              return (
                <div key={i._id}>
                  <div className="orgFlex">
                    <div className="grid-item">{i.name} </div>
                    <div className="grid-item">{i.country} </div>
                    <div className="grid-item">{i.state} </div>
                    <div className="grid-item">{i.city} </div>
                    {/* <div></div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
