const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  req.session.destroy();
  return res.status(200).render("redirect", { message: "已成功登出！" });
});

module.exports = router;
