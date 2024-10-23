import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  postalInfo: string;
}

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query; // Capturing the dynamic id from the URL

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Page mounted, item ID:", id); // Log the item ID from the URL

    if (id) {
      // Fetch item data based on the id
      const fetchItem = async () => {
        console.log(`Fetching item with ID: ${id}`);
        try {
          const res = await fetch(`/api/items/fetch_id/${id}`); // Call the correct API route for fetching item by id
          if (!res.ok) {
            throw new Error(`Failed to fetch item. Status code: ${res.status}`);
          }

          const data = await res.json();
          console.log("Fetch result:", data); // Log the result from the API

          if (data.success) {
            setItem(data.item);
            setError(null);
          } else {
            console.error("Item fetch failed:", data.message);
            setError(data.message);
          }
        } catch (error) {
          console.error("Error fetching item:", error);
          setError("Error fetching item details.");
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id]);

  if (loading) {
    console.log("Loading state..."); // Log loading state
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error occurred:", error); // Log if there’s an error
    return <p>{error}</p>;
  }

  if (!item) {
    console.log("No item found."); // Log if no item found
    return <p>Item not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          console.log("Going back to previous page");
          router.back();
        }}
        className="mb-4 text-blue-600 underline"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-gray-600 mb-2">Condition: {item.condition}</p>
          <p className="text-gray-600 mb-2">Price: ${item.price}</p>
          <p className="text-gray-600 mb-4">Postal Info: {item.postalInfo}</p>
          <p className="text-gray-800">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
