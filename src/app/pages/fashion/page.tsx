
"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";

interface Item {
  itemid: number;
  vendorid: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stockquantity: number;
  createdat: string;
}

export default function FashionPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactVisible, setContactVisible] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items/get-items");
        if (!response.ok) throw new Error("Failed to fetch items");

        const data = await response.json();
        console.log("Fetched Items:", data);
        setItems(data);
      } catch (error: any) {
        console.error("Error fetching items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleBuyClick = (itemId: number) => {
    setContactVisible((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="relative bg-white min-h-screen gap-6">
      {/* Header */}
      <Header  />

      {/* Items Grid */}
      <div className="container mx-auto px-6 py-40 gap-20" >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.itemid}
              className="bg-black p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-white mb-2">{item.name}</h2>
              <p className="text-white mb-1">{item.description}</p>
              <p className="text-lg font-semibold text-white mb-1">${item.price}</p>
              <p className="text-sm text-white mb-1">Category: {item.category}</p>
              <p className="text-sm text-white mb-1">Stock: {item.stockquantity}</p>
              <p className="text-sm text-white mb-1">Vendor ID: {item.vendorid}</p>
              <p className="text-sm text-white mb-2">
                Added: {new Date(item.createdat).toLocaleDateString()}
              </p>

              {/* Buy Button */}
              <button
                className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => handleBuyClick(item.itemid)}
              >
                Buy
              </button>

              {/* Contact Message */}
              {contactVisible[item.itemid] && (
                <p className="mt-2 text-green-600 font-bold text-center">Contact</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
