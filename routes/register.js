const bcrypt = require("bcrypt");
const db = require("../models/index");
const { validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// register
router.post("/", async (req, res) => {
  // 檢查文字是否合法
  const { error, value } = validate(req.body, {
    username: "required",
    email: "required",
    password: "required",
  });
  if (error)
    return res.status(400).render("redirect", { message: "輸入格式錯誤" });

  // 儲存資料
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await db.query(
      'INSERT INTO "user"("username", "email", "password") VALUES($1, $2, $3)',
      [req.body.username, req.body.email, hashPassword]
    );
    return res.status(200).render("redirect", { message: "註冊成功！" });
  } catch (err) {
    return res
      .status(500)
      .render("redirect", { message: "註冊失敗，資料庫無法儲存資料" });
  }
});

module.exports = router;
