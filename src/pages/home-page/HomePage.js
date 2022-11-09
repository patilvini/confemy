import React from "react";
import Hero from "../../components/hero/Hero";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import HostYourConfs from "../../components/host-your-confs/HostYourConfs";
import ExploreConfs from "../../components/explore-confs/ExploreConfs";
import RecentlyViewedConfs from "../../components/recently-viewed-conf/RecentlyViewedConfs";
import OnlineConfs from "../../components/online-confs/OnlineConfs";
import TrendingConfs from "../../components/recently-viewed-conf/TrendingConfs";
import { useSelector } from "react-redux";

function HomePage() {
  const userID = useSelector((state) => state.auth.user?._id);
  return (
    <main className="container">
      <Hero />
      <HowItWorks />
      <ExploreConfs />
      {userID && <RecentlyViewedConfs />}
      <TrendingConfs />
      <OnlineConfs />
      <HostYourConfs />
    </main>
  );
}

export default HomePage;
