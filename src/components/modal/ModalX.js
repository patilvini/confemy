import PropTypes from "prop-types";
import CloseIcon from "../icons/CloseIcon";

function ModalX(props) {
  return (
    <div className="modal-background">
      <div className="modalx-body">
        <div className="modalx-header">
          <i onClick={props.onDismiss}>
            <CloseIcon className="icon-size" fill="#c4c4c4" />
          </i>
        </div>
        <div className="modalx-content">{props.children}</div>
      </div>
    </div>
  );
}

export default ModalX;

ModalX.propTypes = {
  onDismiss: PropTypes.func,
};
