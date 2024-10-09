// src/components/CartSidebar.tsx

"use client";

import { useState } from 'react';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={handleToggle}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
      >
        Cart
      </button>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <p className="mt-2">There is nothing in the cart right now.</p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleToggle}
          className="absolute top-4 right-4 bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </>
  );
}
