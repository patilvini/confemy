import React from "react";

const TabContent = ({ tabs }) => {
  return (
    <div>
      {Object.entries(tabs).map((tab) => (
        <div key={tab[0]}>{tab[1].content}</div>
      ))}
    </div>
  );
};

export default TabContent;
