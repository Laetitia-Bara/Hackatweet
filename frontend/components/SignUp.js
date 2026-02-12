import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setCredentials } from "../reducers/user";

export default function SignUp({ onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    console.log("✅ CLICK SIGNUP");
    console.log("firstname/username/password:", firstname, username, password);

    try {
      setError("");

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`;
      console.log("➡️ URL:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, username, password }),
      });

      console.log("⬅️ STATUS:", res.status);

      const data = await res.json();
      console.log("⬅️ DATA:", data);

      if (!data.result) {
        setError(data.error || "Signup failed");
        return;
      }

      dispatch(setCredentials({ token: data.token, user: data.user }));
      onClose?.();
      router.push("/home");
    } catch (e) {
      console.error("❌ SIGNUP ERROR:", e);
      setError("Network/server error (see console)");
    }
  };

  return (
    <>
      <input
        placeholder="Firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
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

      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}
