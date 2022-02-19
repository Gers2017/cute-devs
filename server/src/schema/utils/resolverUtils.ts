import { compare, hash } from "bcrypt";
import { CuteDev } from "../entities/CuteDev";

export async function findCutedevById(id: string) {
  return (await CuteDev.findOne(id)) || null;
}

export async function comparePasswords(
  password: string,
  cutedevPassword: string,
) {
  const isValid = await compare(password, cutedevPassword);
  if (!isValid) {
    return false;
  }
  return true;
}

export async function generateNewCutedev(username: string, password: string) {
  const usernameKey = username.toLocaleLowerCase().replace(/[\W]/gm, "_");
  const hashedPassword = await hash(password, 5);

  return CuteDev.create({
    username,
    password: hashedPassword,
    imageUrl: `https://avatars.dicebear.com/api/micah/${usernameKey}.svg`,
    languages: [],
    projects: [],
    posts: [],
  });
}

export function isValidCutedevImageUrl(imageurl: string) {
  const githubRegex = new RegExp(
    /(https):(\/\/avatars.githubusercontent.com\/u\/\d+\?v=4)/gi,
  );
  const dicebearRegex = new RegExp(
    /(https):(\/\/avatars.dicebear.com\/api\/[a-z-]+\/)\w+(.svg)/gi,
  );

  return githubRegex.test(imageurl) || dicebearRegex.test(imageurl);
}
