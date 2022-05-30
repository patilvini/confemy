import Message from "../message/Message";

function RegistrationSuccess({ msg }) {
  console.log("from registration success", msg);
  return <div style={{ fontSize: 18 }}>{msg}</div>;
}

export default RegistrationSuccess;
