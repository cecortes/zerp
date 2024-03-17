/* --> back4App <-- */
Parse.initialize(
  "qU6SFiayMrDFYJ3bwK6YPHGNRqMJmiX78HDfLWbp",
  "9JSwMZhdKWlMwtFDhZRMVnEPBw714KLoFlD588i5"
);

Parse.serverURL = "https://parseapi.back4app.com/";

/* --> CheckLoginUser <-- */
/* @params: nothing
/* @returns: Boolean
/* @actions: If user is set return true
/*           if not rederict to login page */
export function CheckLoginUser() {
  // Get user.id
  let user = Parse.User.current();

  // Check if user is set
  if (user) {
    return true;
  } else {
    window.location.href = "../index.html";
  }
}

/* --> LogoutUser <-- */
/* @params: nothing
/* @returns: nothing
/* @actions: Logout User using back4app */
export function LogoutUser() {
  Parse.User.logOut();
}

/* --> GetUserId <-- */
/* @params: none.
/* @actions: Get the id of the current user
/* @returns: nothing */
export function GetUserId() {
  return Parse.User.current().id;
}

/* --> GetUserData <-- */
/* @params: none
/* @actions: Get the current user data
/* @returns: An object with userId, username, mail */
export async function GetUserData() {
  // Handle error
  try {
    // Create a new instance of User class
    let User = Parse.Object.extend("User");

    // Create a new instance of Query
    let query = new Parse.Query(User);

    // Set the query
    query.equalTo("objectId", GetUserId());

    // Find the first user
    let user = await query.first();

    // Get the attributes
    let userId = user.id;
    let userName = user.get("username");
    let userMail = user.get("email");

    // Create a new object
    let userData = {
      userId: userId,
      userName: userName,
      userMail: userMail,
    };
    // Return the object
    return userData;
  } catch (error) {
    // Show Modal
    $("#modal-title").text("Error de conexión");
    $("#modal-text").text(error.message);
    $("#modal-info").modal("show");
  }
}

/* --> GetLastestEntries <-- */
/* @params: $userId as string
/* @returns: An array of objects
/* @actions: Get the 10 lastest entries */
export async function GetLastestEntries($userId) {
  // Create a new instance of Entradas class
  let Entradas = Parse.Object.extend("Entradas");

  // Create a new instance of Query
  let query = new Parse.Query(Entradas);

  // Set the query
  query.equalTo("userId", $userId);
  query.descending("createdAt");
  query.limit(10);

  // Find the lastest entries
  let entries = await query.find();

  // Create a new array
  let lastestEntries = [];

  // Iterate over the entries
  for (let i = 0; i < entries.length; i++) {
    // Get the attributes
    let id = entries[i].id;
    let cantidad = entries[i].get("cantidad");
    let userId = entries[i].get("userId");
    let descripcion = entries[i].get("descripcion");
    let imagesId = entries[i].get("imagesId");
    let tipo = entries[i].get("tipo");
    let userName = entries[i].get("userName");
    let codigo = entries[i].get("codigo");
    let createdAt = entries[i].createdAt;

    // Create a new object
    let entry = {
      id: id,
      cantidad: cantidad,
      userId: userId,
      descripcion: descripcion,
      imagesId: imagesId,
      tipo: tipo,
      userName: userName,
      codigo: codigo,
      createdAt: createdAt,
    };

    // Push the object
    lastestEntries.push(entry);
  }

  // Return the array
  return lastestEntries;
}

/* --> FillLatestEntries <-- */
/* @params: $userId as string,
/*          $table as jQuery object.
/* @returns: nothing
/* @actions: Fill the table with the lastest entries */
export async function FillLatestEntries($userId, $table) {
  // Locals
  let lastId = "";
  let actualId = "";

  // Get the lastest entries
  let entries = await GetLastestEntries($userId);

  // Iterate over the entries
  for (let i = 0; i < entries.length; i++) {
    // Get the createdAt
    actualId = entries[i].imagesId;

    // Check if the lastDate is different from the actualDate
    if (lastId !== actualId) {
      // Set the lastDate
      lastId = actualId;

      //Create an empty row
      let emptyRow = $("<tr></tr>");

      // Create empty cells
      let emptyCellFecha = $("<td></td>");
      let emptyCellTipo = $("<td></td>");
      let emptyCellDescripcion = $("<td></td>");
      let emptyCellCantidad = $("<td></td>");
      let emptyCellButton = $("<td></td>");
      let emptyCellImageId = $("<td style='display: none'></td>");

      // Append the empty cells to the empty row
      emptyRow.append(
        emptyCellFecha,
        emptyCellTipo,
        emptyCellDescripcion,
        emptyCellCantidad,
        emptyCellButton,
        emptyCellImageId
      );

      // Append the empty row to the table
      $table.append(emptyRow);

      // Create a new row
      let row = $("<tr></tr>");

      // Create the Fecha cell
      let cellFecha = $(`<th scope="row" class="text-warning-emphasis"></th>`);

      // Set the Fecha
      cellFecha.text(entries[i].createdAt.toLocaleString());

      // Create Tipo cell
      let cellTipo = $(`<td class="text-warning-emphasis"></td>`);

      // Set the Tipo
      cellTipo.text(entries[i].tipo);

      // Create descripcion cell
      let cellDescripcion = $(`<td class="text-warning-emphasis"></td>`);

      // Set the descripcion
      cellDescripcion.text(entries[i].descripcion);

      // Create cantidad cell
      let cellCantidad = $(`<td class="text-warning-emphasis"></td>`);

      // Set the cantidad
      cellCantidad.text(entries[i].cantidad);

      // Create button cell
      let cellButton = $(`<td class="text-warning-emphasis"></td>`);

      // Create the button
      let button = $(
        `<button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalDetalle">
            <i class="fas fa-info-circle"></i>
          </button>`
      );

      // Append the button to the cell
      cellButton.append(button);

      // Create imageId cell
      let cellImageId = $(`<td style="display: none"></td>`);

      // Set the imageId
      cellImageId.text(entries[i].imagesId);

      // Append the cell to the row
      row.append(
        cellFecha,
        cellTipo,
        cellDescripcion,
        cellCantidad,
        cellButton,
        cellImageId
      );

      // Append the row to the table
      $table.append(row);
    } else {
      // Create a new row
      let row = $("<tr></tr>");

      // Create the Fecha cell
      let cellFecha = $("<td></td>");

      // Set the Fecha
      cellFecha.text(entries[i].createdAt.toLocaleString());

      // Create Tipo cell
      let cellTipo = $("<td></td>");

      // Set the Tipo
      cellTipo.text(entries[i].tipo);

      // Create descripcion cell
      let cellDescripcion = $("<td></td>");

      // Set the descripcion
      cellDescripcion.text(entries[i].descripcion);

      // Create cantidad cell
      let cellCantidad = $("<td></td>");

      // Set the cantidad
      cellCantidad.text(entries[i].cantidad);

      // Create button cell
      let cellButton = $("<td></td>");

      // Create the button
      let button = $(`<i class="fa-solid fa-ellipsis"></i>`);

      // Append the button to the cell
      cellButton.append(button);

      // Create imageId cell
      let cellImageId = $(`<td style="display: none"></td>`);

      // Set the imageId
      cellImageId.text(entries[i].imagesId);

      // Append the cells to the row
      row.append(
        cellFecha,
        cellTipo,
        cellDescripcion,
        cellCantidad,
        cellButton,
        cellImageId
      );

      // Append the row to the table
      $table.append(row);
    }
  }
}
