import React from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../../components/signin/Signin";
import Modal from "../../components/modal/Modal";

const SigninPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      <Modal onDismiss={onDismiss}>
        <Signin />
      </Modal>
    </section>
  );
};

export default SigninPage;
