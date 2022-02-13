export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 20;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 28;

export const MAX_BIO_LENGTH = 60;
export const MIN_BIO_LENGTH = 1;

export const MAX_LANGUAGES_LENGTH = 10;
export const MAX_SINGLE_LANGUAGE_LENGTH = 16;

export function usernameValidator(value: string): string[] {
  let errors = [];
  if (value.length < MIN_USERNAME_LENGTH)
    errors.push(
      `Username must be at least ${MIN_USERNAME_LENGTH} characters long`,
    );
  if (value.length > MAX_USERNAME_LENGTH)
    errors.push(
      `Username must be at most ${MAX_USERNAME_LENGTH} characters long`,
    );
  return errors;
}

export function passwordValidator(value: string): string[] {
  let errors = [];
  if (value.length < MIN_PASSWORD_LENGTH)
    errors.push(
      `Password has to be at least ${MIN_PASSWORD_LENGTH} characters long`,
    );
  if (value.length > MAX_PASSWORD_LENGTH)
    errors.push(
      `Password has to be at most ${MAX_PASSWORD_LENGTH} characters long`,
    );
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value))
    errors.push(
      "Password must contain at least one uppercase letter and digit",
    );
  return errors;
}

export function bioValidator(bio: string): string[] {
  let errors = [];
  if (bio.length < MIN_BIO_LENGTH) errors.push(`Bio cannot be empty`);
  if (bio.length > MAX_BIO_LENGTH)
    errors.push(`Bio cannot be longer than ${MAX_BIO_LENGTH} characters`);
  return errors;
}

export function languagesValidator(languages: string): string[] {
  let errors = [];
  let languagesArray = languages.split(",").map((lang) => lang.trim());

  for (let j = 0; j < languagesArray.length; j++) {
    const language = languagesArray[j];
    if (language.length > MAX_SINGLE_LANGUAGE_LENGTH) {
      errors.push(
        `A language may not exceed ${MAX_SINGLE_LANGUAGE_LENGTH} characters`,
      );
      break;
    }
  }

  if (languagesArray.length > MAX_LANGUAGES_LENGTH) {
    errors.push(`Cannot have more than ${MAX_LANGUAGES_LENGTH} languages`);
  }

  return errors;
}
