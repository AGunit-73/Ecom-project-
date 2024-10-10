import 'dotenv/config';
import { sql } from "@vercel/postgres";
import { encryptEmail } from "@/app/components/encrypt_email";
import { hashPassword, comparePassword } from "@/app/components/hash_password";

// Define the User type to include the 'password' field.
interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Ensure this is included for password comparison.
}

export default class ApiService {
  /**
   * Registers a new user.
   * @param {string} username - The username of the new user.
   * @param {string} email - The email of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<{ success: boolean; message: string; user?: User }>}
   */
  static async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const encryptedEmail = encryptEmail(email);
      const hashedPassword = await hashPassword(password);

      // SQL query to insert the user into the database.
      const result = await sql<User[]>`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${encryptedEmail}, ${hashedPassword})
        RETURNING id, username, email, password;
      `;

      const user = result[0]; // Access the first user directly from the result.

      return {
        success: true,
        message: "User registered successfully",
        user,
      };
    } catch (error) {
      console.error("Error during user registration:", error);

      return { success: false, message: "Error registering user" };
    }
  }

  /**
   * Authenticates a user with their username/email and password.
   * @param {string} usernameOrEmail - The username or email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{ success: boolean; message: string; user?: User }>}
   */
  static async authenticateUser(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const encryptedEmail = encryptEmail(usernameOrEmail);

      // Retrieve user by username or encrypted email.
      const result = await sql<User[]>`
        SELECT id, username, email, password FROM users
        WHERE username = ${usernameOrEmail} OR email = ${encryptedEmail};
      `;

      const user = result[0]; // Access the first user directly from the result.

      // Check if a user was found.
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Verify the password.
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid password",
        };
      }

      return {
        success: true,
        message: "User authenticated successfully",
        user,
      };
    } catch (error) {
      console.error("Error during user authentication:", error);
      return { success: false, message: "Error during authentication" };
    }
  }
}