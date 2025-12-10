"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Logout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err: any) {
      alert("Błąd podczas wylogowania: " + err.message);
    }
  };


  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        fixed top-5 right-5 z-50 
        w-14 h-14 flex items-center justify-center 
        bg-[#131A2A] text-white rounded-full shadow-lg shadow-[#354051]/50 border-[#354051] border-2
        overflow-hidden 
        group transition-all duration-300
        hover:w-48
      "
    >
      <span className="text-xl transition-all duration-50 mr-2">
        {isHovered ? "" : <FaSignOutAlt />}
      </span>
      <span className={` w-full absolute right-4 transition-opacity duration-500 font-semibold cursor-pointer ${isHovered ? "opacity-100" : "opacity-0"}`}>
        Wyloguj
      </span>
    </button>
  );
};

export default Logout;
