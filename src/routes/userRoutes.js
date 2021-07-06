const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/auth/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Auth Working properly");
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  }),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.redirect("/profile");
  }
);

router.get("/logout", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.logout();
  res.redirect("/");
});

router.get("/current_user", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(req.user);
});

module.exports = router;
