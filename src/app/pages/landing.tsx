"use client"; // Mark this file as a Client Component

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [vendor, setVendor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Zoom-in animation on load
    gsap.to('.image-frame', {
      scale: 3, // Zoom into the character's face
      duration: 2,
      ease: 'power2.out',
    });

    // Zoom-out animation on scroll
    gsap.to('.image-frame', {
      scale: 1,
      x: -200, // Move to the left
      scrollTrigger: {
        trigger: '.content-section',
        start: 'top top',
        end: 'top 50%',
        scrub: true, // Smooth animation with scroll
      },
    });

    // Fade out the welcome message on scroll
    gsap.to('.welcome-message', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.content-section',
        start: 'top top',
        end: 'top center',
        scrub: true,
      },
    });

    // Flip animation for the image frame
    gsap.to('.image-frame', {
      rotationY: 180, // Flip effect
      scrollTrigger: {
        trigger: '.flip-section',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
  }, []);

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
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <header className="top-bar">
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="login-button">Sign In</button>
      </header>

      <div className="frame-container">
        <div className="image-frame">
          <img
            src={imageUrl || '/images/default.jpg'}
            alt="Character Placeholder"
            className="image-content"
          />
        </div>
        <div className="welcome-message">
          <h1>Welcome to Our World</h1>
        </div>
      </div>

      <section className="content-section">
        <div className="info-section">
          <h2>About Our Site</h2>
          <p>Details about the site and its offerings...</p>
        </div>
      </section>

      <section className="flip-section">
        <div className="image-frame">
          <img src="/images/second-image.jpg" alt="Second Image" className="image-content" />
        </div>
        <div className="info-section">
          <h2>More Information</h2>
          <p>Additional details about the site...</p>
        </div>
      </section>

      <div className="form-section" style={{ backgroundColor: 'white', padding: '40px', maxWidth: '600px', margin: '40px auto', borderRadius: '10px' }}>
        <h1 style={{ textAlign: 'center', color: '#FF6F61', marginBottom: '30px' }}>Add New Item</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
    </div>
  );
}