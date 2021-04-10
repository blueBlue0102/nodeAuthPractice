const express = require("express");
const app = express();

require("dotenv").config();
require("./startup/routes")(app);
require("./startup/db")();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
