import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your-default-secret";

export const encryptEmail = (email: string): string => {
  return CryptoJS.AES.encrypt(email, secretKey).toString();
};

export const decryptEmail = (encryptedEmail: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
