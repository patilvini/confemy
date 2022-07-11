import React from "react";
import "./dragAndDrop.styles.scss";

function Image({ image }) {
  return (
    <div>
      <img alt="" src={image.src} />
    </div>
  );
}

export default Image;
