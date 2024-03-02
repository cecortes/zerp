"use strict";

// Importing modules
import * as entranceCore from "./entranceCore.js";

// Ready function
$(async function () {
  /* --> DOM Elements <-- */
  const usernameField = $("#username");
  const dateField = $("#date");

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

  /* --> On load <-- */
  entranceCore.CheckLoginUser();
  await GetUserName();
  dateField.val(GetCurrentDate());
});
