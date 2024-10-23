// "use client";

// import { useEffect, useState } from "react";
// import Header from "@/app/components/header";
// import Sidebar from "@/app/components/side_bar";

// export default function FashionAndAddItemPage() {
//   const [items, setItems] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [stockQuantity, setStockQuantity] = useState('');
//   const [vendorId, setVendorId] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newItem = {
//       vendorid: parseInt(vendorId),
//       name,
//       description,
//       price: parseFloat(price),
//       category,
//       stockquantity: parseInt(stockQuantity),
//     };

//     try {
//       const response = await fetch('/api/items/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newItem),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add item');
//       }

//       setMessage('Item added successfully!');
//       fetchItems(); // Refresh the item list after adding a new item
//     } catch (error) {
//       console.error('Error adding item:', error);
//       setMessage('Error occurred while adding item.');
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       const response = await fetch('/api/items/get-items');
//       const data = await response.json();
//       setItems(data); // Update state with fetched items
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchItems(); // Fetch items on component mount
//   }, []);

//   return (
//     <div className="relative bg-white min-h-screen flex">
//       <Header />


//       <div className="flex-grow pt-20 flex">
//         {/* Left Half - Add Item Form */}
//         <div className="w-1/2 p-4 flex flex-col max-h-screen overflow-y-auto">
//           <h1 className="text-3xl font-bold mb-6 text-pink-500">Add New Item</h1>
//           {message && <div className="text-pink-500 mb-4">{message}</div>}
//           <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg flex-grow">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-pink-400">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-pink-400">Description</label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//                 rows={3} // Adjust the number of rows for a better view
//               />
//             </div>
//             <div>
//               <label htmlFor="price" className="block text-sm font-medium text-pink-400">Price</label>
//               <input
//                 type="number"
//                 id="price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-pink-400">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="stockQuantity" className="block text-sm font-medium text-pink-400">Stock Quantity</label>
//               <input
//                 type="number"
//                 id="stockQuantity"
//                 value={stockQuantity}
//                 onChange={(e) => setStockQuantity(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="vendorId" className="block text-sm font-medium text-pink-400">Vendor ID</label>
//               <input
//                 type="number"
//                 id="vendorId"
//                 value={vendorId}
//                 onChange={(e) => setVendorId(e.target.value)}
//                 className="border rounded p-2 w-full bg-gray-800 border-pink-500 text-white"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all duration-300"
//             >
//               Add Item
//             </button>
//           </form>
//         </div>

//         {/* Right Half - Fashion Items */}
//         <div className="w-1/2 p-4 overflow-y-auto">
//           <h1 className="text-3xl font-bold text-center mt-8">Fashion Items</h1>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//             {items.map(item => (
//               <div key={item.itemid} className="border rounded-lg p-4 bg-black shadow-lg text-white">
//                 <h2 className="font-bold text-xl">{item.name}</h2>
//                 <p className="text-sm">{item.description}</p>
//                 <p>Price: ${item.price}</p>
//                 <p>Category: {item.category}</p>
//                 <p>Stock: {item.stockquantity}</p>
//                 <p>Created At: {new Date(item.createdat).toLocaleString()}</p>
//                 <button className="bg-pink-500 text-white py-1 px-3 rounded hover:bg-pink-600 mt-2" onClick={() => alert("Contact")}>
//                   Buy
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";

export default function FashionAndAddItemPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State to handle modal
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success notification

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      vendorid: parseInt(vendorId),
      name,
      description,
      price: parseFloat(price),
      category,
      stockquantity: parseInt(stockQuantity),
    };

    try {
      const response = await fetch("/api/items/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      setMessage("Item added successfully!");
      fetchItems(); // Refresh the item list after adding a new item
      setShowModal(false); // Close modal after successful submit
      setShowSuccessPopup(true); // Show success pop-up

      // Automatically hide the success pop-up after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Error occurred while adding item.");
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items/get-items");
      const data = await response.json();
      setItems(data); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items on component mount
  }, []);

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Header />

      <div className="flex-grow pt-16 flex flex-col items-center">
        {/* Fashion Items Grid */}
        <div className="w-full px-8">
          <h1 className="text-3xl font-bold text-center mb-6">Fashion Items</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.itemid}
                className="border rounded-lg p-4 bg-white shadow-md transition-all hover:shadow-lg text-black"
              >
                <h2 className="font-bold text-lg mb-2 text-black">{`${item.name} (ID: ${item.itemid})`}</h2>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
                <p className="text-sm text-gray-500">Stock: {item.stockquantity}</p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(item.createdat).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Item Button */}
        <button
          className="fixed bottom-8 right-8 bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => setShowModal(true)}
        >
          Add Item
        </button>

        {/* Modal for Add Item Form */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>
              {message && <div className="text-green-500 mb-4">{message}</div>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                  />
                </div>
                <div>
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
                    Vendor ID
                  </label>
                  <input
                    type="number"
                    id="vendorId"
                    value={vendorId}
                    onChange={(e) => setVendorId(e.target.value)}
                    className="border rounded p-2 w-full text-black" // Set text color to black
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-gray-500 mr-4"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Notification Pop-up */}
        {showSuccessPopup && (
          <div className="fixed bottom-16 right-8 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-all">
            Item added successfully!
          </div>
        )}
      </div>
    </div>
  );
}
