import jwt from 'jsonwebtoken';

// Function to create a session token
export function createSessionToken(user: { id: number; username: string; email: string }) {
  const secret = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your secret
  const payload = { id: user.id, username: user.username, email: user.email };
  
  // Sign the JWT with the user info and an expiration time (e.g., 7 days)
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// Function to verify a session token
export function verifySessionToken(token: string) {
  const secret = process.env.JWT_SECRET || 'your-secret-key'; // Ensure the same secret is used
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secret);
    return decoded; // Return the decoded payload (user data)
  } catch (error) {
    console.error('Invalid or expired session token:', error);
    return null; // Return null if token is invalid or expired
  }
}
