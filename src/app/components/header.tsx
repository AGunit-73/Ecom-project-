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
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
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

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="w-full max-w-lg mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-full text-black focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-1 rounded-full"
          >
            Search
          </button>
        </div>
      </form>

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
