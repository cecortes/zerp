"use strict";

// Imports
import * as entranceCore from "../js/entranceCore.js";

// Ready function
$(async function () {
  /* --> DOM Elements <-- */
  const tipoMaterial = $("#tipo_material");
  const descMaterial = $("#desc_material");
  const codigoMaterial = $("#codigo_material");
  const cantidadMaterial = $("#cantidad_material");
  const btnAdd = $("#add_entrada");
  const table = $("#table_entradas");
  const btnSave = $("#save_entradas");
  const modalSpinner = $("#modal-spinner");

  // Global Vars
  let userId = "";
  let userName = "";
  let userMail = "";

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
  }

  /* --> EnabledElements <-- */
  /* @params: none
  /* @returns: none
  /* @description: Enable or disable elements 
  /*               depending of material type combo*/
  const enabledElements = () => {
    const selected = tipoMaterial.val();
    if (selected === "") {
      // Disable all elements
      descMaterial.prop("disabled", true);
      codigoMaterial.prop("disabled", true);
      cantidadMaterial.prop("disabled", true);
      btnAdd.prop("disabled", true);
      btnSave.prop("disabled", true);
    } else if (selected === "Forja") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set forja values
      descMaterial.append(new Option("Irwing 14 Oz", "Irwing 14 Oz"));
      descMaterial.append(new Option("Irwing 19 Oz", "Irwing 19 Oz"));
      descMaterial.append(new Option("Irwing 20 Oz", "Irwing 20 Oz"));
    } else if (selected === "Resina") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set resina values
      descMaterial.append(new Option("Resina 1", "Resina 1"));
      descMaterial.append(new Option("Resina 2", "Resina 2"));
      descMaterial.append(new Option("Resina 3", "Resina 3"));
      descMaterial.append(new Option("Polipropileno", "Polipropileno"));
      descMaterial.append(new Option("Polietileno", "Polietileno"));
      descMaterial.append(new Option("Poliestireno", "Poliestireno"));
      descMaterial.append(new Option("ABS", "ABS"));
      descMaterial.append(new Option("Nylon", "POLYAMIDE"));
    } else if (selected === "Otro") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set pintura values
      descMaterial.append(new Option("Molde", "Reparacion"));
      descMaterial.append(new Option("Muestras", "Muestras"));
      descMaterial.append(new Option("Otros", "Otros"));
    }
  };

  /* --> AddEntrada <-- */
  /* @params: none
  /* @returns: none
  /* @Calls: btnAdd on click
  /* @description: Add a new row to the table */
  const AddEntrada = () => {
    // Get the values
    let tipo = tipoMaterial.val();
    let desc = descMaterial.val();
    let codigo = codigoMaterial.val();
    let cantidad = cantidadMaterial.val();

    // Create the new row
    let newRow = `<tr>
                    <th scope="row">${tipo}</th>
                    <td>${desc}</td>
                    <td>${codigo}</td>
                    <td>${cantidad}</td>
                    <td>
                      <button class="btn btn-danger btn-sm delete_entradas" type="button">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                  </tr>`;

    // Append the new row
    table.append(newRow);

    // Clear the inputs
    descMaterial.val("");
    codigoMaterial.val("");
    cantidadMaterial.val("");

    // Disable the button
    btnAdd.prop("disabled", true);

    // Enable the save button
    btnSave.prop("disabled", false);
  };

  /* --> SaveEntradas <-- */
  /* @params: none
  /* @returns: none
  /* @Calls: btnSave on click
  /* @description: Save the data to the database */
  async function SaveEntradas() {
    // Show the spinner
    modalSpinner.modal("show");

    // Get the rows
    let rows = table.children();

    // Create the data array
    let data = [];

    // Add the user data
    let userData = {
      userId: userId,
      userName: userName,
    };

    // Push the user data
    data.push(userData);

    // Iterate over the formatos
    for (let i = 1; i <= 4; i++) {
      // Get the src of the formatos image
      let src = $(`#formato${i}`).attr("src");

      // Check if the src is empty
      if (src === "../assets/bg.jpg") {
        // Create the object
        let obj = {
          Formato: "null",
          src: "",
        };
        // Push the object
        data.push(obj);
      } else {
        // Create the object
        let obj = {
          Formato: i,
          src: src,
        };

        // Push the object
        data.push(obj);
      }
    }

    // Iterate over the pallets
    for (let i = 1; i <= 9; i++) {
      // Get the src of the pallets image
      let src = $(`#pallet${i}`).attr("src");

      // Check if the src is empty
      if (src === "../assets/bg.jpg") {
        // Create the object
        let obj = {
          Pallet: "null",
          src: "",
        };
        // Push the object
        data.push(obj);
      } else {
        // Create the object
        let obj = {
          Pallet: i,
          src: src,
        };

        // Push the object
        data.push(obj);
      }
    }

    // Iterate over the incidencias
    for (let i = 1; i <= 3; i++) {
      // Get the src of the incidencias image
      let src = $(`#incidencia${i}`).attr("src");

      // Check if the src is empty
      if (src === "../assets/bg.jpg") {
        // Create the object
        let obj = {
          Incidencia: "null",
          src: "",
        };
        // Push the object
        data.push(obj);
      } else {
        // Create the object
        let obj = {
          Incidencia: i,
          src: src,
        };

        // Push the object
        data.push(obj);
      }
    }

    // Iterate over the rows
    rows.each((index, row) => {
      // Get the cells
      let cells = $(row).children();

      // Create the object
      let obj = {
        tipo: $(cells[0]).text(),
        desc: $(cells[1]).text(),
        codigo: $(cells[2]).text(),
        cantidad: $(cells[3]).text(),
      };

      // Push the object
      data.push(obj);
    });

    // Create the new object
    let obj = {
      imagenes: data,
    };

    // Save the data
    await entranceCore.SaveEntradas(obj);

    // Reset the fields
    ResetFields();

    // Hide the spinner
    modalSpinner.modal("hide");
  }

  /* --> ResetFields <-- */
  /* @params: none
  /* @returns: none
  /* @Calls: SaveEntradas
  /* @description: Reset all canvas to default */
  const ResetFields = () => {
    // Reset the formatos
    for (let i = 1; i <= 4; i++) {
      $(`#formato${i}`).attr("src", "../assets/bg.jpg");
      $(`#del-formato${i}`).prop("disabled", true);
    }

    // Reset the pallets
    for (let i = 1; i <= 9; i++) {
      $(`#pallet${i}`).attr("src", "../assets/bg.jpg");
      $(`#del-pallet${i}`).prop("disabled", true);
    }

    // Reset the incidencias
    for (let i = 1; i <= 3; i++) {
      $(`#incidencia${i}`).attr("src", "../assets/bg.jpg");
      $(`#del-incidencia${i}`).prop("disabled", true);
    }

    // Clear the table
    table.empty();

    // Set tipoMaterial to default
    tipoMaterial.prop("selectedIndex", 0);
    enabledElements();
  };

  /* --> Event Handlers <-- */
  tipoMaterial.on("change", enabledElements);

  descMaterial.on("change", () => {
    if (descMaterial.val() !== "") {
      cantidadMaterial.prop("disabled", false);
    } else {
      cantidadMaterial.prop("disabled", true);
    }
  });

  cantidadMaterial.on("input", () => {
    // Get the text
    let cantidad = cantidadMaterial.val();

    // If the text is empty
    if (cantidad === "") {
      // Disable the button
      btnAdd.prop("disabled", true);
    } else {
      // Enable the button
      btnAdd.prop("disabled", false);
    }
  });

  btnAdd.on("click", AddEntrada);

  table.on("click", ".delete_entradas", (e) => {
    // Get the row
    let row = $(e.target).closest("tr");

    // Remove the row
    row.remove();

    // If the table is empty
    if (table.children().length === 0) {
      // Disable the save button
      btnSave.prop("disabled", true);
    }
  });

  btnSave.on("click", SaveEntradas);

  /* --> On Ready <-- */
  await GetUserName();
  enabledElements();
});
