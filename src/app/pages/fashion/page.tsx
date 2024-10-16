// src/app/pages/fashion/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/side_bar";
import Image from "next/image";

// Import Google Fonts
const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function FashionPage() {
  const router = useRouter();
  const [filterDropdown, setFilterDropdown] = useState({
    price: false,
    rating: false,
  });

  const handleRedirectToShop = () => {
    router.push("/pages/shop");
  };

  const toggleDropdown = (type: "price" | "rating") => {
    setFilterDropdown((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    // Dynamically load the Pacifico font from Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Include the Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar currentTab="Fashion" />

      {/* Filter Options Below the Top Bar and Next to the Sidebar */}
      <div className="flex pt-20 pl-72 space-x-4">
        {/* Rating Dropdown */}
        <div className="relative">
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded-full transition duration-200 hover:bg-gray-400"
            onClick={() => toggleDropdown("rating")}
            style={pacificoFont} // Apply the font style here
          >
            Rating
          </button>
          {filterDropdown.rating && (
            <ul className="absolute left-0 mt-1 bg-white shadow-lg z-10">
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                1 Star
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                2 Stars
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                3 Stars
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                4 Stars
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                5 Stars
              </li>
            </ul>
          )}
        </div>

        {/* Price Range Dropdown */}
        <div className="relative">
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded-full transition duration-200 hover:bg-gray-400"
            onClick={() => toggleDropdown("price")}
            style={pacificoFont} // Apply the font style here
          >
            Price
          </button>
          {filterDropdown.price && (
            <ul className="absolute left-0 mt-1 bg-white shadow-lg z-10">
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                $0 - $50
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                $50 - $100
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                $100 - $200
              </li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                $200+
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Example Image Button */}
      <div className="flex justify-center items-center pt-8 pl-72">
        <button onClick={handleRedirectToShop} className="focus:outline-none">
          <Image
            src="/images/example.png" // Update the path to where your image is stored
            alt="Example"
            width={300}
            height={200}
            className="rounded-lg hover:shadow-lg transition duration-200"
          />
        </button>
      </div>

      {/* Main content of the Fashion page */}
      <div className="pt-4 pl-72">
        <h1
          className="text-3xl font-bold text-center mt-8"
          style={pacificoFont} // Apply the font style to the header
        >
          Fashion Page
        </h1>
        {/* Your other page content */}
      </div>
    </div>
  );
}