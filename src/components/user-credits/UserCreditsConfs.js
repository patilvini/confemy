import React from "react";

const UserCreditsConfs = () => {
  return (
    <div className="mb-80">
      <h4 className="mb-24">Conference</h4>
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
            <td>Jan 23 2023</td>
            <td>This is the title of the conference</td>
            <td>ACT cat 1</td>
            <td>20</td>
            <td>Pending clearance</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserCreditsConfs;
