// src/app/pages/landing/page.tsx

"use client";

// import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import Header from "@/app/components/header"; // Import the Header component

// Import Google Fonts
const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function LandingPage() {
  // const router = useRouter();

  useEffect(() => {
    // Dynamically load the Pacifico font from Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Include the Header component */}
      <Header />

      {/* Container for the Background Images */}
      <div className="relative w-full h-screen flex">
        {/* Background Images Group */}
        <div className="relative h-full w-1/2 flex">
          {/* Background 1 with Trapezium Shape */}
          <div
            className="relative h-full w-1/3"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)",
              transform: "translateX(-8%)",
            }}
          >
            <Image
              src="/images/background.webp"
              alt="Background Trapezium"
              layout="fill"
              objectFit="cover"
              className="image-content"
            />
          </div>

          {/* Background 2 with Parallelogram Shape */}
          <div
            className="relative h-full w-1/3"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
              transform: "translateX(-22%)",
            }}
          >
            <Image
              src="/images/background2.webp"
              alt="Background 2 Parallelogram"
              layout="fill"
              objectFit="cover"
              className="image-content"
            />
          </div>

          {/* Background 3 with Parallelogram Shape */}
          <div
            className="relative h-full w-1/3"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
              transform: "translateX(-36%)",
            }}
          >
            <Image
              src="/images/background3.webp"
              alt="Background 3 Parallelogram"
              layout="fill"
              objectFit="cover"
              className="image-content"
            />
          </div>
        </div>

        {/* White Background on the Right Side */}
        <div className="w-1/2 bg-white flex flex-col items-center justify-start pt-32 p-8">
          {/* Isolora Text */}
          <div className="text-[60px] font-bold text-black" style={{ fontFamily: "Pacifico, sans-serif" }}>
            Isolora
          </div>
          {/* Search Bar */}
          <div className="mt-6 mb-16 w-full max-w-md flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-lg">
            <span className="text-gray-500 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow bg-transparent text-black focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition ml-2">
              Search
            </button>
          </div>

          {/* Bottom Right Text */}
          <div className="text-right mt-8" style={pacificoFont}>
            <h2 className="text-[60px] text-black font-bold">
              &quot;Confidence in our sellers&quot;
            </h2>
            <h2 className="text-[60px] text-black font-bold">
              &quot;Provide the best service for our customers&quot;
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}