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
    let creditTypeID = data?.conference?.credits?.find(
      (credit) => id.toString() === credit.creditId._id.toString()
    );
    setQuantity(creditTypeID.quantity);
    setValue(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      atteendeeDetails: {
        creditRequest: true,
        creditId: value,
        creditQuantity: totalCredit,
      },
    };

    try {
      let response = await api.patch(
        `attendees/credits/users/${data?._id}`,
        formData
      );
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

  return (
    <>
      <form id="conf-table-form" onSubmit={handleSubmit}></form>
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
                {data?.creditRequest ? (
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
                    isDisabled={true}
                    // onChange={(value) => setValue(value.value)}
                    onChange={(value) => selectChangeHandler(value.value)}
                    styles={{ overFlow: "hidden" }}
                    isSearchable
                  />
                ) : (
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
                )}
              </div>
            </td>
            <td>{quantity}</td>
            {/* <form onSubmit={handleSubmit}> */}
            <td>
              {data?.creditRequest ? (
                <span>{data.creditQuantity}</span>
              ) : (
                <input
                  id="totalCredits"
                  type="number"
                  name="totalCredits"
                  value={totalCredit}
                  onChange={(e) => setTotalCredit(e.target.value)}
                  max={quantity}
                  className="uc-conf-input"
                  form="conf-table-form"
                />
              )}
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
                <button type="submit" className="btn" form="conf-table-form">
                  {data?.creditStatus === 2 && data?.creditRequest ? (
                    <span className="caption-1-heavy-cblack">
                      Pending clearance
                    </span>
                  ) : data?.creditStatus === 1 && data?.creditRequest ? (
                    <span>Success</span>
                  ) : (
                    <span className="caption-1-heavy-primary">
                      Request credit certificate
                    </span>
                  )}
                </button>
              )}
            </td>
            {/* </form> */}
          </>
        ) : (
          <td>Credit not offered</td>
        )}
      </tr>
    </>
  );
}
