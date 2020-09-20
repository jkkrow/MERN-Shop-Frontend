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
  }, [selectedFiles]);

  const { onInput, id } = props;
  useEffect(() => {
    onInput(id, validFiles, isValid);
  }, [onInput, id, validFiles, isValid]);

  useEffect(() => {
    if (!validFiles.length) {
      setIsValid(false);
      setPreviewImage(null);
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

  const removeFile = (name) => {
    const newValidFiles = validFiles.filter((e) => e.name !== name);
    const newSelectedFiles = selectedFiles.filter((e) => e.name !== name);
    const newSelectorImages = selectorImages.filter((e) => e.name !== name);
    setValidFiles(newValidFiles);
    setSelectedFiles(newSelectedFiles);
    setSelectorImages(newSelectorImages);
  };

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
      {validFiles.length === 1 && (
        <div
          className="image-upload__selector-delete"
          style={{ textAlign: "center", fontSize: "2rem", cursor: "pointer" }}
          onClick={() => removeFile(validFiles[0].name)}
        >
          x
        </div>
      )}
      {selectorImages.length > 1 && (
        <div className="image-upload__selectors">
          {selectorImages.map((file) => (
            <div key={file.name} className="image-upload__selector">
              <img
                src={file.data}
                alt={file.name}
                onClick={() => setPreviewImage(file.data)}
              />
              <div
                className="image-upload__selector-delete"
                onClick={() => removeFile(file.name)}
              >
                x
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
