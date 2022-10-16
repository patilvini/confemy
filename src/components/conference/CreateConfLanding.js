import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { alertAction } from "../../redux/alert/alertAction";
import { loadIncopleteConfsAction } from "../../redux/conference/conferenceAction";
import { loadOneIncopleteConfAction } from "../../redux/conference/conferenceAction";
import api from "../../utility/api";

export default function CreateConfLanding() {
  const user = useSelector((state) => state.auth.user);
  const incompleteConfs = useSelector(
    (state) => state.conference.incompleteConfs
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   Get one incomplete conference

  const getOneIncompleteConf = async (conferenceId) => {
    const url = `conferences/${conferenceId}`;

    try {
      const response = await api.get(url);
      if (response) {
        console.log("get one incomplete conference", response);
        dispatch(loadOneIncopleteConfAction(response.data.data.conferences));
        navigate("/dashboard/create-conf/step-1");
      }
    } catch (err) {
      if (err) {
        console.log(err);
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  };

  //   Get all incomplete conferences
  const getAllIncompleteConfs = async (userId) => {
    const url = `conferences/users/${userId}?status=draft&getAllOrganizationConferences=true`;

    try {
      const response = await api.get(url);
      if (response) {
        console.log("get incomplete conferences", response);
        dispatch(loadIncopleteConfsAction(response.data.data.conferences));
      }
    } catch (err) {
      if (err) {
        console.log(err);
        dispatch(alertAction(err.response.data.message, "danger"));
      }
    }
  };

  const deleteIncompleteConf = async (conferenceId) => {
    const url = `conferences/${conferenceId}/delete`;

    try {
      const response = await api.delete(url);
      if (response) console.log("delete response", response);
      // dispatch(loadIncopleteConfsAction(response?.data.data.conferences));
      dispatch(alertAction(response.data.message, "success"));
      getAllIncompleteConfs(user._id);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
    console.log("Delete Clicked", url);
  };
  useEffect(() => {
    getAllIncompleteConfs(user._id);
  }, [user._id]);

  return (
    <div>
      <div className="mb-40 body-regular-gray3">
        <h2 className="mb-32">Read before proceeding</h2>
        <p className="mb-16">
          First create Step 1 and click next button to save data before creating
          other steps.
        </p>
        <p className="mb-16">
          After Step 1 is created, any other step can be added and data can be
          saved on clicking next button. One can come back to complete remaining
          steps later.
        </p>
        <p className="mb-16">
          Incomplete conferences will show up below as well as in My Conferences
          tab. Click on incomplete conference heading to finish all steps before
          publishing the conference.
        </p>
        <p className="mb-16">One can not publish incomplete conferences.</p>
      </div>
      <button
        onClick={() => navigate("/dashboard/create-conf/step-1")}
        // onClick={() => navigate("/dashboard/test")}
        className="button button-primary"
      >
        Proceed to create new conference
        {/* Test */}
      </button>
      <div className="mt-60">
        <h2 className="mb-16">Incomplete Conferences</h2>
        <table>
          <thead></thead>
          <tbody>
            {incompleteConfs?.map((conf, indx) => (
              <tr key={conf._id}>
                <td className="body-bold">{indx + 1}</td>
                <td
                  onClick={() => getOneIncompleteConf(conf._id)}
                  className="body-bold"
                >
                  {conf.title}
                </td>
                <td>
                  <button
                    onClick={() => deleteIncompleteConf(conf._id)}
                    className=" button-text button-text-red "
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => getOneIncompleteConf(conf._id)}
                    className="button button-primary"
                  >
                    Edit{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
