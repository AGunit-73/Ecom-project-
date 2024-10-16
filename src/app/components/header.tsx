// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useUser } from "@/app/context/usercontext";

// // Define the Pacifico font style for the header
// const pacificoFont = {
//   fontFamily: "Pacifico, cursive",
// };

// export default function Header() {
//   const { user, setUser, logout } = useUser();
//   const router = useRouter();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setUser(null); // Clear the user context
//     router.push("/");
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black z-10">
//       {/* Logo Button */}
//       <button
//         onClick={() => router.push("/")}
//         className="text-white font-bold"
//         style={{ ...pacificoFont, fontSize: "36px" }} // Increased font size
//       >
//         Isolora
//       </button>

//       {/* Navigation Links */}
//       <nav className="flex space-x-8">
//         <button
//           onClick={() => router.push("/pages/fashion")}
//           className="text-white hover:text-pink-300 transition"
//           style={{ ...pacificoFont, fontSize: "24px" }} // Increased font size
//         >
//           Fashion
//         </button>
//         <button
//           onClick={() => router.push("/pages/add-item")}
//           className="text-white hover:text-pink-300 transition"
//           style={{ ...pacificoFont, fontSize: "24px" }} // Increased font size
//         >
//           add items 
//         </button>

//       </nav>

//       {/* User Dropdown or Log In Button */}
//       <div className="relative">
//         {user ? (
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-white"
//           >
//             <span style={{color:"white"}}>Hello, {user.email}</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => router.push("/pages/login")}
//             className="bg-pink-500 text-white px-4 py-2 rounded transition hover:bg-pink-600"
//           >
//             Log In
//           </button>
//         )}
//         {dropdownOpen && (
//           <ul className="absolute right-0 mt-2 bg-white shadow-lg text-black py-2">
//             <li>
//               <button
//                 onClick={() => router.push("/pages/sell")}
//                 className="block px-4 py-2 w-full text-left"
//               >
//                 Sell
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => router.push("/cart")}
//                 className="block px-4 py-2 w-full text-left"
//               >
//                 Cart
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="block px-4 py-2 w-full text-left"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//       </div>
//     </header>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/context/usercontext";

// Define the Pacifico font style for the header
const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function Header() {
  const { user, setUser, logout } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUser(null); // Clear the user context
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black z-10">
      {/* Logo Button */}
      <button
        onClick={() => router.push("/")}
        className="text-white font-bold"
        style={{ ...pacificoFont, fontSize: "36px" }} // Increased font size
      >
        Isolora
      </button>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <button
          onClick={() => router.push("/pages/fashion")}
          className="text-white hover:text-pink-300 transition"
          style={{ ...pacificoFont, fontSize: "24px" }} // Increased font size
        >
          Fashion
        </button>

        {/* Conditionally render 'Add Items' button */}
        {user && (
          <button
            onClick={() => router.push("/pages/add-item")}
            className="text-white hover:text-pink-300 transition"
            style={{ ...pacificoFont, fontSize: "24px" }} // Increased font size
          >
            Add Items
          </button>
        )}
      </nav>

      {/* User Dropdown or Log In Button */}
      <div className="relative">
        {user ? (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white"
          >
            <span>Hello, {user.email}</span>
          </button>
        ) : (
          <button
            onClick={() => router.push("/pages/login")}
            className="bg-pink-500 text-white px-4 py-2 rounded transition hover:bg-pink-600"
          >
            Log In
          </button>
        )}

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 bg-white shadow-lg text-black py-2">
            <li>
              <button
                onClick={() => router.push("/pages/sell")}
                className="block px-4 py-2 w-full text-left"
              >
                Sell
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/cart")}
                className="block px-4 py-2 w-full text-left"
              >
                Cart
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
