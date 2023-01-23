import React from "react";
import { useNavigate } from "react-router-dom";
import ModalX from "../../components/modal/ModalX";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const onDismiss = () => navigate("/");
  return (
    <section className="container">
      <ModalX onDismiss={onDismiss}>
        <ResetPasswordForm />
      </ModalX>
    </section>
  );
};

export default ResetPasswordPage;
