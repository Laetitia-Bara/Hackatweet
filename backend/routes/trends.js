const express = require("express");
const router = express.Router();

const Tweet = require("../models/tweets");

// GET /trends
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find({}, { hashtags: 1, content: 1 });
    const counts = {};

    for (const t of tweets) {
      const list =
        t.hashtags && t.hashtags.length
          ? t.hashtags
          : (t.content?.match(/#\w+/g) || []).map((x) =>
              x.slice(1).toLowerCase(),
            );

      for (const h of list) {
        if (!h) continue;
        counts[h] = (counts[h] || 0) + 1;
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
