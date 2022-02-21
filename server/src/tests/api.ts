import { PORT } from "../constants";
import fetch from "node-fetch";

const GRAPHQL_URL = `http://localhost:${PORT}/graphql`;
const username = "jimmyTester";
const password = "securePassword";

async function fetchGraphql(gql: string, token?: string) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      query: gql,
    }),
  });
  return res.json();
}

export async function registerCutedev() {
  return await fetchGraphql(
    `mutation Register {
    registerCuteDev(username: "${username}", password: "${password}") {
      accessToken
      error {
        type
        details
      }
    }
  }`,
  );
}
export async function login() {
  return await fetchGraphql(
    `mutation Login {
      login(username: "${username}", password: "${password}") {
        accessToken
        error {
          type
          details
        }
      }
    }
    `,
  );
}

export async function createPost(token: string) {
  return await fetchGraphql(
    `
    mutation CreatePost {
      createPost(text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit") {
        post {
          id
          text
          stars
          date
          creator {
            username
            imageUrl
          }
        }
        error {
          type
          details
        }
      }
    }`,
    token,
  );
}

export async function editCutedev(token: string) {
  let edited = {
    bio: `"I'm a test driven developer"`,
    languages: `["elixir", "typescript", "golang", "python"]`,
    imageUrl: `"https://avatars.dicebear.com/api/pixel-art/test.svg"`,
  };

  return await fetchGraphql(
    `mutation EditCutedev {
    editCutedevProfile(input: { bio: ${edited.bio}, languages:${edited.languages}, imageUrl:${edited.imageUrl} }) {
      edited {
        username
        bio
        imageUrl
        languages
        projects
      }
      error {
        type
        details
      }
    }
  }`,
    token,
  );
}

export async function posts() {
  let take = 10;
  let reverse = "true";
  return await fetchGraphql(
    `query Posts {
    posts(input: { take: ${take}, reverse: ${reverse} }) {
      id
      text
      stars
      date
      creator {
        id
        username
        imageUrl
      }
    }
  }
  `,
  );
}
