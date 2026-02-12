import { useEffect, useState } from "react";

export default function LastTweet({ refreshKey }) {
  const [tweets, setTweets] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTweets = async () => {
    const res = await fetch(`${backendUrl}/tweets`);
    const data = await res.json();
    if (data.result) setTweets(data.tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, [refreshKey]);

  return (
    <div>
      {tweets.map((t) => (
        <div key={t._id}>{t.content}</div>
      ))}
    </div>
  );
}
