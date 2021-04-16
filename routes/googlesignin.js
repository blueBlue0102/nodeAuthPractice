const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const token = req.body.idtoken;
  try {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (typeof req.session.username == "undefined") {
      req.session.username = payload["given_name"];
    }
    return res.status(200).render("redirect", { message: "Google 登錄成功！" });
  } catch (error) {
    console.log(error);
    return res.status(401).render("redirect", { message: "Google 登錄失敗" });
  }
});

module.exports = router;
