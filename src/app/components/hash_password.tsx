import argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const comparePassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  return await argon2.verify(storedHash, inputPassword);
};
