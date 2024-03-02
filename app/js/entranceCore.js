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
