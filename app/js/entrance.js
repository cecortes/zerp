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
  const buttonSave = $("#save-foto");
  const delFoto = $("#del-foto");
  const comboType = $("#combo_type");

  const typePopover = new bootstrap.Popover(comboType, {
    trigger: "manual",
    content: "Debe seleccionar un tipo de foto.",
    placement: "bottom",
    customClass: "custom-popover",
  });

  const picPopover = new bootstrap.Popover(buttonTakeFoto, {
    trigger: "manual",
    content: "Debe tomar una foto.",
    placement: "bottom",
    customClass: "custom-popover",
  });

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

    // Hide popover
    picPopover.hide();
  });

  /* --> Save Foto <-- */
  /* @params: none
  /* @return: void
  /* @Calls: buttonSave click.
  /* @action: Check if type was selected
  /*          Check if the canvas has a pic 
  /*          If all is correct call a function to place the pic in
  /*          place.
  /*          If not, show a user message*/
  function SaveFoto() {
    //Check if the type was selected
    if (comboType.val() == "") {
      // Show a user popover
      console.log("Debe seleccionar un tipo de foto");
      typePopover.show();
      return;
    }

    // Get the src attribute of the image
    let pic = imageFoto.attr("src");

    // Check if the canvas has a pic
    if (pic == "") {
      // Show a pic popover
      picPopover.show();
      return;
    }
  }

  /* --> EventListeners <-- */
  modalCamera.on("shown.bs.modal", () => {
    //alert("Activando la cámara del dispositivo");
    getVideo();
  });

  modalCamera.on("hidden.bs.modal", () => {
    stopVideo();
  });

  buttonSave.on("click", SaveFoto);

  delFoto.on("click", () => {
    // Clear the canvas
    let context = canvas[0].getContext("2d");
    context.clearRect(0, 0, canvas[0].width, canvas[0].height);

    // Clear the image
    imageFoto[0].src = "";
  });

  comboType.on("focus", () => {
    typePopover.hide();
  });

  /* --> On load <-- */
  entranceCore.CheckLoginUser();
  await GetUserName();
  dateField.val(GetCurrentDate());
});
