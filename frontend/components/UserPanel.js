import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";

export default function UserPanel() {
  const dispatch = useDispatch();
  const router = useRouter();

  const firstname = useSelector((state) => state.user.firstname);
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div>
      <p>{firstname}</p>
      <p>@{username}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
