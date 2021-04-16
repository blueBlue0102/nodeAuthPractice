const bodyParser = require("body-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const index = require("../routes/index");
const login = require("../routes/login");
const logout = require("../routes/logout");
const register = require("../routes/register");

const redisClient = redis.createClient(process.env.REDIS_URL);
redisClient.on("error", console.error);

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    })
  );
  app.use("/", index);
  app.use("/login", login);
  app.use("/logout", logout);
  app.use("/register", register);
};
