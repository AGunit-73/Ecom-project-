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

      const result = await sql<User[]>`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${encryptedEmail}, ${hashedPassword})
        RETURNING id, username, email, password;
      `;

      const user = result.rows[0];

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
      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return { success: false, message: "Invalid password" };
      }

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

      const result = await sql`
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
  // Fetching items and categories methods remain unchanged...
  static async fetchItems(
    filters?: {
      categories?: number[];
      priceRange?: [number, number];
      condition?: string[];
      sellerUsername?: string;
    }
): Promise<{ success: boolean; items?: Item[]; message: string }> {
    try {
        let query = `
            SELECT items.*, categories.name as category_name, users.username as seller_username
            FROM items
            JOIN categories ON items.category_id = categories.id
            JOIN users ON items.seller_id = users.id
            WHERE 1 = 1
        `;

        const params: any[] = [];

        // Apply filters dynamically
        if (filters) {
            if (filters.categories?.length) {
                console.log("Applying category filters:", filters.categories);
                query += ` AND items.category_id = ANY(${sql.array(filters.categories)})`;
            }
            if (filters.priceRange) {
                console.log("Applying price range filter:", filters.priceRange);
                query += ` AND items.price BETWEEN $${params.length + 1} AND $${params.length + 2}`;
                params.push(filters.priceRange[0], filters.priceRange[1]);
            }
            if (filters.condition?.length) {
                console.log("Applying condition filters:", filters.condition);
                query += ` AND items.condition = ANY(${sql.array(filters.condition)})`;
            }
            if (filters.sellerUsername) {
                console.log("Applying seller username filter:", filters.sellerUsername);
                query += ` AND users.username = $${params.length + 1}`;
                params.push(filters.sellerUsername);
            }
        }

        // Log the constructed query and params for debugging
        console.log("Constructed SQL Query:", query);
        console.log("Parameters:", params);

        const result = await sql<Item[]>`${sql([query], ...params)}`;
        
        console.log("Query Result:", result.rows); // Log the result of the query

        return { success: true, items: result.rows, message: "Items fetched successfully" };
    } catch (error) {
        console.error("Error fetching items:", error);
        return { success: false, message: "Error fetching items" };
    }
}

  static async fetchCategories(): Promise<{ success: boolean; categories?: any[]; message: string }> {
    try {
      const result = await sql`
        SELECT * FROM categories;
      `;

      return { success: true, categories: result.rows, message: "Categories fetched successfully" };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Error fetching categories" };
    }
  }
}
