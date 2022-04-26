const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

//oauth

router.get("/github/callback", async (req, res) => {
  console.log("The client secret", process.env.GIT_CLIENT_SECRET);
  try {
    //Github sends a one time token and you send your id and secret to verify its really grace vinyl and if so they send back a token that lets you use this persons public github info. Also if they (the users data you are requesting) dont have a github they will let them sign up and you get that new signed up data
    let response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GIT_CLIENT_ID,
        client_secret: process.env.GIT_CLIENT_SECRET,
        code: req.query.code,
        allow_signup: true,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    //They send back data stating this is a token to use the users data or an error
    const data = response.data;

    if (data.error) {
      const error = Error(data.error);
      error.status = 401;
      throw error;
    }

    //After they have verified it is you you can now send a token to get the user data you need
    response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `token ${data.access_token}`,
      },
    });

    //create a new user if one doesnt exist and get that id or if the user existed already get their id
    const newUser = await User.byGithub(`github_${response.data.id}`);

    //encode the id so that you can store it on the persons pc and you can see if they tampered with it. You can tamper with it and when jwt verifies it it will not match up
    const jwtToken = jwt.sign({ id: newUser.id }, process.env.JWT);

    //now that you have verified the user store their stuff on the pc
    res.send(`
    <html>
      <head>
        <script>
          window.localStorage.setItem('token', '${jwtToken}')
          window.document.location = '/'
        </script>
      </head>
    </html>
    `);

    //res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});
