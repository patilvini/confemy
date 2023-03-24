import Loader from "../loader/Loader";
import "./button.styles.scss";
import PropTypes from "prop-types";

export default function SubmitButtonWithLoader({
  isSubmitting,
  text,
  className,
  fullWidth,
}) {
  return (
    <div
      className={fullWidth ? "fullwidth-submit-loader" : "submit-loader-wrap"}
    >
      <button
        style={{
          ...(isSubmitting && {
            backgroundColor: "#c4c4c4",
            borderColor: "#c4c4c4",
          }),
        }}
        type="submit"
        disabled={isSubmitting}
        className={className}
      >
        {!isSubmitting && `${text}`}
      </button>
      {isSubmitting && <Loader />}
    </div>
  );
}

SubmitButtonWithLoader.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};
