import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) router.push("/");
  }, [token]);

  return <div>Home</div>;
}
