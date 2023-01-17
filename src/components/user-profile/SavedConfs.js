import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SavedConfCard from "./SavedConfCard";
import BannerWithGirlSketch from "../SVG-assets/BannerWithGirlSketch";
import Loader from "../loader/Loader";

import api from "../../utility/api";
import { alertAction } from "../../redux/alert/alertAction";

import "./savedconfs.styles.scss";

export default function SavedConfs() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getSaved = async (userID) => {
    try {
      const responce = await api.get("/conferences/like/" + userID);
      console.log(responce.data.data.conferences);
      setData(responce.data.data.conferences);
      setIsLoading(false);
    } catch (err) {
      dispatch(alertAction(err.response.data.message, "danger"));
    }
  };

  useEffect(() => {
    getSaved(user?._id);
  }, [user?._id]);

  const noSavedConfs = (
    <div>
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
    <>
      <h1 className="mb-40">Saved Conferences</h1>
      {data?.map((item) => {
        return (
          <div className="mb-12" key={item.conference._id}>
            <SavedConfCard data={item} getSaved={getSaved} />
          </div>
        );
      })}
    </>
  );

  return (
    <div className="savedconfs-container">
      {isLoading ? <Loader /> : data?.length > 0 ? savedConfs : noSavedConfs}
    </div>
  );
}
