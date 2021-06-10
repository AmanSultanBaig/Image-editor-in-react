import "./ImageEditor.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Slider } from "antd";

import { ReactSketchCanvas } from "react-sketch-canvas";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const ImageEditor = () => {
  const classes = useStyles();

  const [IsErase, setIsErase] = useState(false);
  const [ImagePath, setImagePath] = useState(null);
  const [color, setColor] = useState("#ff0000");
  const [size, setSize] = useState(5);
  const [sketchTime, setSketchTime] = useState(0);
  const [imageBase64, setImageBase64] = useState(null);
  const [base64IsGenerate, setBase64IsGenerate] = useState(false);

  const imageHandler = (e) => {
    let path = URL.createObjectURL(e.target.files[0]);
    setImagePath(path);
  };

  let canvas = useRef();

  const eraseEnable = () => {
    setIsErase(true);
    canvas.current.eraseMode(true);
  };

  const brushEnable = () => {
    setIsErase(false);
    canvas.current.eraseMode(false);
  };

  const selectBrushColor = (e) => {
    setColor(e.target.value);
  };

  const SizeHandle = (value) => {
    setSize(value);
  };

  const generateBase64 = () => {
    canvas.current
      .exportImage("png")
      .then((data) => {
        setImageBase64(data);
        setBase64IsGenerate(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setInterval(() => {
      canvas.current
        .getSketchingTime()
        .then((data) => {
          setSketchTime(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 1000);
  });

  let imageSrc = `center / contain no-repeat url(${ImagePath})`;

  return (
    <>
      {/* ////////////////////////////////////////// */}
      <div id="container"></div>
      {/* ////////////////////////////////////////////////// */}

      <div
        style={{
          height: "80px",
          width: "100%",
          backgroundColor: "lightgray",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "60%",
            alignItems: "center",
            paddingLeft: "20px",
            paddingTop: "15px",
          }}
        >
          <Button
            onClick={eraseEnable}
            variant="contained"
            disabled={IsErase === true}
          >
            Erase
          </Button>
          &nbsp;
          <Button
            onClick={brushEnable}
            variant="contained"
            disabled={IsErase === false}
          >
            Brush
          </Button>
          &nbsp;
          <Button onClick={() => canvas.current.undo()} variant="contained">
            Undo
          </Button>
          &nbsp;
          <Button onClick={() => canvas.current.redo()} variant="contained">
            Redo
          </Button>
          &nbsp;
          {IsErase === false ? (
            <>
              <input type="color" onChange={selectBrushColor} value={color} />
            </>
          ) : null}
          &nbsp;
          <Slider
            style={{ width: "15rem" }}
            defaultValue={size}
            onChange={SizeHandle}
          />
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "10px",
          }}
        >
          <Button
            disabled={sketchTime === 0 && !ImagePath}
            variant="contained"
            onClick={generateBase64}
          >
            Generate Image
          </Button>
          &nbsp; &nbsp;
          {base64IsGenerate === true ? (
            <a href={imageBase64} download variant="contained">
              Download Image
            </a>
          ) : null}
          &nbsp; &nbsp;
          <input
            accept="image/*"
            onChange={imageHandler}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "850px",
          alignItems: "center",
        }}
      >
        <div>
          <ReactSketchCanvas
            style={styles}
            ref={canvas}
            width="100rem"
            height="40rem"
            strokeWidth={size}
            eraserWidth={size}
            strokeColor={color}
            canvasColor="#d3d3d3"
            background={imageSrc}
            withTimestamp={true}
          />
          {/* <img height="500px" width="600px" src={profileImg} alt={profileImg} /> */}
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
