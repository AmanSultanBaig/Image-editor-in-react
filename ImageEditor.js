import "./ImageEditor.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

  const [profileImg, setProfileImg] = React.useState(
    "https://lh3.googleusercontent.com/APENohQzs7YdTuY6fVUgptT7FLwCVqKj26oMNaeI-QuZefFQydgYtyt0Mes798DOVhuUKMIQKtL3Ic8ffQL6dBvB-Q=s2048"
  );

  const [IsErase, setIsErase] = useState(false);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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

  return (
    <>
      {/* ////////////////////////////////////////// */}
      <div id="container"></div>
      {/* ////////////////////////////////////////////////// */}

      <div
        style={{
          height: "60px",
          width: "100%",
          backgroundColor: "lightgray",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "60px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
          }}
        >
          <Button
            onClick={eraseEnable}
            variant="contained"
            disabled={IsErase == true}
          >
            Erase
          </Button>
          &nbsp;
          <Button
            onClick={brushEnable}
            variant="contained"
            disabled={IsErase == false}
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
          <input
            accept="image/*"
            onChange={(e) => imageHandler(e)}
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
            strokeWidth={14}
            eraserWidth={14}
            strokeColor="blue"
            canvasColor="#d3d3d3"
            background="no-repeat url(https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_630,w_1200,f_auto,q_auto/1303340/269612_158819.png)"
          />
          {/* <img height="500px" width="600px" src={profileImg} alt={profileImg} /> */}
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
