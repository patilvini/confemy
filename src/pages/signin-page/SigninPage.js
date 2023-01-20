import React from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../../components/signin/Signin";
import ModalX from "../../components/modal/ModalX";

const SigninPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      {/* <Modal onDismiss={onDismiss}>
        <Signin />
      </Modal> */}
      <ModalX onDismiss={onDismiss}>
        <Signin />
      </ModalX>
    </section>
  );
};

export default SigninPage;
