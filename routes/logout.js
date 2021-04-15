const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  req.session.destroy();
  res.clearCookie("G_AUTHUSER_H");
  return res.status(200).render("redirect", { message: "已成功登出！" });
});

module.exports = router;
