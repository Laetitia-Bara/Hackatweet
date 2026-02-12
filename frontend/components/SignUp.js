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
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, username, password }),
      },
    );

    const data = await res.json();

    if (!data.result) return setError(data.error || "Signup failed");

    dispatch(setCredentials({ token: data.token, user: data.user }));
    onClose?.();
    router.push("/home");
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
