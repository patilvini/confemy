import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SavedConfCard from "./SavedConfCard";
import BannerWithGirlSketch from "../SVG-assets/BannerWithGirlSketch";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

export default function SavedConfs() {
  const [data, setData] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getSaved = async (userID) => {
    try {
      const responce = await api.get("/conferences/like/" + userID);
      console.log(responce.data.data.conferences);
      setData(responce.data.data.conferences);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    getSaved(user?._id);
  }, [user?._id]);

  const noSavedConfs = (
    <div className="text-align-center mt-92">
      <BannerWithGirlSketch className="icon-plshld" />
      <div className="passes-list my-28">
        <h2>You haven't saved any conference</h2>
        <button
          style={{ margin: "2rem 0 6rem 0" }}
          className="button button-primary"
        >
          Explore Trending Conferences
        </button>
      </div>
    </div>
  );

  const savedConfs = (
    <div>
      <h1 className="sc-conf-title">Saved Conferences</h1>
      {data?.map((item) => {
        return (
          <div key={item.conference._id}>
            <SavedConfCard data={item} getSaved={getSaved} />
          </div>
        );
      })}
    </div>
  );

  return data?.length > 0 ? savedConfs : noSavedConfs;
}
