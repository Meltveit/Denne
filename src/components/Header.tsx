"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useAuth } from "@/lib/useAuth";
import { auth } from "@/lib/firebase";

export default function Header() {
  const [user, loading] = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const handleProfileClick = () => {
    if (!user && !loading) {
      alert("Please Sign In or Register");
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">My Platform</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/map">Map</Link>
          <Link href="/posts">Posts</Link>
          <div className="relative">
            <button onClick={handleProfileClick} className="hover:underline">
              Profile
            </button>
            {!user && !loading && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md">
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
              </div>
            )}
            {user && !loading && (
              <>
                <Link href={`/profile/${user.uid}`}>Profile</Link>
                <Link href="/messages">Messages</Link>
                <button onClick={handleSignOut} className="hover:underline">
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}