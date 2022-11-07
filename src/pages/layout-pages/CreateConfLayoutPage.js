import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ConfSteps from "../../components/create-conference/ConfSteps";
import Modal from "../../components/modal/Modal";
import { removeConferenceStateAction } from "../../redux/conference/conferenceAction";

export default function CreateConfLayoutPage() {
  const [skip, setskip] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDismiss = () => {
    setskip(true);
  };

  const onSetupOrganizationClick = () => {
    navigate("/dashboard/create-organization");
  };

  useEffect(() => {
    return () => {
      dispatch(removeConferenceStateAction());
      console.log("Removed new conference from redux");
    };
  }, []);

  if (!user?.hasOrganization && !skip) {
    return (
      <>
        <Modal>
          <div className="white-modal" style={{ width: "500px" }}>
            <div className="modal-form-wrapper">
              <h2>Create Organization </h2>
              <p className="body-regular-gray3">
                We recommend you to host conferences under your organization
                name. Set up your organization before creating a conference.
              </p>
              <p className="body-regular-gray3 mt-16">
                Skip to host it under your name.
              </p>
              <button
                onClick={onSetupOrganizationClick}
                className="button button-primary mt-40"
              >
                Setup organization now
              </button>
              <button
                onClick={onDismiss}
                className="button-text button-text-primary mt-16"
              >
                Skip for now
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className="ml-32">
      <ConfSteps />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
