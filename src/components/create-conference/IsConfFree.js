export default function IsConfFree({ formik }) {
  return (
    <>
      <h4 className="mb-32">Is it a free conference ?</h4>{" "}
      <div>
        <input
          type="checkbox"
          style={{ display: "none" }}
          id="isFree"
          name="isFree"
          value="isFree"
          checked={formik.values.isFree}
          onChange={(e) => {
            formik.handleChange(e);
          }}
        />
        <label htmlFor="isFree">
          <div
            className={`mr-20 ${
              formik.values.isFree
                ? "button-outlined-active"
                : "button-outlined-inactive"
            }`}
          >
            Yes
          </div>
        </label>
        <div
          className={`mr-20 ${
            formik.values.isFree
              ? "button-outlined-inactive"
              : "button-outlined-active"
          }`}
          onClick={() => {
            formik.setFieldValue("isFree", !formik.values.isFree);
          }}
        >
          No
        </div>
      </div>
    </>
  );
}
