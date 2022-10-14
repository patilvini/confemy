import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./alert.styles.scss";

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((e) => (
    <div key={e.id} className={`alert body-regular-gray3 alert-${e.alertType}`}>
      {e.msg}
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
