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
  const { id } = router.query;

  // Type the item state as Item or null
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Page mounted, item ID from query:", id);

    if (id) {
      const fetchItem = async () => {
        console.log(`Fetching item with ID: ${id}`);
        try {
          const res = await fetch(`/api/items/fetch_id/${id}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch item. Status code: ${res.status}`);
          }

          const data = await res.json();
          console.log("Fetch result:", data);

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
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
