"use client"; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  vendor: string;
  image_url: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the items from the backend API
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/get-items');
        const data = await response.json();

        if (data.success) {
          setItems(data.items);
        } else {
          console.error('Error fetching items');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Link href="/vendor" passHref>
        <button style={styles.linkButton}>
          Go to Vendor Page
        </button>
      </Link>
      <h1 style={styles.heading}>Items for Sale</h1>
      <div style={styles.itemsGrid}>
        {items.map((item) => (
          <div key={item.id} style={styles.itemCard}>
            <img src={item.image_url} alt={item.name} style={styles.image} />
            <h2 style={styles.itemName}>{item.name}</h2>
            <p style={styles.itemPrice}>Price: ${item.price}</p>
            <p style={styles.itemDescription}>{item.description}</p>
            <p style={styles.itemVendor}>Vendor: {item.vendor}</p>
            <button style={styles.addButton}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '40px',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center' as const,
    color: '#FF6F61', // Vibrant color for heading
    marginBottom: '30px',
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  itemCard: {
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center' as const,
    transition: 'transform 0.2s ease-in-out',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  itemName: {
    color: '#007BFF', // Vibrant color for item names
    fontSize: '18px',
    marginBottom: '10px',
  },
  itemPrice: {
    color: '#28A745', // Vibrant green for price
    fontSize: '16px',
    marginBottom: '10px',
  },
  itemDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  itemVendor: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#888',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#FF6F61', // Vibrant color for button
    color: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
