"use client"; // Mark this file as a Client Component

import { useState } from 'react';

export default function VendorPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
          vendor,
          image_url: imageUrl || 'https://example.com/default.jpg', // default image if not provided
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Item added successfully!');
        // Optionally clear the form
        setName('');
        setPrice('');
        setDescription('');
        setVendor('');
        setImageUrl('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding item. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '40px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#FF6F61', marginBottom: '30px' }}>Add New Item</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none', minHeight: '100px' }}
        />
        <input
          type="text"
          placeholder="Vendor Name"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ backgroundColor: '#FF6F61', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Add Item
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', color: '#28A745', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}
