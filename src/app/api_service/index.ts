// import { sql } from "@vercel/postgres";

// // Define the Vendor, Customer, and Item types
// interface Vendor {
//   vendorid?: number;
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   address?: string;
// }

// interface Customer {
//   customerid?: number;
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   address?: string;
// }

// interface Item {
//   itemid?: number;
//   vendorid: number;
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   stockquantity: number;
//   createdat?: Date;
// }

// export default class ApiService {
//   // Vendor registration
//   static async registerVendor(
//     name: string,
//     email: string,
//     password: string,
//     phone?: string,
//     address?: string
//   ): Promise<{ success: boolean; message: string; vendor?: Vendor }> {
//     try {
//       const result = await sql<Vendor[]>`
//         INSERT INTO Vendor (name, email, password, phone, address)
//         VALUES (${name}, ${email}, ${password}, ${phone ?? null}, ${address ?? null})
//         RETURNING vendorid, name, email, password, phone, address;
//       `;

//       const vendor = result.rows[0];
//       return {
//         success: true,
//         message: "Vendor registered successfully",
//         vendor,
//       };
//     } catch (error) {
//       console.error("Error during vendor registration:", error);
//       return { success: false, message: "Error registering vendor" };
//     }
//   }

//   // Customer registration
//   static async registerCustomer(
//     name: string,
//     email: string,
//     password: string,
//     phone?: string,
//     address?: string
//   ): Promise<{ success: boolean; message: string; customer?: Customer }> {
//     try {
//       const result = await sql<Customer[]>`
//         INSERT INTO Customer (name, email, password, phone, address)
//         VALUES (${name}, ${email}, ${password}, ${phone ?? null}, ${address ?? null})
//         RETURNING customerid, name, email, password, phone, address;
//       `;

//       const customer = result.rows[0];
//       return {
//         success: true,
//         message: "Customer registered successfully",
//         customer,
//       };
//     } catch (error) {
//       console.error("Error during customer registration:", error);
//       return { success: false, message: "Error registering customer" };
//     }
//   }

//   // User authentication (for Vendor and Customer)
//   static async authenticateUser(
//     email: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: Vendor | Customer }> {
//     console.log("Authenticating user with email:", email);

//     try {
//       const result = await sql<Vendor[] | Customer[]>`
//         SELECT vendorid, name, email, password, phone, address FROM Vendor
//         WHERE email = ${email}
//         UNION
//         SELECT customerid, name, email, password, phone, address FROM Customer
//         WHERE email = ${email};
//       `;

//       if (result.rows.length === 0) {
//         console.log("No user found with the provided email.");
//         return { success: false, message: "User not found" };
//       }

//       const user = result.rows[0]; // Either a vendor or customer
//       console.log("User found:", user);

//       // Note: You should hash the password and compare the hashed value.
//       if (user.password !== password) {
//         console.log("Password mismatch for user:", email);
//         return { success: false, message: "Invalid password" };
//       }

//       return {
//         success: true,
//         message: "User authenticated successfully",
//         user,
//       };
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       return { success: false, message: "Error during authentication" };
//     }
//   }

//   // Add item functionality
//   static async addItem(
//     vendorid: number,
//     name: string,
//     description: string,
//     price: string,
//     category: string,
//     stockquantity: number
//   ): Promise<{ success: boolean; message: string; item?: Item }> {
//     console.log("Adding item with data:", { vendorid, name, description, price, category, stockquantity });

//     try {
//       const result = await sql<Item[]>`
//         INSERT INTO items (vendorid, name, description, price, category, stockquantity)
//         VALUES (${vendorid}, ${name}, ${description}, ${price}, ${category}, ${stockquantity})
//         RETURNING itemid, vendorid, name, description, price, category, stockquantity, createdat;
//       `;

//       const item = result.rows[0];
//       console.log("Item added successfully:", item);
//       return {
//         success: true,
//         message: "Item added successfully",
//         item,
//       };
//     } catch (error) {
//       console.error("Error adding item:", error);
//       return { success: false, message: "Error adding item" };
//     }
//   }
// }

import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Use fixed encryption key and IV, stored in environment variables
const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY!, "hex"); // 32 bytes for AES-256
const iv = Buffer.from(process.env.ENCRYPTION_IV!, "hex"); // 16 bytes for IV

// Function to encrypt email
function encryptEmail(email: string): string {
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv); // Use the correct IV
  let encrypted = cipher.update(email, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted; // No need to return the IV again, since it's fixed
}

// Function to decrypt email
function decryptEmail(encryptedEmail: string): string {
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv); // Use the correct IV
  let decrypted = decipher.update(encryptedEmail, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Define the Vendor, Customer, and Item types
interface Vendor {
  vendorid?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

interface Customer {
  customerid?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

interface Item {
  itemid?: number;
  vendorid: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stockquantity: number;
  createdat?: Date;
}

export default class ApiService {
  // Vendor registration
  static async registerVendor(
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ): Promise<{ success: boolean; message: string; vendor?: Vendor }> {
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Encrypt the email
      const encryptedEmail = encryptEmail(email);

      const result = await sql<Vendor[]>`
        INSERT INTO Vendor (name, email, password, phone, address)
        VALUES (${name}, ${encryptedEmail}, ${hashedPassword}, ${phone ?? null}, ${address ?? null})
        RETURNING vendorid, name, email, password, phone, address;
      `;

      const vendor = result.rows[0];
      return {
        success: true,
        message: "Vendor registered successfully",
        vendor,
      };
    } catch (error) {
      console.error("Error during vendor registration:", error);
      return { success: false, message: "Error registering vendor" };
    }
  }

  // Customer registration
  static async registerCustomer(
    name: string,
    email: string,
    password: string,
    phone?: string,
    address?: string
  ): Promise<{ success: boolean; message: string; customer?: Customer }> {
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Encrypt the email
      const encryptedEmail = encryptEmail(email);

      const result = await sql<Customer[]>`
        INSERT INTO Customer (name, email, password, phone, address)
        VALUES (${name}, ${encryptedEmail}, ${hashedPassword}, ${phone ?? null}, ${address ?? null})
        RETURNING customerid, name, email, password, phone, address;
      `;

      const customer = result.rows[0];
      return {
        success: true,
        message: "Customer registered successfully",
        customer,
      };
    } catch (error) {
      console.error("Error during customer registration:", error);
      return { success: false, message: "Error registering customer" };
    }
  }

  // User authentication (for Vendor and Customer)
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: Vendor | Customer }> {
    console.log("Authenticating user with email:", email);

    try {
      const encryptedEmail = encryptEmail(email); // Encrypt email for comparison

      const result = await sql<Vendor[] | Customer[]>`
        SELECT vendorid, name, email, password, phone, address FROM Vendor
        WHERE email = ${encryptedEmail}
        UNION
        SELECT customerid, name, email, password, phone, address FROM Customer
        WHERE email = ${encryptedEmail};
      `;

      if (result.rows.length === 0) {
        console.log("No user found with the provided email.");
        return { success: false, message: "User not found" };
      }

      const user = result.rows[0]; // Either a vendor or customer
      console.log("User found:", user);

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.log("Password mismatch for user:", email);
        return { success: false, message: "Invalid password" };
      }

      return {
        success: true,
        message: "User authenticated successfully",
        user,
      };
    } catch (error) {
      console.error("Error during authentication:", error);
      return { success: false, message: "Error during authentication" };
    }
  }

  // Add item functionality
  static async addItem(
    vendorid: number,
    name: string,
    description: string,
    price: string,
    category: string,
    stockquantity: number
  ): Promise<{ success: boolean; message: string; item?: Item }> {
    console.log("Adding item with data:", { vendorid, name, description, price, category, stockquantity });

    try {
      const result = await sql<Item[]>`
        INSERT INTO items (vendorid, name, description, price, category, stockquantity)
        VALUES (${vendorid}, ${name}, ${description}, ${price}, ${category}, ${stockquantity})
        RETURNING itemid, vendorid, name, description, price, category, stockquantity, createdat;
      `;

      const item = result.rows[0];
      console.log("Item added successfully:", item);
      return {
        success: true,
        message: "Item added successfully",
        item,
      };
    } catch (error) {
      console.error("Error adding item:", error);
      return { success: false, message: "Error adding item" };
    }
  }
}
