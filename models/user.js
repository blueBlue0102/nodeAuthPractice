const db = require("./index");
const Joi = require("joi");

async function initUserTable() {
  // create user table
  const userSchema = `"user" (
    user_id          serial           PRIMARY KEY,
    username         varchar(255)     NOT NULL,
    email            varchar(255)     NOT NULL  UNIQUE,
    password         varchar(255)     NOT NULL,
    register_date    timestamp        NOT NULL  DEFAULT CURRENT_TIMESTAMP
  )`;
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS ` + userSchema);
    await db.query(
      `INSERT INTO "user"("username", "email", "password") VALUES($1, $2, $3) ON CONFLICT DO NOTHING`,
      [
        "Blue",
        "test@test.com",
        "$2b$10$Ll/ykV4Nfjc104jHlOSmw.Q68pnpFc8t3hsMkJbxvPonjPt.VK0Nq",
      ]
    );
  } catch (error) {
    console.log("initUserTable() failed");
  }
}
exports.initUserTable = initUserTable;

function validateUser(user, options) {
  // 驗證輸入格式是否正確？ (字元、字數是否合法？)
  // 並不是在驗證帳號密碼與資料庫相符
  const schema = Joi.object({
    username: Joi.string()
      .min(1)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email(),

    password: Joi.string().min(1).max(20),
  });

  return schema.validate(user, options);
}
exports.validate = validateUser;
