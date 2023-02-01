import "./fileUploader.styles.scss";

export default function FileTitleInput({ onChange, value }) {
  return (
    <div className="file-material-textfield">
      <input
        id="title"
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <label>Add file name for display</label>
    </div>
  );
}
