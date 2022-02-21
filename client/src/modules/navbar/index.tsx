import React from "react";
import { useHistory, Link } from "react-router-dom";
import CutedevIcon from "@icons/cutedevs";
import Button from "@modules/button";
import { useLogin } from "@context/authContext";
import { useCutedevProfileQuery, useLogoutMutation } from "@generated";
import { deleteToken, getTokenPayload } from "../../token";

export default function Navbar() {
  const { isLogged, setIsLogged } = useLogin();
  const { push } = useHistory();
  const payload = getTokenPayload();

  const [cutedevProfile, _reexecuteCutedevProfile] = useCutedevProfileQuery({
    variables: { cutedevId: payload?.id.toString() || "" },
    pause: payload === null,
  });
  const [_updateLoguut, logoutMutation] = useLogoutMutation();

  const cuteDev = cutedevProfile.data?.cuteDev;
  const isUserLogged = isLogged && payload;

  async function logout() {
    const { data } = await logoutMutation();
    if (data?.logout.success) {
      deleteToken();
      setIsLogged(false);
    }
  }

  return (
    <div className="bg-gray-800 py-2 px-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-2">
          <CutedevIcon />
          <h3 className="font-bold text-3xl">Cute Devs</h3>
        </div>
      </Link>
      <nav className="w-max">
        <ul className="flex justify-center items-center gap-4">
          {isUserLogged ? (
            <>
              <Link
                className="inline-flex justify-start items-center gap-2font-bold"
                to={`/devs/${payload.id}`}>
                <img
                  src={cuteDev?.imageUrl}
                  alt={`Profile picture of ${cuteDev?.username}`}
                  className="rounded-full w-10 h-10"
                />
                <p>{cuteDev?.username}</p>
              </Link>
              <Button fullwidth={false} onClick={logout}>
                Logout
              </Button>
              <Button
                primary
                fullwidth={false}
                onClick={() => {
                  push("/posts/");
                }}>
                Create new post
              </Button>
            </>
          ) : (
            <>
              <li>
                <a href="/user/login">Account</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
