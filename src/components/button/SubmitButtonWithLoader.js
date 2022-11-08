import Loader from "../loader/Loader";
import "./button.styles.scss";
export default function SubmitButtonWithLoader({
  isSubmitting,
  text,
  className,
}) {
  return (
    <div className="submit-loader-wrap">
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
