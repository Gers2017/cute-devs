import React from "react";
import { useHistory, Link } from "react-router-dom";
import CutedevIcon from "@icons/cutedevs";
import Button from "@modules/button";
import { useLogin } from "@context/loginContext";
export default function Navbar() {
  const { isLogged } = useLogin();
  const { push } = useHistory();

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
          <li>
            <a href="#">Link</a>
          </li>
          {isLogged ? (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Signup</a>
              </li>
            </>
          ) : (
            <li className="border border-gray-700 p-2">Logged</li>
          )}
          <Button
            primary
            onClick={() => {
              push("/posts/");
            }}>
            Create new post
          </Button>
        </ul>
      </nav>
    </div>
  );
}
