"use strict";

// Ready function
$(function () {
  /* --> DOM Elements <-- */
  const tipoMaterial = $("#tipo_material");
  const descMaterial = $("#desc_material");
  const codigoMaterial = $("#codigo_material");
  const cantidadMaterial = $("#cantidad_material");
  const btnAdd = $("#add_entrada");

  const notValid = new bootstrap.Popover();

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
    } else if (selected === "forja") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set forja values
      descMaterial.append(new Option("Irwing 14 Oz", "14oz"));
      descMaterial.append(new Option("Irwing 19 Oz", "19oz"));
      descMaterial.append(new Option("Irwing 20 Oz", "20oz"));
    } else if (selected === "resina") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set resina values
      descMaterial.append(new Option("Resina 1", "resina1"));
      descMaterial.append(new Option("Resina 2", "resina2"));
      descMaterial.append(new Option("Resina 3", "resina3"));
      descMaterial.append(new Option("Polipropileno", "PP"));
      descMaterial.append(new Option("Polietileno", "PE"));
      descMaterial.append(new Option("Poliestireno", "PS"));
      descMaterial.append(new Option("ABS", "ABS"));
      descMaterial.append(new Option("Nylon", "POLYAMIDE"));
    } else if (selected === "otro") {
      // Enable all elements
      descMaterial.prop("disabled", false);
      codigoMaterial.prop("disabled", false);

      // Clear the options
      descMaterial.empty();

      // Append the default option
      descMaterial.append(new Option("Seleccionar Material...", ""));

      // Set pintura values
      descMaterial.append(new Option("Molde", "reparacion"));
      descMaterial.append(new Option("Muestras", "muestras"));
      descMaterial.append(new Option("Otros", "otros"));
    }
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

    // Check if the input is not a number
    if (isNaN(cantidad)) {
      // Show the error
      cantidadMaterial.addClass("is-invalid");
      btnAdd.prop("disabled", true);
    } else {
      // Remove the error
      cantidadMaterial.removeClass("is-invalid");
      btnAdd.prop("disabled", false);
    }
  });

  /* --> On Ready <-- */
  enabledElements();
});
