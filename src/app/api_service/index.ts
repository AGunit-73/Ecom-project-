// import { sql } from "@vercel/postgres";
// import { encryptEmail } from "@/app/components/encrypt_email";
// import { hashPassword, comparePassword } from "@/app/components/hash_password";

// // Define the User type to include the 'password' field.
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   password: string; // Ensure this is included for password comparison.
// }

// export default class ApiService {
//   /**
//    * Registers a new user.
//    * @param {string} username - The username of the new user.
//    * @param {string} email - The email of the new user.
//    * @param {string} password - The password of the new user.
//    * @returns {Promise<{ success: boolean; message: string; user?: User }>}
//    */
//   static async registerUser(
//     username: string,
//     email: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
//       const encryptedEmail = encryptEmail(email);
//       const hashedPassword = await hashPassword(password);

//       // SQL query to insert the user into the database.
//       const result = await sql<User[]>`
//         INSERT INTO users (username, email, password)
//         VALUES (${username}, ${encryptedEmail}, ${hashedPassword})
//         RETURNING id, username, email, password;
//       `;

//       const user = result.rows[0];

//       return {
//         success: true,
//         message: "User registered successfully",
//         user,
//       };
//     } catch (error) {
//       console.error("Error during user registration:", error);

//       return { success: false, message: "Error registering user" };
//     }
//   }

//   /**
//    * Authenticates a user with their username/email and password.
//    * @param {string} usernameOrEmail - The username or email of the user.
//    * @param {string} password - The password of the user.
//    * @returns {Promise<{ success: boolean; message: string; user?: User }>}
//    */
//   static async authenticateUser(
//     usernameOrEmail: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
//       console.log("Received login data:", { usernameOrEmail, password });
//       const encryptedEmail = encryptEmail(usernameOrEmail);
//       console.log("Encrypted email during login:", encryptedEmail);

//       // Retrieve user by username or encrypted email
//       const result = await sql<User[]>`
//         SELECT id, username, email, password FROM users
//         WHERE username = ${usernameOrEmail} OR email = ${encryptedEmail};
//       `;

//       console.log("Query result:", result);

//       // Log the rows directly before further processing
//       if (result.rows.length === 0) {
//         console.log("No user found with the provided username or email.");
//         return { success: false, message: "User not found" };
//       }

//       const user = result.rows[0];
//       console.log("User found:", user);

//       // Compare the provided password with the stored hashed password
//       const isValidPassword = await comparePassword(password, user.password);
//       console.log("Is password valid?", isValidPassword);

//       if (!isValidPassword) {
//         return {
//           success: false,
//           message: "Invalid password",
//         };
//       }

//       return {
//         success: true,
//         message: "User authenticated successfully",
//         user,
//       };
//     } catch (error) {
//       console.error("Error during user authentication:", error);
//       return { success: false, message: "Error during authentication" };
//     }
//   }
// }

// import { sql } from "@vercel/postgres";
// import { encryptEmail } from "@/app/components/encrypt_email";
// import { hashPassword, comparePassword } from "@/app/components/hash_password";

// // Define the User type to include the 'password' field.
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   password: string; // Ensure this is included for password comparison.
// }

// export default class ApiService {
//   /**
//    * Registers a new user.
//    * @param {string} username - The username of the new user.
//    * @param {string} email - The email of the new user.
//    * @param {string} password - The password of the new user.
//    * @returns {Promise<{ success: boolean; message: string; user?: User }>}
//    */
//   static async registerUser(
//     username: string,
//     email: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
      

//       // SQL query to insert the user into the database.
//       const result = await sql<User[]>`
//         INSERT INTO users (username, email, password)
//         VALUES (${username}, ${email}, ${password})
//         RETURNING id, username, email, password;
//       `;

//       const user = result.rows[0];

//       return {
//         success: true,
//         message: "User registered successfully",
//         user,
//       };
//     } catch (error) {
//       console.error("Error during user registration:", error);

//       return { success: false, message: "Error registering user" };
//     }
//   }

//   /**
//    * Authenticates a user with their username/email and password.
//    * @param {string} usernameOrEmail - The username or email of the user.
//    * @param {string} password - The password of the user.
//    * @returns {Promise<{ success: boolean; message: string; user?: User }>}
//    */
//   static async authenticateUser(
//     usernameOrEmail: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
//       console.log("Received login data:", { usernameOrEmail, password });

//       // Retrieve user by username or encrypted email
//       const result = await sql<User[]>`
//         SELECT id, username, email, password FROM users
//         WHERE username = ${usernameOrEmail} OR email = ${usernameOrEmail};
//       `;

//       console.log("Query result:", result);

//       // Log the rows directly before further processing
//       if (result.rows.length === 0) {
//         console.log("No user found with the provided username or email.");
//         return { success: false, message: "User not found" };
//       }

//       const user = result.rows[0];
//       console.log("User found:", user);

//       // Compare the provided password with the stored hashed password
//       const isValidPassword = password === user.password;
//     console.log("Is password valid?", isValidPassword);

//       if (!isValidPassword) {
//         return {
//           success: false,
//           message: "Invalid password",
//         };
//       }

//       return {
//         success: true,
//         message: "User authenticated successfully",
//         user,
//       };
//     } catch (error) {
//       console.error("Error during user authentication:", error);
//       return { success: false, message: "Error during authentication" };
//     }
//   }
// }

// import { sql } from "@vercel/postgres";

// // Define the Vendor and Customer types
// interface Vendor {
//   name: string;
//   email: string;
//   password : string;
//   phone?: string;
//   address?: string;

// }

// interface Customer {
//   name: string;
//   email: string;
//   password : string;
//   phone?: string;
//   address?: string;
// }

// export default class ApiService {
//   /**
//    * Registers a new vendor.
//    * @param {string} name - The name of the vendor.
//    * @param {string} email - The email of the vendor.
//    * @param {string} password
//    * @param {string} phone - The phone number of the vendor.
//    * @param {string} address - The address of the vendor.
//    * @returns {Promise<{ success: boolean; message: string; vendor?: Vendor }>}
//    */
//   static async registerVendor(
//     name: string,
//     email: string,
//     password: string,
//     phone?: string,
//     address?: string
//   ): Promise<{ success: boolean; message: string; vendor?: Vendor }> {
//     try {
//       // SQL query to insert the vendor into the database
//       const result = await sql<Vendor[]>`
//         INSERT INTO Vendor (name, email, phone, address)
//         VALUES (${name}, ${email}, ${password}, ${phone}, ${address})
//         RETURNING id, name, email, pssword, phone, address;
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

//   /**
//    * Registers a new customer.
//    * @param {string} name - The name of the customer.
//    * @param {string} email - The email of the customer.
//    * @param {string} password
//    * @param {string} phone - The phone number of the customer.
//    * @param {string} address - The address of the customer.
//    * @returns {Promise<{ success: boolean; message: string; customer?: Customer }>}
//    */
//   static async registerCustomer(
//     name: string,
//     email: string,
//     password: string,
//     phone?: string,
//     address?: string
//   ): Promise<{ success: boolean; message: string; customer?: Customer }> {
//     try {
//       // SQL query to insert the customer into the database
//       const result = await sql<Customer[]>`
//         INSERT INTO Customer (name, email, phone, address)
//         VALUES (${name}, ${email}, ${password}, ${phone}, ${address})
//         RETURNING id, name, email, phone, address;
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

//   /**
//    * Authenticates a vendor or customer with their email.
//    * @param {string} email - The email of the vendor or customer.
//    * @param {string} password
//    * @returns {Promise<{ success: boolean; message: string; user?: Vendor | Customer }>}
//    */
//   static async authenticateUser(
//     email: string,
//     password: string
//   ): Promise<{ success: boolean; message: string; user?: Vendor | Customer }> {
//     try {
//       // SQL query to find the user (vendor or customer) by email
//       const result = await sql<Vendor[] | Customer[]>`
//         SELECT id, name, email, phone, address FROM Vendor
//         WHERE email = ${email}
//         UNION
//         SELECT id, name, email, phone, address FROM Customer
//         WHERE email = ${email};
//       `;

//       if (result.rows.length === 0) {
//         return { success: false, message: "User not found" };
//       }

//       const user = result.rows[0]; // Could be a vendor or customer

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
// }


import { sql } from "@vercel/postgres";

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
      const result = await sql<Vendor[]>`
        INSERT INTO Vendor (name, email, password, phone, address)
        VALUES (${name}, ${email}, ${password}, ${phone ?? null}, ${address ?? null})
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
      const result = await sql<Customer[]>`
        INSERT INTO Customer (name, email, password, phone, address)
        VALUES (${name}, ${email}, ${password}, ${phone ?? null}, ${address ?? null})
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
      const result = await sql<Vendor[] | Customer[]>`
        SELECT vendorid, name, email, password, phone, address FROM Vendor
        WHERE email = ${email}
        UNION
        SELECT customerid, name, email, password, phone, address FROM Customer
        WHERE email = ${email};
      `;

      if (result.rows.length === 0) {
        console.log("No user found with the provided email.");
        return { success: false, message: "User not found" };
      }

      const user = result.rows[0]; // Either a vendor or customer
      console.log("User found:", user);

      // Note: You should hash the password and compare the hashed value.
      if (user.password !== password) {
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