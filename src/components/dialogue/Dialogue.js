import "./dialogue.styles.scss";

export default function Dialogue({ closeDialogue }) {
  return (
    <div className="dialogue-background">
      <div className="dialogue-container">
        <div>
          <button onClick={closeDialogue}>X</button>
        </div>
        <div className="dialogue-title">
          <h4>Title</h4>
        </div>
        <div className="dialogue-body">Message Goes Here</div>
        <div className="dialogue-actions">
          <button onClick={closeDialogue}>Cancel</button>
          <button>Ok</button>
        </div>
      </div>
    </div>
  );
}
