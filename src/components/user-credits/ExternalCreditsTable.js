import React from "react";
import { useSelector } from "react-redux";
import AddFileIcon from "../icons/AddFileIcon";
import DucumentIcon from "../icons/DocumentIcon";

const ExternalCreditsTable = () => {
  const externalCredits = useSelector(
    (state) => state.userProfile.userExternalCredits
  );
  return (
    <div className="my-40">
      <h4 className="mb-24">External Credits</h4>
      <table className="uc-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Conference</th>
            <th>Credit Type</th>
            <th>Total Credits</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {externalCredits?.map((data) => (
            <tr key={data._id}>
              <td>{data.startDate}</td>
              <td>{data.conferenceTitle}</td>
              <td>ACT cat 2</td>
              <td>{data.quantity}</td>
              <td>
                <div className="flex-vc">
                  <i
                    className="mr-8 "
                    style={{ position: "relative", paddingTop: "5px" }}
                  >
                    <DucumentIcon className="icon-sm" />
                  </i>
                  <div> View certificate</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExternalCreditsTable;
