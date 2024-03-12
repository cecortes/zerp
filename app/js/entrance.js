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
  const delFormato1 = $("#del-formato1");
  const delFormato2 = $("#del-formato2");
  const delFormato3 = $("#del-formato3");
  const delFormato4 = $("#del-formato4");
  const delPallet1 = $("#del-pallet1");
  const delPallet2 = $("#del-pallet2");
  const delPallet3 = $("#del-pallet3");
  const delPallet4 = $("#del-pallet4");
  const delPallet5 = $("#del-pallet5");
  const delPallet6 = $("#del-pallet6");
  const delPallet7 = $("#del-pallet7");
  const delPallet8 = $("#del-pallet8");
  const delPallet9 = $("#del-pallet9");
  const delIncidencia1 = $("#del-incidencia1");
  const delIncidencia2 = $("#del-incidencia2");
  const delIncidencia3 = $("#del-incidencia3");

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

  const formatoOk = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "Imágen guardada en Formatos.",
    placement: "top",
    customClass: "custom-popover2",
  });

  const formatoError = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "No hay más espacio en Formatos.",
    placement: "top",
    customClass: "error-popover",
  });

  const palletOk = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "Imágen guardada en Pallets.",
    placement: "top",
    customClass: "custom-popover2",
  });

  const palletError = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "No hay más espacio en Pallets.",
    placement: "top",
    customClass: "error-popover",
  });

  const incidenciaOk = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "Imágen guardada en Incidencias.",
    placement: "top",
    customClass: "custom-popover2",
  });

  const incidenciaError = new bootstrap.Popover(canvas, {
    trigger: "manual",
    content: "No hay más espacio en Incidencias.",
    placement: "top",
    customClass: "error-popover",
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
    // Set the comboType to initial option
    comboType.prop("selectedIndex", 0);
    buttonTakeFoto.prop("disabled", true);

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

  /* --> ClearCanvas <-- */
  /* @params: none
  /* @return: void
  /* @Calls: buttonClear click & PlaceFoto.
  /* @action: Clear the canvas */
  function ClearCanvas() {
    // Get the context of the canvas
    let context = canvas[0].getContext("2d");

    // Clear the canvas
    context.clearRect(0, 0, canvas[0].width, canvas[0].height);

    // Clear the image
    imageFoto[0].src = "";
  }

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

    // Call a function to place the pic in place
    PlaceFoto();
  }

  /* --> Place Foto <-- */
  /* @params: none
  /* @return: void
  /* @Calls: SaveFoto.
  /* @action: Check the type of the pic.
  /*          Iterate over the img elements,
  /*          and place the pic in the correct place */
  function PlaceFoto() {
    // Locals
    let flgFormato = false;
    let flgPallet = false;
    let flgIncidencia = false;

    // Get the type of the pic
    let type = comboType.val();

    // If the type is "formato"
    if (type == "formato") {
      // Iterate over the formato img elements
      for (let i = 1; i <= 4; i++) {
        // Get the src attribute
        let src = $(`#formato${i}`).attr("src");

        // If the src is empty
        if (src === "../assets/bg.jpg") {
          flgFormato = true;
          // Set the src attribute
          $(`#formato${i}`).attr("src", imageFoto[0].src);
          // Enable the delete button
          $(`#del-formato${i}`).prop("disabled", false);
          break;
        }
      }

      if (!flgFormato) {
        // Show a error popover
        formatoError.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          formatoError.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      } else {
        // Show a Ok popover
        formatoOk.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          formatoOk.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      }
    } else if (type == "pallet") {
      // Iterate over the pallet img elements
      for (let i = 1; i <= 9; i++) {
        // Get the src attribute
        let src = $(`#pallet${i}`).attr("src");

        // If the src is empty
        if (src === "../assets/bg.jpg") {
          flgPallet = true;
          // Set the src attribute
          $(`#pallet${i}`).attr("src", imageFoto[0].src);
          // Enable the delete button
          $(`#del-pallet${i}`).prop("disabled", false);
          break;
        }
      }

      if (!flgPallet) {
        // Show a error popover
        palletError.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          palletError.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      } else {
        // Show a Ok popover
        palletOk.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          palletOk.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      }
    } else if (type == "incidencia") {
      // Iterate over the incidencia img elements
      for (let i = 1; i <= 3; i++) {
        // Get the src attribute
        let src = $(`#incidencia${i}`).attr("src");

        // If the src is empty
        if (src === "../assets/bg.jpg") {
          flgIncidencia = true;
          // Set the src attribute
          $(`#incidencia${i}`).attr("src", imageFoto[0].src);
          // Enable the delete button
          $(`#del-incidencia${i}`).prop("disabled", false);
          break;
        }
      }

      if (!flgIncidencia) {
        // Show a error popover
        incidenciaError.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          incidenciaError.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      } else {
        // Show a Ok popover
        incidenciaOk.show();

        // Delay 1.5 seconds
        setTimeout(() => {
          incidenciaOk.hide();
          // Clear the canvas
          ClearCanvas();
        }, 1500);
      }
    }
  }

  /* --> DisableDelButtons <-- */
  /* @params: none
  /* @return: void
  /* @Calls: On load function.
  /* @action: Disable the delete buttons */
  function DisableDelButtons() {
    for (let i = 1; i <= 4; i++) {
      $(`#del-formato${i}`).prop("disabled", true);
    }

    for (let i = 1; i <= 9; i++) {
      $(`#del-pallet${i}`).prop("disabled", true);
    }

    for (let i = 1; i <= 3; i++) {
      $(`#del-incidencia${i}`).prop("disabled", true);
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

  delFoto.on("click", ClearCanvas);

  comboType.on("focus", () => {
    typePopover.hide();
  });

  comboType.on("change", () => {
    if (comboType.val() != "") {
      buttonTakeFoto.prop("disabled", false);
    } else {
      buttonTakeFoto.prop("disabled", true);
    }
  });

  delFormato1.on("click", () => {
    $("#formato1").attr("src", "../assets/bg.jpg");
    delFormato1.prop("disabled", true);
  });

  delFormato2.on("click", () => {
    $("#formato2").attr("src", "../assets/bg.jpg");
    delFormato2.prop("disabled", true);
  });

  delFormato3.on("click", () => {
    $("#formato3").attr("src", "../assets/bg.jpg");
    delFormato3.prop("disabled", true);
  });

  delFormato4.on("click", () => {
    $("#formato4").attr("src", "../assets/bg.jpg");
    delFormato4.prop("disabled", true);
  });

  delPallet1.on("click", () => {
    $("#pallet1").attr("src", "../assets/bg.jpg");
    delPallet1.prop("disabled", true);
  });

  delPallet2.on("click", () => {
    $("#pallet2").attr("src", "../assets/bg.jpg");
    delPallet2.prop("disabled", true);
  });

  delPallet3.on("click", () => {
    $("#pallet3").attr("src", "../assets/bg.jpg");
    delPallet3.prop("disabled", true);
  });

  delPallet4.on("click", () => {
    $("#pallet4").attr("src", "../assets/bg.jpg");
    delPallet4.prop("disabled", true);
  });

  delPallet5.on("click", () => {
    $("#pallet5").attr("src", "../assets/bg.jpg");
    delPallet5.prop("disabled", true);
  });

  delPallet6.on("click", () => {
    $("#pallet6").attr("src", "../assets/bg.jpg");
    delPallet6.prop("disabled", true);
  });

  delPallet7.on("click", () => {
    $("#pallet7").attr("src", "../assets/bg.jpg");
    delPallet7.prop("disabled", true);
  });

  delPallet8.on("click", () => {
    $("#pallet8").attr("src", "../assets/bg.jpg");
    delPallet8.prop("disabled", true);
  });

  delPallet9.on("click", () => {
    $("#pallet9").attr("src", "../assets/bg.jpg");
    delPallet9.prop("disabled", true);
  });

  delIncidencia1.on("click", () => {
    $("#incidencia1").attr("src", "../assets/bg.jpg");
    delIncidencia1.prop("disabled", true);
  });

  delIncidencia2.on("click", () => {
    $("#incidencia2").attr("src", "../assets/bg.jpg");
    delIncidencia2.prop("disabled", true);
  });

  delIncidencia3.on("click", () => {
    $("#incidencia3").attr("src", "../assets/bg.jpg");
    delIncidencia3.prop("disabled", true);
  });

  /* --> On load <-- */
  entranceCore.CheckLoginUser();
  await GetUserName();
  dateField.val(GetCurrentDate());
  buttonTakeFoto.prop("disabled", true);
  DisableDelButtons();
});
