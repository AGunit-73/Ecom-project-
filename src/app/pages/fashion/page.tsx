// src/app/pages/fashion/page.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const pacificoFont = {
  fontFamily: 'Pacifico, cursive',
};

export default function FashionPage() {
  const router = useRouter();

  const handleRedirectToLanding = () => {
    router.push('/');
  };

  useEffect(() => {
    // Dynamically load the Pacifico font from Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Black Top Bar */}
      <header className="fixed top-0 left-0 w-full flex items-center px-8 py-4 bg-black z-10">
        <button
          onClick={handleRedirectToLanding}
          className="text-white bg-transparent hover:text-gray-300 transition text-2xl font-bold mr-8"
          style={pacificoFont}
        >
          Isolora
        </button>

        {/* Search Bar */}
        <div className="flex-grow max-w-2xl mx-auto">
          <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search for items or shops..."
              className="flex-grow bg-transparent focus:outline-none px-2 text-black"
            />
            <button className="text-gray-600 hover:text-gray-800 transition ml-2">
              🔍
            </button>
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => router.push('/cart')}
          className="ml-auto bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
        >
          <FaShoppingCart className="inline-block mr-2" />
          Cart
        </button>
      </header>

      {/* Content Area */}
      <div className="pt-20">
        <h1 className="text-4xl text-center font-bold mt-8">Welcome to the Fashion Page</h1>
        <p className="text-center mt-4 text-gray-600">
          Browse through the latest trends and hottest styles!
        </p>
        {/* Add content for products, categories, and other fashion-related elements here */}
      </div>
    </div>
  );
}
