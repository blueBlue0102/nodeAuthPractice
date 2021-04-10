const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.session.username;
  if (name) res.render("index", { username: name });
  else res.render("index");
});

module.exports = router;
