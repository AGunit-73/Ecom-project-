// src/app/pages/login/page.tsx

"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Import Google Fonts
const pacificoFont = {
  fontFamily: 'Pacifico, cursive',
};

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Perform login logic or route to another page
  };

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
    <div className="relative bg-white min-h-screen flex">
      {/* Isolora Button */}
      <button
        onClick={handleRedirectToLanding}
        className="absolute top-4 left-4 text-black bg-transparent hover:text-blue-500 transition text-6xl font-bold"
        style={pacificoFont}
      >
        Isolora
      </button>

      {/* Container for the Content on the Left Side */}
      <div className="w-2/5 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-black">Huge market, Free services!</h1>
        <p className="text-lg mb-8 text-black">Work with vendors across the world</p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="mt-4 text-blue-600 underline"
        >
          Sign Up
        </button>
        <p className="mt-8 text-sm text-gray-600">
          By logging in or signing up, you are officially eligible for Isolora merchant!
        </p>
      </div>

      {/* Container for the Background Image on the Right Side */}
      <div className="relative w-3/5 h-screen">
        <div
          className="relative h-full w-full"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%)', // Adjusted for a straight right edge
          }}
        >
          <Image
            src="/images/background4.webp"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="image-content"
          />
        </div>

        {/* Quoted Text slightly below center and to the right */}
        <div className="absolute top-[55%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[40px] text-center">
          &quot;One For ALL App! Start NOW!&quot;
        </div>
      </div>
    </div>
  );
}
