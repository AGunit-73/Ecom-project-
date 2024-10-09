// src/app/pages/fashion/page.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartSidebar from '@/app/components/cart_side_bar';
import Sidebar from '@/app/components/side_bar';
import Image from 'next/image'; // Import Image from Next.js

// Import Google Fonts
const pacificoFont = {
  fontFamily: 'Pacifico, cursive',
};

export default function FashionPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filterDropdown, setFilterDropdown] = useState({ price: false, rating: false });

  const handleRedirectToLanding = () => {
    router.push('/pages/landing');
  };

  const handleRedirectToShop = () => {
    router.push('/pages/shop'); // Redirect to shop page
  };

  const toggleDropdown = (type) => {
    setFilterDropdown(prev => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    // Dynamically load the Pacifico font from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Black Top Bar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black z-10">
        <div>
          <button
            onClick={handleRedirectToLanding}
            className="text-white text-2xl font-bold"
            style={pacificoFont}
          >
            Isolora
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for items or shops..."
            className="w-full max-w-lg px-4 py-2 rounded-full border focus:outline-none"
          />
        </div>

        {/* Cart Button */}
        <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={() => setSidebarOpen(true)}>
          Cart
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar currentTab="Fashion" />

      {/* Filter Options Below the Top Bar and Next to the Sidebar */}
      <div className="flex pt-20 pl-72 space-x-4"> {/* Adjusting for fixed header and padding left for the sidebar */}
        {/* Rating Dropdown */}
        <div className="relative">
          <button
            className="bg-gray-300 text-black px-6 py-2 rounded-full transition duration-200 hover:bg-gray-400"
            onClick={() => toggleDropdown('rating')}
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
            onClick={() => toggleDropdown('price')}
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

      {/* Example Image Button */}
      <div className="flex justify-center items-center pt-8 pl-72"> {/* Adjust padding to position correctly */}
        <button onClick={handleRedirectToShop} className="focus:outline-none">
          <Image
            src="/images/example.png" // Update the path to where your image is stored
            alt="Example"
            width={300} // Adjust size as needed
            height={200} // Adjust size as needed
            className="rounded-lg hover:shadow-lg transition duration-200"
          />
        </button>
      </div>

      {/* Main content of the Fashion page */}
      <div className="pt-4 pl-72"> {/* Adjust padding to prevent overlap */}
        <h1 className="text-3xl font-bold text-center mt-8">Fashion Page</h1>
        {/* Your other page content */}
      </div>

      {/* Cart Sidebar */}
      {isSidebarOpen && <CartSidebar onClose={() => setSidebarOpen(false)} cartItems={cartItems} />}
    </div>
  );
}