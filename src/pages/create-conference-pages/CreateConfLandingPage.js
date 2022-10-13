import { replace } from "formik";
import { useNavigate } from "react-router-dom";

export default function CreateConfLandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-40 body-regular-gray3">
        <h2 className="mb-32">Read before proceeding</h2>
        <p className="mb-16">
          First create Step 1 and click next button to save data before creating
          other steps.
        </p>
        <p className="mb-16">
          After Step 1 is created, any other step can be added and data can be
          saved on clicking next button. One can come back to complete remaining
          steps later.
        </p>
        <p className="mb-16">
          Incomplete conferences will show up below as well as in My Conferences
          tab. Click on incomplete conference heading to finish all steps before
          publishing the conference.
        </p>
        <p className="mb-16">One can not publish incomplete conferences.</p>
      </div>
      <button
        onClick={() => navigate("/dashboard/create-conf/step-1")}
        className="button button-primary"
      >
        Proceed to create new conference
      </button>
      <div className="mt-32">
        <h2>Incomplete Conferences</h2>
      </div>
    </div>
  );
}
