import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./alert.styles.scss";
import CloseIcon from "../icons/CloseIcon";
import ErrorIcon from "../icons/ErrorIcon";
import SuccessTickIcon from "../icons/SuccessTickIcon";
import { REMOVE_ALERT } from "../../redux/alert/alertTypes";

const Alert = ({ alert }) => {
  const dispatch = useDispatch();
  const removeAlert = (id) => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  };

  const renderIcon = (alertType) => {
    switch (alertType) {
      case "danger":
        return <ErrorIcon className="icon-sm" fill="#fff" />;
      case "success":
        return <SuccessTickIcon className="icon-sm" fill="#fff" />;

      default:
        return null;
    }
  };

  return (
    alert !== null &&
    alert.length > 0 &&
    alert.map((e) => (
      <div className="alert-container" key={e.id}>
        <div className={`alert alert-${e.alertType}`}>
          <div className="flex-vc">
            <i className="mr-24">{renderIcon(e.alertType)}</i>
            {e.msg}
          </div>
          <i className="ml-24" onClick={() => removeAlert(e.id)}>
            <CloseIcon className="icon-sm" fill="#fff" />
          </i>
        </div>
      </div>
    ))
  );
};

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
