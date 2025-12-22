"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err: any) {
      alert("Blad podczas wylogowania: " + err.message);
    }
  };

  


  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        fixed top-5 right-5 z-50
        flex items-center gap-2
        bg-[#131A2A] text-white px-4 py-2 rounded-full
        shadow-lg shadow-[#354051]/50 border-[#354051] border-2
        hover:bg-[#1E273B] transition-colors duration-300 cursor-pointer
      "
    >
      <span className="text-xl transition-all duration-50">
        Wyloguj się
      </span>
    </button>
  );
};

