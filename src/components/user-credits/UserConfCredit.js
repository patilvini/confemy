import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getValue } from "../../utility/commonUtil";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import DucumentIcon from "../icons/DocumentIcon";

import { alertAction } from "../../redux/alert/alertAction";
import { loadUserCreditConferencesAction } from "../../redux/user-profile/userProfileAction";
import api from "../../utility/api";

import "./usercredits.styles.scss";
import { async } from "q";

export default function UserConfCredit({ data }) {
  const [value, setValue] = useState(
    data?.conference?.credits[0]?.creditId?._id
  );
  const [totalCredit, setTotalCredit] = useState(null);
  const [quantity, setQuantity] = useState(
    data?.conference?.credits[0]?.quantity
  );
  const dispatch = useDispatch();

  const selectChangeHandler = (id) => {
    console.log("id", id);
    let creditTypeID = data?.conference?.credits?.find(
      (credit) => id.toString() === credit.creditId._id.toString()
    );
    setQuantity(creditTypeID.quantity);
    setValue(id);
  };

  const handleSubmit = async (e) => {
    console.log("total credit", totalCredit);
    e.preventDefault();
    let formData = {
      atteendeeDetails: {
        creditRequest: true,
        creditId: value,
        creditQuantity: totalCredit,
      },
    };

    console.log("formdata", formData);

    try {
      let response = await api.patch(
        `attendees/credits/users/${data?._id}`,
        formData
      );
      console.log("responce", response);
    } catch (error) {
      dispatch(alertAction(error.response.data.message, "danger"));
    }
  };

  const getCreditOptions = (conf) =>
    conf.credits.map((credit) => ({
      label: credit.creditId.name,
      value: credit.creditId._id,
    }));

  const viewCertificate = (certificate) => {
    window.open(certificate.location);
  };

  // console.log("quantity", quantity);
  // useEffect(() => {
  //   setQuantity(data?.conference?.credits?.quantity);
  // }, []);

  return (
    <tr>
      <td>
        {formatInTimeZone(
          new Date(data?.conference?.startDate),
          data?.conference?.timeZone,
          "MMM dd yyyy",
          { locale: enGB }
        )}
      </td>
      <td>{data?.conference?.title}</td>
      {data?.conference?.isAccredited ? (
        <>
          <td>
            <div style={{ width: 220 }}>
              <Select
                defaultValue={{
                  label: data.conference.credits[0].creditId.name,
                  value: data.conference.credits[0].quantity,
                }}
                options={getCreditOptions(data?.conference)}
                value={getValue(
                  getCreditOptions(data?.conference),
                  value,
                  false
                )}
                // onChange={(value) => setValue(value.value)}
                onChange={(value) => selectChangeHandler(value.value)}
                styles={{ overFlow: "hidden" }}
                isSearchable
              />
            </div>
          </td>
          <td>{quantity}</td>
          <div>
            <form onSubmit={handleSubmit}>
              <td>
                <input
                  id="totalCredits"
                  type="number"
                  name="totalCredits"
                  value={totalCredit}
                  onChange={(e) => setTotalCredit(e.target.value)}
                  max={""}
                  className="uc-conf-input"
                />
              </td>
              <td>
                {data?.creditCertificateUploaded ? (
                  <div
                    className="flex-vc"
                    onClick={() => viewCertificate(data.certificate)}
                  >
                    <i className="position-relative pt-8 mr-8">
                      <DucumentIcon className="icon-sm" />
                    </i>{" "}
                    <span>View certificate</span>
                  </div>
                ) : (
                  <button type="submit" className="btn">
                    {data?.creditStatus === 2 && data?.creditRequest
                      ? "Pending"
                      : data?.creditStatus === 1 && data?.creditRequest
                      ? "Success"
                      : "Request credit"}
                  </button>
                )}
              </td>
            </form>
          </div>
        </>
      ) : (
        <td>Credit not offered</td>
      )}
    </tr>
  );
}
