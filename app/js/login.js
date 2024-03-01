"use strict";

// Importing modules
import * as loginCore from "./loginCore.js";

// Ready function
$(function () {
  /* --> DOM Elements <-- */
  const userInput = $("#user_in");
  const passInput = $("#pass_in");
  const loginBtn = $("#login_btn");

  const userPopover = new bootstrap.Popover(userInput, {
    trigger: "manual",
    content: "El usuario no puede estar vacío.",
    placement: "right",
    customClass: "custom-popover",
  });

  const passPopover = new bootstrap.Popover(passInput, {
    trigger: "manual",
    content: "La contraseña no puede estar vacía.",
    placement: "right",
    customClass: "custom-popover2",
  });

  /* --> LoginUser <-- */
  /* @params: none
  /* @return: void
  /* @Calls: loginCore.LoginUser
  /* @action: LoginUser using back4App's Parse API */
  function LoginUser() {
    // Get the user and pass from the inputs
    let user = userInput.val();
    let pass = passInput.val();

    // Call the login function
    loginCore.LoginUser(user, pass);
  }

  /* --> Event Listeners <-- */
  loginBtn.on("click", (e) => {
    // Prevent default form submission
    e.preventDefault();

    //Verify the input is not empty
    if (userInput.val() === "" && passInput.val() === "") {
      userPopover.show();
      passPopover.show();
      return;
    } else if (passInput.val() === "") {
      passPopover.show();
      return;
    } else if (userInput.val() === "") {
      userPopover.show();
      return;
    }

    // Call the login function
    LoginUser();
  });

  userInput.on("input", () => {
    // Verify the input is not empty
    if (userInput.val() === "") {
      userPopover.show();
    } else {
      userPopover.hide();
    }
  });

  userInput.on("focusout", () => {
    userPopover.hide();
  });

  passInput.on("input", () => {
    // Verify the input is not empty
    if (passInput.val() === "") {
      passPopover.show();
    } else {
      passPopover.hide();
    }
  });

  passInput.on("focusout", () => {
    passPopover.hide();
  });
});
