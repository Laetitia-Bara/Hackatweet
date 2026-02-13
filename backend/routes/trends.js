const express = require("express");
const router = express.Router();

const Tweet = require("../models/tweets");

// GET /trends
router.get("/", async (requestAnimationFrame, res) => {
  try {
    const tweets = await Tweet.find({}, { content: 1 });
    const counts = {};

    for (const t of tweets) {
      const text = t.content || "";
      const tags = text.match(/#\w+/g) || [];

      for (const tag of tags) {
        const clean = tag.slice(1).toLowerCase();
        counts[clean] = (counts[clean] || 0) + 1;
      }
    }

    const trends = Object.entries(counts)
      .map(([hashtag, count]) => ({ hashtag, count }))
      .sort((a, b) => b.count - a.count);

    res.json({ result: true, trends });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
