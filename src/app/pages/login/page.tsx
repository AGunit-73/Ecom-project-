"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/usercontext";

const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function LoginPage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginUsernameOrEmail, setLoginUsernameOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: loginUsernameOrEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user); // Update the user context
        document.cookie = `sessionToken=${data.token}; path=/;`; // Save the token in cookies
        router.push("/"); // Redirect to the homepage after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      
      const data = await res.json();
      
      if (data.success && data.user) {
        // Set the user in context to log them in immediately after signup
        setUser(data.user);
  
        // Redirect to the homepage
        router.push("/");
  
      } else {
        // Display error message only if registration fails
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  const handleRedirectToLanding = () => {
    router.push("/");
  };

  // Automatically check for session token on page load
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionToken="))
      ?.split("=")[1];

    if (token) {
      // Fetch the current user from /api/user/me using the session token
      fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user); // Set the user in context
          }
        })
        .catch((error) => {
          console.error("Error during token verification:", error);
        });
    }
  }, []);

  return (
    <div className="relative bg-white min-h-screen flex">
      <button
        onClick={handleRedirectToLanding}
        className="absolute top-4 left-4 text-black bg-transparent hover:text-blue-500 transition text-6xl font-bold"
        style={pacificoFont}
      >
        Isolora
      </button>

      {/* Container for the Content on the Left Side */}
      <div className="w-2/5 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Huge market, Free services!
        </h1>
        <p className="text-lg mb-8 text-black">
          Work with vendors across the world
        </p>
        <form autoComplete="off" name="login-form" className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Email or Username"
            autoComplete="new-username"
            value={loginUsernameOrEmail}
            onChange={(e) => setLoginUsernameOrEmail(e.target.value)}
            className="mb-4 p-2 border rounded w-full text-black"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="mb-4 p-2 border rounded w-full text-black"
          />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              Log In
            </button>
          </div>
        </form>
        <button
          onClick={() => setIsSignupOpen(true)}
          className="mt-4 text-blue-600 underline"
        >
          Sign Up
        </button>
        <p className="mt-8 text-sm text-gray-600">
          By logging in or signing up, you are officially eligible for Isolora
          merchant!
        </p>
      </div>

      {/* Signup Form Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-black">Sign Up</h2>
            <form autoComplete="off" name="signup-form">
              <input
                type="text"
                placeholder="Username"
                autoComplete="new-username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              />
              <input
                type="email"
                placeholder="Email"
                autoComplete="new-email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              />
              <button
                type="button"
                onClick={handleSignup}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setIsSignupOpen(false)}
                className="mt-4 text-red-600 underline w-full"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Container for the Background Image on the Right Side */}
      <div className="relative w-3/5 h-screen">
        <div
          className="relative h-full w-full"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%)" }}
        >
          <Image
            src="/images/background4.webp"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-[55%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[40px] text-center">
          &quot;One For ALL App! Start NOW!&quot;
        </div>
      </div>
    </div>
  );
}
