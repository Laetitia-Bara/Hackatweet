const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  authorFirstname: {
    type: String,
  },

  authorUsername: {
    type: String,
    lowercase: true,
  },

  content: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isLiked: [String],

  hashtags: [String],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
