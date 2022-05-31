import "./dialogue.styles.scss";
import PropTypes from "prop-types";

// JSX to Be added to component
// {open && (
//   <Dialogue
//     msg="You are redirected to conference dashboard where you can manage all conference related activities."
//     title="Organizers Dashboard"
//     closeDialogue={closeDialogue}
//     yesAction={yesAction}
//   />
// )}

// For Dialogue to be added to component

//  const [open, setopen] = useState(false);
//  const openDialogue = () => {
//    setopen(true);
//  };
//  const closeDialogue = () => {
//    setopen(false);
//  };
//  const yesAction = () => {
//    setopen(false);
//  };

export default function Dialogue({ closeDialogue, title, msg, yesAction }) {
  return (
    <div className="dialogue-background">
      <div className="dialogue-container">
        <div className="dialogue-title">
          <h3>{title}</h3>
        </div>
        <div className="dialogue-body">{msg}</div>
        <div className="dialogue-actions">
          <button
            className="button-text button-text-primary"
            onClick={closeDialogue}
          >
            CANCEL
          </button>
          <button
            className="button-text button-text-primary"
            onClick={yesAction}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
}

Dialogue.propTypes = {
  closeDialogue: PropTypes.func.isRequired,
  yesAction: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
  title: PropTypes.string,
};
