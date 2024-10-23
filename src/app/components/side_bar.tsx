"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material"; // Import slider from Material UI for price range
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [condition, setCondition] = useState<string[]>([]);
  const [sellerUsername, setSellerUsername] = useState("");

  const router = useRouter();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/items/fetch_category");
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    };
    fetchCategories();
  }, []);

  // Update the selected category when the user selects/deselects a checkbox
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle condition checkbox (new, like new, used)
  const handleConditionChange = (conditionType: string) => {
    setCondition((prev) =>
      prev.includes(conditionType)
        ? prev.filter((c) => c !== conditionType)
        : [...prev, conditionType]
    );
  };

  // Trigger filter change
  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      priceRange,
      condition,
      sellerUsername,
    };
    onFilterChange(filters);
  }, [selectedCategories, priceRange, condition, sellerUsername]);

  return (
    <div className="w-60 bg-white shadow-lg p-4 fixed left-0 top-10 h-full"> {/* Add 'top-10' for padding */}
      {/* Category Filter */}
      <h3 className="font-bold mb-2">Categories</h3>
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryChange(category.id)}
          />
          <label htmlFor={`category-${category.id}`} className="ml-2">
            {category.name}
          </label>
        </div>
      ))}

      {/* Price Range Slider */}
      <h3 className="font-bold mt-4 mb-2">Price Range</h3>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue as number[])}
        valueLabelDisplay="auto"
        min={0}
        max={1000} // Adjust the range as needed
      />
      <p>
        From: ${priceRange[0]} - To: ${priceRange[1]}
      </p>

      {/* Condition Filter */}
      <h3 className="font-bold mt-4 mb-2">Condition</h3>
      <div>
        <input
          type="checkbox"
          id="condition-new"
          checked={condition.includes("new")}
          onChange={() => handleConditionChange("new")}
        />
        <label htmlFor="condition-new" className="ml-2">
          New
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          id="condition-used"
          checked={condition.includes("used")}
          onChange={() => handleConditionChange("used")}
        />
        <label htmlFor="condition-used" className="ml-2">
          Used
        </label>
      </div>

      {/* Seller Search */}
      <h3 className="font-bold mt-4 mb-2">Seller</h3>
      <input
        type="text"
        value={sellerUsername}
        onChange={(e) => setSellerUsername(e.target.value)}
        placeholder="Enter seller's username"
        className="w-full border p-2 rounded"
      />
    </div>
  );
}
