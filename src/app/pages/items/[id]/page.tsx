import { useRouter } from "next/router"; // Correct import for Next.js 12 and earlier
import Image from 'next/image';

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  categoryId: number;
  imageUrl: string[]; // Assuming array of image URLs
  postalInfo: string;
}

interface ItemPageProps {
  item: Item;
}

export default function ItemPage({ item }: ItemPageProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-600 underline"
      >
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Displaying the list of images using next/image */}
        <div className="space-y-4">
          {item.imageUrl.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={item.title}
              width={500} // Set appropriate width
              height={300} // Set appropriate height
              className="w-full h-80 object-cover rounded-lg"
            />
          ))}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-gray-600 mb-2">Condition: {item.condition}</p>
          <p className="text-gray-600 mb-2">Price: ${item.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">Postal Info: {item.postalInfo}</p>
          <p className="text-gray-800">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
