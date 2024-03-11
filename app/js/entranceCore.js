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

/* --> TestSaveFormatos <-- */
/* @params: array of objects
/* @returns: none
/* @actions: Save the formatos to the database */
export async function TestSaveFormatos() {
  let imagen = document.getElementById("formato1").src;

  console.log(imagen);

  // Handle error
  try {
    // Create a new Parse File
    let Formato = new Parse.File("formato.jpg", { base64: imagen });

    // Create a new instance of Formatos
    let FormatoClass = Parse.Object.extend("Formatos");

    let Formato1 = new FormatoClass();

    // Set the data
    Formato1.set("userId", "TEST");
    Formato1.set("userName", "TEST");
    Formato1.set("f1", Formato);

    // Save the data
    await Formato1.save()
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    // Show Modal
    console.log(error);
  }
}

/* --> SaveEntradas <-- */
/* @params: array of objects
/* @returns: none
/* @actions: Save the data to the database */
export async function SaveEntradas(data) {
  // Handle error
  try {
    // Create a new instance of Images class
    let Images = Parse.Object.extend("Images");
    let newImageEntry = new Images();

    // Iterate over the formatos
    for (let i = 1; i <= 4; i++) {
      // Check if the image is not empty
      if (data.imagenes[i].Formato != "null") {
        // Create a new Parse File
        let Formato = new Parse.File("formato.jpg", {
          base64: data.imagenes[i].src,
        });

        // Set the image data
        newImageEntry.set(`formato${i}`, Formato);
      }
    }

    // Iterate over the pallets
    for (let i = 1; i <= 9; i++) {
      // Check if the image is not empty
      if (data.imagenes[i + 4].Pallet != "null") {
        // Create a new Parse File
        let Pallet = new Parse.File("pallet.jpg", {
          base64: data.imagenes[i + 4].src,
        });

        // Set the image data
        newImageEntry.set(`pallet${i}`, Pallet);
      }
    }

    // Iterate over the Incidencias
    for (let i = 1; i <= 3; i++) {
      // Check if the image is not empty
      if (data.imagenes[i + 13].Incidencia != "null") {
        // Create a new Parse File
        let Incidencia = new Parse.File("incidencia.jpg", {
          base64: data.imagenes[i + 13].src,
        });

        // Set the image data
        newImageEntry.set(`incidencia${i}`, Incidencia);
      }
    }

    // Set the user data
    newImageEntry.set("userId", data.imagenes[0].userId);
    newImageEntry.set("userName", data.imagenes[0].userName);

    // Save the data
    await newImageEntry
      .save()
      .then(async (Response) => {
        // Iterate over the rest of the data
        for (let i = 17; i < data.imagenes.length; i++) {
          // Create a new instance of Entradas class
          let Entradas = Parse.Object.extend("Entradas");
          let newEntrada = new Entradas();

          // Set the data
          newEntrada.set("userId", data.imagenes[0].userId);
          newEntrada.set("userName", data.imagenes[0].userName);
          newEntrada.set("imagesId", Response.id);
          newEntrada.set("tipo", data.imagenes[i].tipo);
          newEntrada.set("descripcion", data.imagenes[i].desc);
          newEntrada.set("codigo", data.imagenes[i].codigo);
          newEntrada.set("cantidad", data.imagenes[i].cantidad);

          // Save the data
          await newEntrada
            .save()
            .then((Response) => {})
            .catch((error) => {
              // Show Modal
              $("#modal-title").text("Error de conexión");
              $("#modal-text").text(error.message);
              $("#modal-info").modal("show");
            });
        }
      })
      .catch((error) => {
        // Show Modal
        $("#modal-title").text("Error de conexión");
        $("#modal-text").text(error.message);
        $("#modal-info").modal("show");
      });
  } catch (error) {
    // Show Modal
    $("#modal-title").text("Error de conexión");
    $("#modal-text").text(error.message);
    $("#modal-info").modal("show");
  }
}
