var express = require("express");
var router = express.Router();
const Tweet = require("../models/tweets");
const jwt = require("jsonwebtoken");
const { authTokenJWT } = require("../modules/authTokenJWT");

// get tous les tweets version non sécurisée
router.get("/tweetList", async (req, res) => {
  let tweets = await Tweet.find();
  res.json({ result: true, latestTweets: tweets });
});

// get tous les tweets version sécurisée
// router.get("/tweetList", authTokenJWT, (req, res) => {
// actions à ajouter
//   res.json({ result: true });
// });

// poster un tweet version sécurisée
// router.post("/tweet", authTokenJWT, (req, res) => {
//   let tweet = req.body.tweet;
//   let firstname = req.body.firstname;
//   let username = req.body.username;

//   res.json({ result: true, firstname, username });
// });

// version non sécurisée
router.post("/newTweet", async (req, res) => {
  let tweet = req.body.tweet;
  let firstname = req.body.firstname;
  let username = req.body.username;

  if (!tweet || !firstname || !username) {
    res.json({ result: false, error: "Errors in inputs" });
  } else {
    const newTweet = new Tweet({
      authorFirstname: firstname,
      authorUsername: username,
      content: tweet,
      createdAt: Date.now(),
      isLiked: [],
    });

    const save = await newTweet.save();

    res.json({ result: true });
  }
});

module.exports = router;
