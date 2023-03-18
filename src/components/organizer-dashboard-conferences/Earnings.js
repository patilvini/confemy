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
      <div className="grid-col-4 mb-24">
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
      <div className="flex-vc avenir-roman-18-gray3 mb-24">
        <h4>Withdaw</h4>
        <div className="earnings-btn mx-12 pt-8 ">PayPal</div>
        <div className="earnings-btn mx-12 pt-4  flex-vc">
          <span className="mx-16"> Bank Account</span>
          <BankIcon />
        </div>
      </div>
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
  );
}

{
  /* <div className="dash-wrapper">


<h1>Earnings</h1>
<div className="data-grid">
    <div className="data-container">
    <p >Net Income</p>
    <h2 style={{padding: "1rem"}}>$20K</h2>


    </div>
    <div className="data-container">
    <p className="caption-2-regular-gray3">Withdrawn</p>
    <h2 style={{padding: "1rem"}}>$15K</h2>

    </div>
    <div className="data-container">

    <p className="caption-2-regular-gray3">Pending Clearance</p>
    <h2 style={{padding: "1rem"}}>$3K</h2>

    </div>
    <div className="data-container">
    <p className="caption-2-regular-gray3">Available for Withdrawl</p>
    <h2 style={{padding: "1.6rem"}}>$2k</h2>

    </div>
</div>

<div className="flex-container">
<h4 style={{alignSelf:"center", marginLeft: "2rem"}} >Withdaw</h4> 
<button  style={{alignSelf:"center", marginLeft: "2rem"}} className="button button-secondary"> PayPal </button>
<button  style={{alignSelf:"center", marginLeft: "2rem"}} className="button button-secondary"> Bank Account </button>

</div>



<div className="earnings-table-heading">
<div className="request-table-item">Date</div>
<div className="request-table-item">Conference</div>

<div style={{textAlign:"right"}} className="request-table-item">Tickets Sold</div>

<div style={{textAlign:"right"}} className="request-table-item">Gross Earnings</div>




</div>

{a.map((item, index)=> {
return (

<div className="earnings-table" key={index}>
<div className="request-table-item">12/15/2021</div>
<div className="request-table-item"><p className="caption-2-regular-gray3">Using Banner Stands To Increase Trade Show Traffic</p></div>

<div style={{textAlign:"right"}} className="request-table-date">30/50</div>

<div style={{textAlign:"right"}} className="request-table-item"><p className="caption-2-regular-gray3">$400</p></div>

</div>

)

})}

</div> */
}
