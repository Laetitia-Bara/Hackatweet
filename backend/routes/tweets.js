var express = require("express");
var router = express.Router();
const Tweet = require("../models/tweets");
const jwt = require("jsonwebtoken");
const { authTokenJWT } = require("../modules/authTokenJWT");

// Helper extract hashtag ("#Hello" -> "hello")
function extractHashtags(text = "") {
  const matches = text.match(/#\w+/g) || [];
  return [...new Set(matches.map((t) => t.slice(1).toLowerCase()))];
}

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
  const hashtags = extractHashtags(req.body.tweet);

  if (!tweet || !firstname || !username) {
    res.json({ result: false, error: "Errors in inputs" });
  } else {
    const newTweet = new Tweet({
      authorFirstname: firstname,
      authorUsername: username,
      content: tweet,
      createdAt: Date.now(),
      isLiked: [],
      hashtags,
    });

    const save = await newTweet.save();

    res.json({ result: true });
  }
});

// GET /byHastag/:tag
router.get("/byHashtag/:tag", async (req, res) => {
  try {
    const tag = (req.params.tag || "").toLowerCase();

    const tweets = await Tweet.find({ hashtags: tag }).sort({ createdAt: -1 });

    res.json({ result: true, tweets });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
