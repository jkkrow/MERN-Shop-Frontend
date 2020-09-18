import React, { useRef, useState, useEffect, useCallback } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [selectorImages, setSelectorImages] = useState([]);

  const readFile = useCallback(() => {
    const arr = [];
    for (const file of validFiles) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        arr.push({ name: file.name, data: fileReader.result });
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
    setSelectorImages(arr);
  }, [validFiles]);

  const { onInput, id } = props;
  useEffect(() => {
    const filteredFiles = selectedFiles.reduce((acc, current) => {
      const duplicatedFile = acc.find((file) => file.name === current.name);
      if (!duplicatedFile) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles(filteredFiles);

    onInput(id, filteredFiles, isValid);
  }, [onInput, id, isValid, selectedFiles]);

  useEffect(() => {
    if (!validFiles.length) {
      return;
    }
    readFile();
  }, [validFiles, readFile]);

  const filePickerClicked = () => {
    filePickerRef.current.click();
  };

  const filePickerHandler = () => {
    if (filePickerRef.current.files.length) {
      handleFiles(filePickerRef.current.files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      setSelectedFiles((prevFiles) => [...prevFiles, files[i]]);
    }
    setIsValid(true);
  };

  let selector;
  if (validFiles.length > 1 && selectorImages.length !== 0) {
    selector = (
      <div className="image-upload__selectors">
        {selectorImages.map((file) => (
          <div
            key={file.name}
            className="image-upload__selector"
            onClick={() => setPreviewImage(file.data)}
          >
            <img src={file.data} alt={file.name} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        multiple
        accept=".jpg, .png, .jpeg"
        onChange={filePickerHandler}
      />
      <div className={`image-upload ${props.type}`} onClick={filePickerClicked}>
        <div className="image-upload__preview">
          {previewImage && <img src={previewImage} alt="Preview" />}
          {props.type === "profile"
            ? !previewImage && <p>Click to choose an image</p>
            : !previewImage && <p>Click to choose images</p>}
        </div>
      </div>
      {selector}
    </div>
  );
};

export default ImageUpload;
