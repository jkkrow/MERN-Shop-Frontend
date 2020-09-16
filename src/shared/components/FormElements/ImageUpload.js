import React, { useRef, useState, useEffect, useCallback } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [previewImage, setPreviewImage] = useState();

  const filePickerRef = useRef();

  const readFile = useCallback(
    (file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file ? file : files[0]);
    },
    [files]
  );

  useEffect(() => {
    if (files.length === 0) {
      return;
    }
    readFile();
  }, [files, readFile]);

  const filePickerHandler = (event) => {
    let pickedFiles = files;
    let fileIsValid = isValid;
    if (files.length === 0) {
      // first pick
      if (event.target.files.length !== 0 && event.target.files.length <= 10) {
        pickedFiles = [...event.target.files];
        fileIsValid = true;
        setFiles(pickedFiles);
        setIsValid(fileIsValid);
      } else {
        fileIsValid = false;
        setIsValid(fileIsValid);
      }
    } else {
      //after first pick
      if (event.target.files.length !== 0 && event.target.files.length <= 10) {
        pickedFiles = [...event.target.files];
        fileIsValid = true;
        setFiles(pickedFiles);
        setIsValid(fileIsValid);
      } else if (event.target.files.length > 10) {
        pickedFiles = [];
        fileIsValid = false;
        setFiles(pickedFiles);
        setIsValid(fileIsValid);
        setPreviewImage(null);
      } else {
        pickedFiles = files;
        fileIsValid = true;
      }
    }
    setIsTouched(true);
    props.onInput(props.id, pickedFiles, fileIsValid);
  };

  let selector;
  if (files.length > 1) {
    selector = (
      <div className="image-upload__selectors">
        {files.map((file) => (
          <div
            key={file.name}
            className="image-upload__selector"
            onClick={() => readFile(file)}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        ref={filePickerRef}
        type="file"
        multiple
        accept=".jpg, .png, .jpeg"
        onChange={filePickerHandler}
      />
      <div className={`image-upload ${props.type}`}>
        <div className="image-upload__preview">
          {previewImage && <img src={previewImage} alt="Preview" />}
          {props.type === "profile"
            ? !previewImage && <p>Pick an image</p>
            : !previewImage && <p>Pick images up to 10</p>}
        </div>
      </div>
      {selector}
    </div>
  );
};

export default ImageUpload;
