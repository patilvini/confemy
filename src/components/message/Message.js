import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./message.styles.scss";

function Message({ msg }) {
  if (msg && msg.length > 0) {
    return (
      <div className="message">
        <p className="px-2">{msg}</p>
      </div>
    );
  }
  return <Navigate to="/" replace={true} />;
}

const mapStateToProps = (state) => {
  return {
    msg: state.message.msg,
  };
};

Message.propTypes = {
  msg: PropTypes.string,
};

export default connect(mapStateToProps)(Message);
