"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/usercontext";

const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function Header() {
  const { user, setUser, logout } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "POST",
      });

      logout(); // Clear the user context
      setUser(null); // Clear user state
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // This will ensure that the user state is set when the component mounts
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user); // Set the user in context
        } else {
          setUser(null); // Clear the user if no session
        }
      } catch (error) {
        console.error("Error fetching user on page load:", error);
      }
    };

    fetchUser(); // Fetch the user when the component mounts
  }, [setUser]);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black z-10">
      <button
        onClick={() => router.push("/")}
        className="text-white font-bold"
        style={{ ...pacificoFont, fontSize: "36px" }}
      >
        Isolora
      </button>

      <nav className="flex space-x-8">
        <button
          onClick={() => router.push("/pages/fashion")}
          className="text-white hover:text-pink-300 transition"
          style={{ ...pacificoFont, fontSize: "24px" }}
        >
          Fashion
        </button>
        <button
          onClick={() => router.push("/pages/travel")}
          className="text-white hover:text-pink-300 transition"
          style={{ ...pacificoFont, fontSize: "24px" }}
        >
          Travel
        </button>
        <button
          onClick={() => router.push("/pages/entertainment")}
          className="text-white hover:text-pink-300 transition"
          style={{ ...pacificoFont, fontSize: "24px" }}
        >
          Entertainment
        </button>
      </nav>

      <div className="relative">
        {user ? (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white"
          >
            Hello, {user.username}
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
