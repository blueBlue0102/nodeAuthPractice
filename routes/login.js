const session = require("express-session");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const { validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// login
router.post("/", async (req, res) => {
  // 檢查文字是否合法
  const { error, value } = validate(req.body, {
    email: "required",
    password: "required",
    allowUnknown: true,
  });
  if (error) {
    return res
      .status(400)
      .render("redirect", { message: "帳號或密碼格式錯誤" });
  }

  // 與資料庫比對
  try {
    // 比對 email
    const result = await db.query('SELECT * FROM "user" WHERE "email" = $1', [
      req.body.email,
    ]);

    // 比對 password
    const match = await bcrypt.compare(
      req.body.password,
      result.rows[0].password
    );
    if (!match) throw "錯誤的帳號或密碼";

    // 驗證成功
    // 建立 session data
    req.session.isLoggedIn = true;
    req.session.username = result.rows[0].username;

    return res.status(200).render("redirect", { message: "你已成功登入！" });
  } catch (err) {
    return res.status(401).render("redirect", { message: err });
  }
});

module.exports = router;
