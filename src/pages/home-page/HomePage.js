import React from 'react';
import Hero from '../../components/hero/Hero';
import HowItWorks from '../../components/how-it-works/HowItWorks';
import HostYourConfs from '../../components/host-your-confs/HostYourConfs';
import ExploreConfs from '../../components/explore-confs/ExploreConfs';
import RecentlyViewedConfs from '../../components/recently-viewed-conf/RecentlyViewedConfs';
import OnlineConfs from '../../components/online-confs/OnlineConfs';

function HomePage() {
  return (
    <main className='container'>
      <Hero />
      <HowItWorks />
      <ExploreConfs />
      <RecentlyViewedConfs />
      <OnlineConfs />
      <HostYourConfs />
    </main>
  );
}

export default HomePage;
