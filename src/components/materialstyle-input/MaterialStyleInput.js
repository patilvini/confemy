import "./materialStyleInput.styles.scss";

export default function MaterialStyleInput() {
  return (
    <>
      <div className="material-textfield">
        <input
          // onChange={mobileChangeHandler}
          // onBlur={mobileBlurHandler}
          placeholder=" "
          type="text"
        />
        <label>Mobile</label>
      </div>
    </>
  );
}
