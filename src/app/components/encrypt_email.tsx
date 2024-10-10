import crypto from 'crypto';

export function encryptEmail(email: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.NEXT_PUBLIC_SECRET_KEY!);
  let encrypted = cipher.update(email, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}
