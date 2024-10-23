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

// Define the Item type for item-related operations
interface Item {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  categoryId: number;
  imageUrls: string[]; // Array to store multiple image URLs
  postalInfo: string;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}

export default class ApiService {
  // ================================
  // USER-RELATED METHODS
  // ================================

  static async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const encryptedEmail = encryptEmail(email);
      const hashedPassword = await hashPassword(password);
  
      // Query database to insert user and return user details
      const result = await sql<{ id: number; username: string; email: string; password: string }[]>`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${encryptedEmail}, ${hashedPassword})
        RETURNING id, username, email, password;
      `;
  
      // Ensure there's at least one result
      if (result.rows.length === 0) {
        return { success: false, message: "User registration failed. No user returned." };
      }
  
      // Extract user from result.rows[0]
      const user = result.rows[0];
  
      return {
        success: true,
        message: "User registered successfully",
        // @ts-expect-error Ignore TypeScript checking for now
        user,
      };
    } catch (error) {
      console.error("Error during user registration:", error);
      return { success: false, message: "Error registering user" };
    }
  }
  

  static async authenticateUser(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const encryptedEmail = encryptEmail(usernameOrEmail);
      const result = await sql<User[]>`
        SELECT id, username, email, password FROM users
        WHERE username = ${usernameOrEmail} OR email = ${encryptedEmail};
      `;

      if (result.rows.length === 0) {
        return { success: false, message: "User not found" };
      }

      const user = result.rows[0];
      // @ts-expect-error Ignore TypeScript checking for now
      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return { success: false, message: "Invalid password" };
      }
      // @ts-expect-error Ignore TypeScript checking for now
      return { success: true, message: "User authenticated successfully", user };
    } catch (error) {
      console.error("Error during user authentication:", error);
      return { success: false, message: "Error during authentication" };
    }
  }

  // ================================
  // ITEM-RELATED METHODS
  // ================================

  static async uploadItem(itemData: {
    sellerId: number;
    title: string;
    description: string;
    price: number;
    condition: string;
    categoryId: number;
    imageUrls: string[]; // Array of image URLs
    postalInfo: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const { sellerId, title, description, price, condition, categoryId, imageUrls, postalInfo } = itemData;

      // Convert the imageUrls array to PostgreSQL array format
      const formattedImageUrls = `{${imageUrls.map(url => `"${url}"`).join(",")}}`;

      await sql`
        INSERT INTO items (seller_id, title, description, price, condition, category_id, image_urls, postal_info)
        VALUES (
          ${sellerId}, 
          ${title}, 
          ${description}, 
          ${price}, 
          ${condition}, 
          ${categoryId}, 
          ${formattedImageUrls},  -- Manually format the image URLs as a PostgreSQL array
          ${postalInfo}
        )
        RETURNING *;
      `;

      return { success: true, message: "Item uploaded successfully" };
    } catch (error) {
      console.error("Error uploading item:", error);
      return { success: false, message: "Error uploading item" };
    }
  }

  static async fetchItems(): Promise<{ success: boolean; items?: Item[]; message: string }> {
    try {
      const result = await sql<Item[]>`
        SELECT items.*, categories.name as category_name, users.username as seller_username
        FROM items
        JOIN categories ON items.category_id = categories.id
        JOIN users ON items.seller_id = users.id;
      `;
      // @ts-expect-error Ignore TypeScript checking for now
      return { success: true, items: result.rows, message: "Items fetched successfully" };
    } catch (error) {
      console.error("Error fetching items:", error);
      return { success: false, message: "Error fetching items" };
    }
  }

  static async fetchItemById(id: string): Promise<{ success: boolean; item?: Item; message: string }> {
    try {
      const result = await sql<Item[]>`
        SELECT items.*, categories.name as category_name, users.username as seller_username
        FROM items
        JOIN categories ON items.category_id = categories.id
        JOIN users ON items.seller_id = users.id
        WHERE items.id = ${id};
      `;

      if (result.rows.length === 0) {
        return { success: false, message: "Item not found" };
      }
      // @ts-expect-error Ignore TypeScript checking for now
      return { success: true, item: result.rows[0], message: "Item fetched successfully" };
    } catch (error) {
      console.error("Error fetching item:", error);
      return { success: false, message: "Error fetching item" };
    }
  }

  static async fetchCategories(): Promise<{ success: boolean; categories?: Category[]; message: string }> {
    try {
      const result = await sql<Category[]>`
        SELECT * FROM categories;
      `;
      // @ts-expect-error Ignore TypeScript checking for now
      return { success: true, categories: result.rows, message: "Categories fetched successfully" };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Error fetching categories" };
    }
  }
}
