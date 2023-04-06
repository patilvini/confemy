import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import BankIcon from "../icons/BankIcon";
import api from "../../utility/api";

export default function Earnings() {
  const [data, setData] = useState("");
  const user = useSelector((state) => state.auth.user);

  const formatStartDate = (data) => {
    const startDateObj = new Date(data?.conference?.startDate);
    let formattedStartDate;
    if (startDateObj && data?.conference?.timezone) {
      formattedStartDate = formatInTimeZone(
        startDateObj,
        data?.conference?.timezone,
        "MMM-dd-yyyy, HH:mm aa",
        { locale: enGB }
      );
    }
    return formattedStartDate;
  };
  const formatEndDate = (data) => {
    const endDateObj = new Date(data?.conference?.endDate);
    let formattedEndDate;
    if (endDateObj && data?.conference?.timezone) {
      formattedEndDate = formatInTimeZone(
        endDateObj,
        data?.conference?.timezone,
        "MMM-dd-yyyy, HH:mm aa",
        { locale: enGB }
      );
    }
    return formattedEndDate;
  };

  const getEarningsData = async (userId) => {
    try {
      const response = await api.get(
        `organizers/earnings/users/${userId}?type=user`
      );
      if (response) {
        console.log("response------", response);
        setData(response.data.data.earnings);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEarningsData(user._id);
  }, [user._id]);
  return (
    <div>
      <h1 className="mb-24">Earnings</h1>
      <div className="flex-vc mb-24" style={{ flexWrap: "wrap" }}>
        <div className="earnings-card">
          <h4 className="avenir-roman-18-gray3 mb-12">Net Income</h4>
          <h3 className="">$20K</h3>
        </div>
        <div className="earnings-card">
          <h4 className="avenir-roman-18-gray3 mb-12">Withdawn</h4>
          <h3 className="">$15K</h3>
        </div>
        <div className="earnings-card">
          <h4 className="avenir-roman-18-gray3 mb-12">Pending Clearance</h4>
          <h3 className="">$3K</h3>
        </div>
        <div className="earnings-card">
          <h4 className="avenir-roman-18-gray3 mb-12">
            Available for Withdrawl
          </h4>
          <h3 className="">$2K</h3>
        </div>
      </div>
      <div className="earnings-withdraw avenir-roman-18-gray3 mb-24">
        <h4>Withdaw</h4>
        <div className="earnings-btn  pt-8 ">PayPal</div>
        <div className="earnings-btn  pt-4  flex-vc">
          <span className="mx-16"> Bank Account</span>
          <BankIcon />
        </div>
      </div>
      <div className="earnings-table-wrap">
        <table className="earnings-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>

              <th>Conference</th>
              <th>Tickets Sold</th>
              <th>Gross Earnings</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data?.map((item) => {
                return (
                  <tr>
                    <td> {formatStartDate(item)}</td>
                    <td> {formatEndDate(item)}</td>

                    <td>
                      {item.conference.title}
                      {/* test 123 */}
                    </td>
                    <td>{item.soldTicket}</td>
                    <td>{item.grossPrice}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
