const express = require("express");
const router = express.Router();

const User = require("../models/users");
const Tweet = require("../models/tweets");

// helper hashtags
function extractHashtags(text = "") {
  const matches = text.match(/#\w+/g);
  if (!matches) return [];
  return [...new Set(matches.map((h) => h.slice(1).toLowerCase()))];
}

// POST /tweets  { token, content }
router.post("/", async (req, res) => {
  try {
    const { token, content } = req.body;

    if (!token || !content?.trim()) {
      return res.json({ result: false, error: "Missing token or content" });
    }

    const user = await User.findOne({ token });
    if (!user) return res.json({ result: false, error: "Invalid token" });

    const hashtags = extractHashtags(content);

    const newTweet = await Tweet.create({
      content: content.slice(0, 280),
      author: user._id,
      likes: [],
      hashtags,
    });

    res.json({ result: true, tweet: newTweet });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

// GET /tweets
router.get("/", async (_req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("author", "firstname username")
      .sort({ createdAt: -1 });

    res.json({ result: true, tweets });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
