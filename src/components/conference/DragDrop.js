import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import './conferDetails2.scss'

export default function DragDrop() {
  const onDrop = useCallback((acceptedFiles) => {
   
    console.log(acceptedFiles)
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="drag-box">
      {
        isDragActive ?
          <p className="dragbox-text">Drop the files here ...</p> :
          <p className="dragbox-text">Drag 'n' drop some files here, or click to select files</p>
      }

      </div>
      
    </div>;
}
