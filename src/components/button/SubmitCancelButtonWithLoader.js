import Loader from "../loader/Loader";
import "./button.styles.scss";
export default function SubmitCancelButtonWithLoader({ isSubmitting }) {
  return (
    <section className="submit-cancel-loader-wrap flex-vc">
      <div>
        <button type="button" className="button button-green mr-8">
          Cancel
        </button>
      </div>
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
    </section>
  );
}
