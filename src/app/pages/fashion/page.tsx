"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link component

// Define the structure of an Item
interface Item {
  id: number;
  title: string;
  price: number;
  image_urls: string[];
}

export default function FashionPage() {
  const [items, setItems] = useState<Item[]>([]); // Explicitly tell useState it's holding an array of Item

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items/fetch_items');
      const data = await response.json();

      console.log("Fetched items response:", data); // Log the response for debugging

      if (data.success) {
        setItems(data.items);
        console.log("Items state updated:", data.items);
      } else {
        console.error("Failed to fetch items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Include the Header */}
      <Header />

      <div className="pt-4 pl-72">
        <h1 className="text-3xl font-bold text-center mt-8">
          Fashion Items
        </h1>

        {/* Display fetched items in a grid or list */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {items.length === 0 ? (
            <p className="col-span-3 text-center">No items available</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg">
                <Image
                  src={item.image_urls?.length > 0 ? item.image_urls[0] : "/default-image.jpg"} // Fallback to default image
                  alt={item.title}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                <p className="text-lg font-bold mt-2">${item.price}</p>
                <Link href={`/items/${item.id}`} passHref>
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    View Item
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
