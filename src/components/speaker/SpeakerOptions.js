export default function SpeakerOptions(props) {
  return (
    <div className="register-modal white-modal">
      <div className="modal-form-wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 350,
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <h2>Add Speakers</h2>
            <button
              onClick={() => {
                props.setShowSpeakerForm(true);
                props.setShowSpeakerOptions(false);
              }}
              className="button button-primary mb-16"
            >
              Add a new speaker
            </button>
            <button
              onClick={() => {
                props.setShowSpeakerForm(false);
                props.setShowSpeakerOptions(false);
              }}
              className="button button-green"
            >
              Use existing speaker from assets
            </button>
          </div>
          <div>
            <button
              onClick={() => props.onClose()}
              className="button button-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
