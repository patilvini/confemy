import React from "react";
import { useNavigate } from "react-router-dom";
import ModalX from "../../components/modal/ModalX";
import ResetPassword from "../../components/reset-password/ResetPassword";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      <ModalX onDismiss={onDismiss}>
        <ResetPassword />
      </ModalX>
    </section>
  );
};

export default ResetPasswordPage;
