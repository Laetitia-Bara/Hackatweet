import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCredentials } from "../reducers/user";

export default function SignIn({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );

    const data = await res.json();

    if (!data.result) return setError(data.error || "Signin failed");

    dispatch(setCredentials({ token: data.token, user: data.user }));
    onClose?.();
    router.push("/home");
  };

  return (
    <>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleSignIn}>Sign in</button>
    </>
  );
}
