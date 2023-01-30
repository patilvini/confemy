import { useState } from "react";
import { useContext } from "react";
import { documentTitleContext } from "./documentTitleContext";

import "./fileUploader.styles.scss";

export default function FileTitleInput({ onChange, value }) {
  //   const [file, setFile] = useState({
  //     title: "",
  //     id: "",
  //   });

  const { document, setDocument } = useContext(documentTitleContext);

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
      <label>Add title to display</label>
    </div>
  );
}
