"use strict";

// Importing the modules
import * as historialCore from "./historialCore.js";

// Ready function
$(async function () {
  /* --> DOM Elements <-- */
  const table = $("#table_historial");
  const modalSpinner = $("#modal-spinner");

  /* --> GlobalVars <-- */
  let userId = "";
  let userName = "";
  let userMail = "";

  /* --> GetUserName <-- */
  /* @params: none
  /* @return: void
  /* @Calls: entranceCore.
  /* @action: Get the user name of the current user.*/
  async function GetUserName() {
    // Get the user name of the current user
    let user = await historialCore.GetUserData();

    // Kept in GlobalVars
    userId = user.userId;
    userName = user.userName;
    userMail = user.userMail;
  }

  /* --> ResetTable <-- */
  /* @params: none
  /* @returns: none
  /* @Calls: On Load
  /* @description: Reset the table */
  function ResetTable() {
    // Reset the table
    table.empty();
  }

  /* --> On Load <-- */
  historialCore.CheckLoginUser();
  await GetUserName();
  ResetTable();
  await historialCore.FillLatestEntries(userId, table);
});
