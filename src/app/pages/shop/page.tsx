// src/app/pages/shop/page.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

const pacificoFont = {
  fontFamily: 'Pacifico, cursive',
};

export default function ShopPage() {
  const router = useRouter();

  const handleRedirectToLanding = () => {
    router.push('/pages/landing');
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
        <button
          onClick={handleRedirectToLanding}
          className="text-white text-2xl"
          style={pacificoFont}
        >
          Isolora
        </button>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search for items or shops..."
            className="w-full max-w-lg px-4 py-2 rounded-full border focus:outline-none text-black"
          />
        </div>

        {/* Cart Sidebar */}
      </header>

      {/* Main content of the Shop page */}
      <div className="pt-20 px-8 flex space-x-8 items-start">
        {/* Product Image */}
        <div className="w-1/2">
          <Image
            src="/images/example2.png"
            alt="Product Image"
            width={600}
            height={600}
            className="rounded shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-black">adidas men Ultraboost Running Shoes</h1>
          <p className="text-gray-600 mt-2">Free Shipping & Returns</p>
          <p className="text-gray-600 mt-1">adidas (512235)</p>
          <p className="text-black text-2xl mt-4">US $24.00</p>
          <p className="text-sm text-gray-500 line-through">List price US $80.00</p>
          <p className="text-sm text-green-500">Save US $56.00 (70% off)</p>

          <p className="text-black mt-4">Condition: <span className="font-bold">New with box</span></p>

          {/* Quantity */}
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-black">Quantity:</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded mt-2 text-black"
              defaultValue="1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full w-full hover:bg-blue-700 transition">
              Buy It Now
            </button>
            <button className="bg-white text-blue-600 border-blue-600 border px-4 py-2 rounded-full w-full hover:bg-blue-100 transition">
              Add to Cart
            </button>
            <button className="bg-white text-blue-600 border-blue-600 border px-4 py-2 rounded-full w-full hover:bg-blue-100 transition">
              ♡ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
