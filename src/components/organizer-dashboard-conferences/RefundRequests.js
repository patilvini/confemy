import { useState } from "react";
import SearchBar from "../search/SearchBar";

export default function RefundRequests() {
  const [filtered, setFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const a = [0, 0, 0];
  return (
    <div className="dash-wrapper">
      <div className="flex-container">
        <h1 style={{marginRight:"2rem"}}>Refund Requests</h1>
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
      </div>

      <div>
        <div className="request-table-heading">
          <div className="request-table-item">Name</div>
          <div className="request-table-item">Conference</div>

          <div className="request-table-item">Booked</div>

          <div className="request-table-item">Registration #</div>
          <div className="request-table-item">
            {" "}
            <button className="button button-green">Approve all</button>
          </div>
        </div>

        {a.map((item, index) => {
          return (
            <div className="request-table" key={index}>
              <div className="request-table-item">Mohamad Ali Khan</div>
              <div className="request-table-item">
                <p className="caption-2-regular-gray3">
                  Future of innovation in medicines after COVID-19
                </p>
              </div>

              <div className="request-table-item">
                <p
                  style={{ fontSize: "1.7rem" }}
                  className="caption-2-regular-gray3"
                >
                  OCT 21, 2021
                </p>
              </div>

              <div className="request-table-item">
                <p className="caption-2-regular-gray3">2164516123168</p>
              </div>
              <div className="request-table-item">
                {" "}
                <button className="button button-green">Approve Refund</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
