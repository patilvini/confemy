import ReactDOM from "react-dom";

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
