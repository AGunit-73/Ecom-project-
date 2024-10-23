// src/app/components/hash_password.tsx

// Temporarily disable hashing
export const hashPassword = async (password: string): Promise<string> => {
  return password; // Return the plain password for now
};

// Temporarily disable hash comparison
export const comparePassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  return inputPassword === storedHash; // Compare plain passwords
};
