import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import LeftColumn from "../components/LeftColumn";

export default function Home() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  return (
    <div className="homePage">
      <LeftColumn />

      <main className="centerColumn">
        <h2 className="centerTitle">Home</h2>

        <div className="postTweetBox">
          {/* Branchement PostTweet */}
          <p style={{ opacity: 0.7, margin: 0 }}>PostTweet (placeholder)</p>
        </div>

        <div className="lastTweetsBox">
          {/* Branchement LastTweets */}
          <p style={{ opacity: 0.7, margin: 0 }}>
            LastTweets (placeholder scroll)
          </p>
        </div>
      </main>

      <aside className="rightColumn">
        <div className="trendsTitle">Trends</div>

        <div className="trendsBox">
          {/* Branchement trends */}
          <p style={{ opacity: 0.7, margin: 0 }}>Trends (placeholder)</p>
        </div>
      </aside>
    </div>
  );
}
