import { getToken } from "src/token";
import { createClient } from "urql";

export const urqlClient = createClient({
  url:
    (import.meta.env.VITE_SERVER_URL as string | undefined) ||
    "http://localhost:4000/graphql",
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
      credentials: "include",
    };
  },
});
