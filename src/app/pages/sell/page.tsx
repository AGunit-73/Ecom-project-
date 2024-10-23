"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 12 and earlier
import { useUser } from "@/app/context/usercontext";
import { useDropzone } from "react-dropzone"; // Importing useDropzone from react-dropzone

interface Category {
  id: number;
  name: string;
}

export default function SellPage() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new"); // Default condition
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Support multiple image URLs
  const [postalInfo, setPostalInfo] = useState("");

  // Hard-coded categories
  const categories: Category[] = [
    { id: 1, name: "Fashion for Men" },
    { id: 2, name: "Fashion for Women" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Home" },
    { id: 5, name: "Toys" },
    { id: 6, name: "Books" },
    { id: 7, name: "Others" },
  ];

  const handleDrop = (acceptedFiles: File[]) => {
    const newImageUrls = acceptedFiles.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newImageUrls]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': [] // Accept only image files
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You need to be logged in to upload an item.");
      router.push("/pages/login"); // Redirect to login page
      return;
    }

    try {
      const res = await fetch("/api/items/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price), // Ensure price is a number
          condition,
          categoryId,
          imageUrls, // Submit array of image URLs
          postalInfo,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Item uploaded successfully!");
        router.push("/pages/fashion"); // Redirect to the fashion page
      } else {
        alert(data.message || "Item upload failed.");
      }
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("An error occurred while uploading the item.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Sell Your Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Item Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-semibold mb-2">
            Price ($)
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="condition" className="block text-lg font-semibold mb-2">
            Condition
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="new">New</option>
            <option value="like new">Like New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            value={categoryId || ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Drag and Drop Area for Image Upload */}
        <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-4 rounded mb-4 text-center">
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <p className="text-gray-500">Accepted formats: jpg, png, gif</p>
        </div>

        {/* Display uploaded images */}
        {imageUrls.length > 0 && (
          <div className="flex space-x-2">
            {imageUrls.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Uploaded preview ${index}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        )}

        <div>
          <label htmlFor="postalInfo" className="block text-lg font-semibold mb-2">
            Postal Information
          </label>
          <input
            type="text"
            id="postalInfo"
            value={postalInfo}
            onChange={(e) => setPostalInfo(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Upload Item
        </button>
      </form>
    </div>
  );
}
