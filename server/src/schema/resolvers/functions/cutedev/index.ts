import { compare, genSalt, hash } from "bcrypt";
import { CuteDev } from "../../../entities/CuteDev";

export async function isValidPassword(password: string, hashedPssword: string) {
  return await compare(password, hashedPssword);
}

export async function createNewCutedev(username: string, password: string) {
  const avatarKey = username.trim().toLocaleLowerCase().replace(/[\W]/gm, "_");
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);

  const newCutedev = CuteDev.create({
    username,
    password: hashedPassword,
    imageUrl: `https://avatars.dicebear.com/api/micah/${avatarKey}.svg`,
    languages: [],
    projects: [],
    posts: [],
  });

  const { identifiers } = await CuteDev.insert(newCutedev);
  return await CuteDev.findOne(identifiers[0].id);
}

export async function setCutedevSessionId(cutedev: CuteDev, sessionId: string) {
  cutedev.sessionId = sessionId;
  await cutedev.save();
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
