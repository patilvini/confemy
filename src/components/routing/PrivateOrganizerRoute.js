import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";

const PrivateOrganizerRoute = ({
  component: Component,
  auth: { isLoading, user },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <Spinner />
        ) : user && user.accountType === "organizer" ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace={true} />
        )
      }
    />
  );
};

PrivateOrganizerRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateOrganizerRoute);
