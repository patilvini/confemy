import Image from "./Image";
import "./dragAndDrop.styles.scss";

const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image image={image} />;
  };

  return <div className="dnd-container">{images.map(show)}</div>;
};

export default ShowImage;
