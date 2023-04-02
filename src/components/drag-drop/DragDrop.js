import { useState } from "react";
import Dropzone from "react-dropzone";

export default function DragDrop(props) {
  const [file, setFile] = useState([]);

  return (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => {
          acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("aborted");
            reader.onerror = () => console.log("error");
            reader.onload = () => {
              const binaryStr = reader.result;

              console.log(binaryStr);
            };
            reader.readAsArrayBuffer(file);
          });
          setFile(acceptedFiles[0].name);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="drag-box" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>

      {/* <img src="" class="preview" height="200" alt="Image preview..."></img> */}
      {file}
    </div>
  );
}
