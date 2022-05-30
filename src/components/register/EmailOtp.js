import TextInput from "../formik/TextInput";

export default function EmailOtp() {
  return (
    <>
      <div className="input-container">
        <TextInput
          name="emailOtp"
          type="text"
          placeholder="Enter OTP sent to email"
          autoComplete="off"
        />
      </div>
    </>
  );
}
