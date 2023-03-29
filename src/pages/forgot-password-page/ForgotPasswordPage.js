import React from "react";
import { useNavigate } from "react-router-dom";
import ModalX from "../../components/modal/ModalX";
import ForgotPassword from "../../components/forgot-password/ForgotPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      <ModalX onDismiss={onDismiss}>
        <ForgotPassword />
      </ModalX>
    </section>
  );
};

export default ForgotPasswordPage;
