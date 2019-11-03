const express = require("express");
const router = express.Router();

const MyMongoLib = require("../MyMongoLib");
const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res /*, next*/) {
  res.render("index", { title: "Express" });
});

router.get("/users", (req, res) => {
  myMongoLib
    .getUsers()
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/users/:user_mail", (req, res) => {
  const user_mail = req.params.user_mail;
  //console.log(`GET users/:user_name - param: ${user_name}`);
  myMongoLib
    .getUser(user_mail)
    .then(docs => res.send(docs[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.post("/users", (req, res) => {
  const user_name = req.body.name;
  const user_mail = req.body.mail;
  const user_password = req.body.password;
  const user_age = req.body.age;
  const user_avatar = req.body.avatar;
  const user_country = req.body.country;

  const new_user = {
    name: user_name,
    mail: user_mail,
    password: user_password,
    age: user_age,
    avatar: user_avatar,
    country: user_country
  };

  myMongoLib
    .postUser(new_user)
    .then(docs => res.send(docs.ops[0]))
    .catch(err => res.send({ err: true, msg: err }));
});

router.put("/users/:user_mail", (req, res) => {
  const user_mail = req.params.user_mail;

  const user_name = req.body.name;
  const user_password = req.body.password;
  const user_age = req.body.age;
  const user_avatar = req.body.avatar;
  const user_country = req.body.country;

  const updated_user = {
    $set: {
      name: user_name,
      password: user_password,
      age: user_age,
      avatar: user_avatar,
      country: user_country
    }
  };

  myMongoLib
    .putUser(user_mail, updated_user)
    .then(docs => res.send({ updated: docs.modifiedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

router.delete("/users/:user_mail", (req, res) => {
  const user_mail = req.params.user_mail;
  myMongoLib
    .deleteUser(user_mail)
    .then(docs => res.send({ deleted: docs.deletedCount }))
    .catch(err => res.send({ err: true, msg: err }));
});

module.exports = router;
