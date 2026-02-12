const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema(
  {
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    hashtags: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("tweets", tweetSchema);
