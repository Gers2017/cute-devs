import React from "react";
import { useHistory, Link } from "react-router-dom";
import CutedevIcon from "@icons/cutedevs";
import Button from "@modules/button";
import { useLogin } from "@context/loginContext";
import { useGetSessionInfoQuery } from "@generated"

export default function Navbar() {
  const { isLogin, userId, logout } = useLogin();
  const { push } = useHistory();

  const [result, _reexecute] = useGetSessionInfoQuery({ variables: { cuteDevId: userId } });
  const { data } = result;

  let username = "";
  let imageUrl = "";

  if (data?.cuteDev) {
    username = data.cuteDev.username;
    imageUrl = data.cuteDev.imageUrl;
  }

  return (
    <div className="bg-gray-800 py-2 px-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-4">
          <CutedevIcon />
          <h3 className="font-bold text-3xl">Cute Devs</h3>
        </div>
      </Link>
      <nav>
        <ul className="flex justify-center items-center gap-4">
          {!isLogin ? (
            <>
              <li>
                <a href="/user/login">Login</a>
              </li>
              <li>
                <a href="/user/create">Signup</a>
              </li>
            </>
          ) : (
            <>
              <Button onClick={() => logout()}>Logut</Button>
              <Button
                primary
                onClick={() => {
                  push("/posts/");
                }}>
                Create new post
              </Button>
              <li className="flex justify-start items-center text-gray-50 font-bold">
                {/* TODO: add a menu to logout, setting, check profile, projects */}
                <img src={imageUrl} alt={username} className="rounded-full w-10 h-10" />
                <p>{username}</p>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
