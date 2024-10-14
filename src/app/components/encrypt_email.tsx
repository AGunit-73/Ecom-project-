import crypto from 'crypto';

export function encryptEmail(email: string): string {
  const keyBase64 = process.env.NEXT_PUBLIC_SECRET_KEY;

  if (!keyBase64) {
    throw new Error("Encryption key is not defined.");
  }

  const key = Buffer.from(keyBase64, 'base64'); // Ensure the key is valid
  const iv = crypto.randomBytes(16); // Initialization vector
  const algorithm = 'aes-256-cbc';

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(email, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return `${iv.toString('base64')}:${encrypted}`; // Include IV for decryption
}
