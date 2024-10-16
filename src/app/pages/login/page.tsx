"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/usercontext";

const pacificoFont = {
  fontFamily: "Pacifico, cursive",
};

export default function LoginPage() {
  const { setUser } = useUser();
  const router = useRouter();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginUsernameOrEmail, setLoginUsernameOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [userType, setUserType] = useState("customer"); // For dropdown selection

  const handleLogin = async () => {
    console.log("Attempting login with:", {
      email: loginUsernameOrEmail,
      password: loginPassword,
      userType,
    });

    try {
      const endpoint = userType === "vendor" ? "/api/vendor/login" : "/api/customer/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginUsernameOrEmail,
          password: loginPassword,
        }),
      });
      const data = await res.json();
      console.log("Login response:", data);
      console.log(data.message.user.name);
      if (data.success) {
        setUser(data.message.user);
        router.push("/"); // Redirect to homepage after successful login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const handleSignup = async () => {
    console.log("Attempting signup with:", {
      name: signupUsername,
      email: signupEmail,
      password: signupPassword,
      userType,
    });

    try {
      const endpoint = userType === "vendor" ? "/api/vendor/add-vendor" : "/api/customer/add-customer";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupUsername,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (data.success && data.user) {
        setUser(data.user);
        alert("Signup successful. Please log in.");
        setIsSignupOpen(false);
      } else {
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

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
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

      <div className="w-2/5 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Huge market, Free services!
        </h1>
        <p className="text-lg mb-8 text-black">
          Work with vendors across the world
        </p>
        <form autoComplete="off" className="w-full max-w-sm">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="mb-4 p-2 border rounded w-full text-black"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
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
          By logging in or signing up, you are officially eligible for Isolora merchant!
        </p>
      </div>

      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-black">Sign Up</h2>
            <form autoComplete="off">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
              <input
                type="text"
                placeholder="Username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="mb-4 p-2 border rounded w-full text-black"
              />
              <input
                type="password"
                placeholder="Password"
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

      <div className="relative w-3/5 h-screen">
        <Image
          src="/images/background4.webp"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute top-[55%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-[40px] text-center">
          &quot;One For ALL App! Start NOW!&quot;
        </div>
      </div>
    </div>
  );
}
