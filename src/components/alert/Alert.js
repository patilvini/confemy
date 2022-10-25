import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./alert.styles.scss";
import CancelIcon from "../icons/CancelIcon";
import CloseIcon from "../icons/CloseIcon";

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((e) => (
    <div className="alert-container" key={e.id}>
      <div className={`alert caption-1-medium-cblack alert-${e.alertType}`}>
        <div
          style={{
            color: "#fff",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <CancelIcon className="mr-8" /> */}
          {e.msg}
        </div>
        <CloseIcon className="icone-size" fill="#fff" />
      </div>
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
