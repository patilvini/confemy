import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import MessagePage from "../../pages/message-page/MessagePage";
import { messageAction } from "../../redux/message/messageAction";

const VerifyEmail = ({ messageAction }) => {
  let { secret } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "POST",
      data: { secret },
      withCredentials: true,
      url: "http://localhost:5000/api/verify-email",
    })
      .then((response) => {
        const { msg } = response.data;
        messageAction(msg);
        setLoading(false);
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => messageAction(error.msg));
        }
        setLoading(false);
      });
  }, [messageAction, secret]);

  return <Fragment>{loading ? <Spinner /> : <MessagePage />}</Fragment>;
};

VerifyEmail.propTypes = {
  messageAction: PropTypes.func.isRequired,
};

export default connect(null, { messageAction })(VerifyEmail);
