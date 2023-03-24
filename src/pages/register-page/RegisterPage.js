import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../../components/register/Register";
import ModalX from "../../components/modal/ModalX";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      {/* <Modal onDismiss={onDismiss}>
        <Register />
      </Modal> */}
      <ModalX onDismiss={onDismiss}>
        <Register />
      </ModalX>
    </section>
  );
};

export default RegisterPage;
