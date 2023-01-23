import React from "react";

const ExternalCreditsTable = () => {
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
          <tr>
            <td>Jan 23 2022</td>
            <td>This is the title of the conference</td>
            <td>ACT cat 2</td>
            <td>30</td>
            <td>View certificate</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExternalCreditsTable;
