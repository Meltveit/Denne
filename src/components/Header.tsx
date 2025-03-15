// components/Header.tsx
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Min Plattform</h1>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/map">Kart</Link>
          <Link href="/posts">Innlegg</Link>
          {user ? (
            <>
              <Link href={`/profile/${user.uid}`}>Profil</Link>
              <Link href="/messages">Meldinger</Link>
              <button onClick={handleSignOut} className="hover:underline">
                Logg ut
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Logg inn</Link>
              <Link href="/register">Registrer</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}