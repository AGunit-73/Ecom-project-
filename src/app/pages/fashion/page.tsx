"use client";

import { useRouter } from "next/navigation"; // Correct import for Next.js 12 and earlier
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/side_bar";
import Image from "next/image";
import ApiService from "@/app/api_service/index"; // Ensure this is correct

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

  // State to store the fetched items
  const [items, setItems] = useState([]);

  // Function to fetch items based on filters
  const fetchItems = async (filters: any) => {
    try {
      console.log("Fetching items with filters:", filters); // Log filters being passed
      const result = await ApiService.fetchItems(filters);
      console.log("Result of fetch items:", result); // Log the result
      if (result.success) {
        setItems(result.items);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems({});
  }, []);

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
      <Sidebar currentTab="Fashion" onFilterChange={fetchItems} /> {/* onFilterChange prop will trigger fetchItems */}

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
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">1 Star</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">2 Stars</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">3 Stars</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">4 Stars</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">5 Stars</li>
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
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">$0 - $50</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">$50 - $100</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">$100 - $200</li>
              <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">$200+</li>
            </ul>
          )}
        </div>
      </div>

      {/* Display the fetched items */}
      <div className="pt-4 pl-72">
        <h1 className="text-3xl font-bold text-center mt-8" style={pacificoFont}>
          Fashion Items
        </h1>

        {/* Display fetched items in a grid or list */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items available</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg">
                <Image
                  src={item.image_urls ? item.image_urls[0] : "/images/placeholder.png"} // Add placeholder
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                <p>{item.description}</p>
                <p className="text-lg font-bold mt-2">${item.price}</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => router.push(`/items/${item.id}`)} // Navigate to the item's details page
                >
                  View Item
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
