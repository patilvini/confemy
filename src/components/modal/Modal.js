import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// JSX to Be added to component
// {open && (
//   <Modal
//     onDismiss
//   >
//    <ComponentToBeShown/>
//   </Modal>
// )}

// For Modal to be added to component

//  const [open, setopen] = useState(false);
//  const openModal = () => {
//    setopen(true);
//  };
//  const closeModal = () => {
//    setopen(false);
//  };

//  If onDismiss is not provided, modal does not close on clicking on outside.
//  In that case provide closeModal function to a close button

//  const onDismiss = () => {
//    setopen(false);
//    if you want to do something else on closing modal
//  };

function Modal(props) {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="modal-background">
      <div onClick={(e) => e.stopPropagation()} className="modal-body">
        {props.children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default Modal;

Modal.propTypes = {
  onDismiss: PropTypes.func,
};
