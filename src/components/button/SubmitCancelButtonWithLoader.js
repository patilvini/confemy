import PropTypes from "prop-types";
import Loader from "../loader/Loader";
import "./button.styles.scss";

export default function SubmitCancelButtonWithLoader({
  isSubmitting,
  onCancel,
  cancelButtonClass,
}) {
  return (
    <section className="submit-cancel-loader-wrap flex-vc">
      <div className="position-relative">
        <button
          style={{
            ...(isSubmitting && {
              backgroundColor: "#c4c4c4",
              borderColor: "#c4c4c4",
            }),
          }}
          type="submit"
          disabled={isSubmitting}
          className="button button-primary"
        >
          {!isSubmitting && "Save and Continue"}
        </button>
        {isSubmitting && <Loader />}
      </div>
      <div>
        <button
          onClick={() => onCancel()}
          type="button"
          className={`ml-8 ${
            cancelButtonClass ? cancelButtonClass : "button button-green"
          }`}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}

SubmitCancelButtonWithLoader.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelButtonClass: PropTypes.string,
};
