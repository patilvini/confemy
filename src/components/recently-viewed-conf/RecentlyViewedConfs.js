import React from 'react';
import ConfCard from '../conf-card/ConfCard';
import './recentlyViewedConfs.styles.scss';

function RecentlyViewedConfs() {
  return (
    <section className='bg-background conf-display recently-viewed-confs'>
      <div>
        <h2>Recently Viewed</h2>
        <div className=' grid-col-4 conf-display-grid'>
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
          <div>
            <ConfCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentlyViewedConfs;
