"use strict";

// Importing modules
import * as entranceCore from "./entranceCore.js";

// Ready function
$(async function () {
  /* --> DOM Elements <-- */
  const usernameField = $("#username");
  const dateField = $("#date");
  const modalCamera = $("#modal-camera");
  const video = $("#video");
  const canvas = $("#canvas");
  const buttonTakeFoto = $("#take-foto");
  const imageFoto = $("#foto");

  /* --> GlobalVars <-- */
  let userId = "";
  let userName = "";
  let userMail = "";

  /* --> GetCurrentDate <-- */
  /* @params: none
  /* @return: string
  /* @action: Get the current date */
  function GetCurrentDate() {
    // Get the current date
    let date = new Date();

    // Get the current date in the format "dd/mm/yyyy"
    let currentDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    // Add 0 to the day if it's less than 10
    if (date.getDate() < 10) {
      currentDate = "0" + currentDate;
    }

    // Add 0 to the month if it's less than 10
    if (date.getMonth() < 10) {
      currentDate = currentDate.slice(0, 3) + "0" + currentDate.slice(3);
    }

    // Return the current date
    return currentDate;
  }

  /* --> GetUserName <-- */
  /* @params: none
  /* @return: void
  /* @Calls: entranceCore.
  /* @action: Get the user name of the current user,
  /*          and fill the textbox */
  async function GetUserName() {
    // Get the user name of the current user
    let user = await entranceCore.GetUserData();

    // Kept in GlobalVars
    userId = user.userId;
    userName = user.userName;
    userMail = user.userMail;

    // Fill the textbox
    usernameField.val(userName);
  }

  /* --> Video Config and Constrains <-- */
  const constraints = {
    video: { width: 480, height: 320, facingMode: "environment" },
    audio: false,
  };

  /* --> Acceso al Stream <-- */
  const getVideo = async () => {
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video[0].srcObject = stream;
        video[0].play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /* --> Stop Video <-- */
  const stopVideo = () => {
    let stream = video[0].srcObject;
    let tracks = stream.getTracks();

    video[0].pause();

    tracks.forEach((track) => {
      track.stop();
    });

    video[0].srcObject = null;
  };

  /* --> Take Foto <-- */
  buttonTakeFoto.on("click", () => {
    // Get the context of the canvas
    let context = canvas[0].getContext("2d");

    // Set the width and height of the canvas
    canvas[0].width = video[0].videoWidth;
    canvas[0].height = video[0].videoHeight;

    // Draw the image in the canvas
    context.drawImage(video[0], 0, 0, canvas[0].width, canvas[0].height);

    // Get the data of the canvas
    let data = canvas[0].toDataURL("image/png");

    // Set the data in the image
    imageFoto[0].src = data;

    // Stop the video
    //stopVideo();
  });

  /* --> EventListeners <-- */
  modalCamera.on("shown.bs.modal", () => {
    //alert("Activando la cámara del dispositivo");
    getVideo();
  });

  modalCamera.on("hidden.bs.modal", () => {
    stopVideo();
  });

  /* --> On load <-- */
  entranceCore.CheckLoginUser();
  await GetUserName();
  dateField.val(GetCurrentDate());
});
