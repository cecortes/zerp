/* --> back4App <-- */
Parse.initialize(
  "qU6SFiayMrDFYJ3bwK6YPHGNRqMJmiX78HDfLWbp",
  "9JSwMZhdKWlMwtFDhZRMVnEPBw714KLoFlD588i5"
);

Parse.serverURL = "https://parseapi.back4app.com/";

/* --> LoginUser <-- */
/* @params: $user (string)
/*          $pass (string)
/* @return: void
/* @action: Logs in the user with the given credentials,
/*          and redirects to the main page if successful.
/*          Otherwise, it displays an error modal.*/
export function LoginUser($user, $pass) {
  Parse.User.logIn($user, $pass)
    .then((user) => {
      window.location.href = "../app/html/entrance.html";
    })
    .catch((error) => {
      // Hide popover
      $("#modal-title").text("Error de conexión");
      $("#modal-text").text(error.message);
      $("#modal-info").modal("show");

      // Clear the input fields
      $("#user_in").val("");
      $("#pass_in").val("");
    });
}
