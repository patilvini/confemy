import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";

const PrivateAttendeeRoute = ({
  component: Component,
  auth: { user, isLoading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoading ? (
        <Spinner />
      ) : user && user.accountType === "attendee" ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" replace={true} />
      )
    }
  />
);

PrivateAttendeeRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateAttendeeRoute);
