import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../../components/register/Register";
import Modal from "../../components/modal/Modal";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      <Modal onDismiss={onDismiss}>
        <Register />
      </Modal>
    </section>
  );
};

export default RegisterPage;
