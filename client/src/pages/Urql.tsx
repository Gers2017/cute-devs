import React from "react";
import { useAuthQuery, useLogoutMutation, useLoginCutedevMutation } from "@generated";
// import { useLogin } from "@context/loginContext"

function Urql() {
  const [authresult, _reexecute] = useAuthQuery({ requestPolicy: "network-only" });
  const { data } = authresult;

  let isLogin = data && data.me.isAuth

  if (data && data.me) {
    let { isAuth, userId } = data.me;
    console.log({ isAuth, userId });
  }

  const [_loginState, login] = useLoginCutedevMutation();
  const [_logoutState, logout] = useLogoutMutation()


  async function submitLogin() {
    const loginCredentials = { username: "E", password: "securePassword123" };

    login({
      ...loginCredentials
    }).then(({ data, error }) => {
      if (error) console.error(error);
      const payload = data && data.login;
      if (!!payload?.cuteDev) {
        const { username, id } = payload.cuteDev
        console.log({ username, id });
      }
    })
  }

  return (
    <div>
      <button
        className="flex justify-center items-center p-2 rounded border-2 border-blue-500 font-bold"
        onClick={() => {
          !isLogin && submitLogin();
        }}>
        Login
      </button>
      <button
        className="flex justify-center items-center p-2 rounded border-2 border-blue-500 font-bold"
        onClick={() => {
          if (!isLogin) return;
          logout();
        }}>
        Logout
      </button>
      <section className="my-4 p-4 flex flex-col gap-2 justify-start">
        <h2 className="mb-2 mt-0 text-lg">Results</h2>
        {
          isLogin ? (
            <article>
              <h2>Super secret content</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis est, aliquid porro reprehenderit nulla ratione at exercitationem nobis optio assumenda eaque mollitia tenetur, eius quas quia. Id, explicabo? Praesentium, ex!</p>
              {data && data.me && <pre>{JSON.stringify(data.me, null, 2)}</pre>}
            </article>
          ) : (
            <p className="text-xl font-bold text-pink-500">Not logged</p>
          )
        }

      </section>

    </div>
  );
}

export default Urql;