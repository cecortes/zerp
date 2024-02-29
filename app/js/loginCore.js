"use strict";

// Ready function
$(function () {
  /* --> back4App <-- */
  var Parse = require("parse/node");

  Parse.initialize(
    "qU6SFiayMrDFYJ3bwK6YPHGNRqMJmiX78HDfLWbp",
    "9JSwMZhdKWlMwtFDhZRMVnEPBw714KLoFlD588i5"
  );

  Parse.serverURL = "https://parseapi.back4app.com/";
});
