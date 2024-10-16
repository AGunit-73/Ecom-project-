// "use client";

// import { useEffect, useState } from "react";
// import Header from "@/app/components/header";
// import Sidebar from "@/app/components/side_bar";

// interface Item {
//   itemid: number;
//   vendorid: number;
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   stockquantity: number;
//   createdat: string;
// }

// export default function FashionPage() {
//   const [items, setItems] = useState<Item[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [contactVisible, setContactVisible] = useState<{ [key: number]: boolean }>({});

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch("/api/items/get-items");
//         if (!response.ok) throw new Error("Failed to fetch items");

//         const data = await response.json();
//         console.log("Fetched Items:", data);
//         setItems(data);
//       } catch (error: any) {
//         console.error("Error fetching items:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handleBuyClick = (itemId: number) => {
//     setContactVisible((prev) => ({
//       ...prev,
//       [itemId]: true,
//     }));
//   };

//   if (loading) return <p className="pl-72 pt-20">Loading...</p>;
//   if (error) return <p className="pl-72 pt-20 text-red-500">Error: {error}</p>;

//   return (
//     <div className="relative bg-white min-h-screen">
//       {/* Header */}
//       <Header />

//       {/* Sidebar */}
//       <Sidebar currentTab="Fashion" />

//       {/* Items Grid */}
//       <div className="pl-72 pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {items.map((item) => (
//           <div
//             key={item.itemid}
//             className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-bold">{item.name}</h2>
//             <p className="text-gray-600">{item.description}</p>
//             <p className="text-lg font-semibold">${item.price}</p>
//             <p className="text-sm text-gray-500">Category: {item.category}</p>
//             <p className="text-sm">Stock: {item.stockquantity}</p>
//             <p className="text-sm">Vendor ID: {item.vendorid}</p>
//             <p className="text-sm text-gray-500">
//               Added: {new Date(item.createdat).toLocaleDateString()}
//             </p>

//             {/* Buy Button */}
//             <button
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               onClick={() => handleBuyClick(item.itemid)}
//             >
//               Buy
//             </button>

//             {/* Contact Message */}
//             {contactVisible[item.itemid] && (
//               <p className="mt-2 text-green-600 font-bold">Contact</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/side_bar";

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

  if (loading) return <p className="pl-72 pt-20">Loading...</p>;
  if (error) return <p className="pl-72 pt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="relative bg-white min-h-screen">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar currentTab="Fashion" />

      {/* Items Grid */}
      <div className="pl-72 pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.itemid}
            className="bg-black p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-white">{item.name}</h2>
            <p className="text-white">{item.description}</p>
            <p className="text-lg font-semibold text-white">${item.price}</p>
            <p className="text-sm text-white">Category: {item.category}</p>
            <p className="text-sm text-white">Stock: {item.stockquantity}</p>
            <p className="text-sm text-white">Vendor ID: {item.vendorid}</p>
            <p className="text-sm text-white">
              Added: {new Date(item.createdat).toLocaleDateString()}
            </p>

            {/* Buy Button */}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => handleBuyClick(item.itemid)}
            >
              Buy
            </button>

            {/* Contact Message */}
            {contactVisible[item.itemid] && (
              <p className="mt-2 text-green-600 font-bold">Contact</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
