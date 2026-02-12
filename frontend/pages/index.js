import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Modal from "../components/Modal";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export default function LoginPage() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (token) router.push("/home");
  }, [token]);

  return (
    <div className="loginPage">
      <div className="leftSide">
        <img
          className="bgImg"
          src="/images/bg-twitterlikebleu.jpg"
          alt="background"
        />
      </div>

      <div className="rightSide">
        <img className="topLogo" src="/images/bird.svg" alt="logo" />

        <h1 className="title">
          See what’s
          <br />
          happening
        </h1>
        <p className="subtitle">Join Hackatweet today.</p>

        <button className="btnPrimary" onClick={() => setMode("signup")}>
          Sign up
        </button>

        <p className="small">Already have an account?</p>

        <button className="btnGhost" onClick={() => setMode("signin")}>
          Sign in
        </button>
      </div>

      {mode && (
        <Modal
          title={
            mode === "signup"
              ? "Create your Hackatweet account"
              : "Connect to Hackatweet"
          }
          onClose={() => setMode(null)}
        >
          {mode === "signup" ? (
            <SignUp onClose={() => setMode(null)} />
          ) : (
            <SignIn onClose={() => setMode(null)} />
          )}
        </Modal>
      )}
    </div>
  );
}
