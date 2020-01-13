var express = require("express");
var router = express.Router();
const passport = require("passport");

// Initiates basic Sign in With Slack flow
const frontURL = process.env.FRONT_URL;
console.log(process.env.FRONT_URL);

passport.authorize({
  connection: "google-oauth2"
});

router.get(
  "/login",
  passport.authenticate("auth0", { scope: "openid email profile" }),
  (req, res) => {
    res.redirect(frontURL);
  }
);

// Completes the OAuth flow.
router.get(
  "/callback",
  passport.authenticate("auth0", {}), // Failure triggers the default failure handler (401 Unauthorized)
  (req, res) => {
    // Successful authentication redirects home.
    res.redirect(frontURL);
  }
);

// Handle removing the user from the session
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(frontURL);
});

router.get("/getUser", (req, res) => res.json(req.user || null));

module.exports = router;
