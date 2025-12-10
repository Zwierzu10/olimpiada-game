"use client";

import { useAuth } from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import MainMenu from "./components/MainMenu";
import LoadingPage from "./components/LoadingPage";





export default function Home() {

 const { user, loading } = useAuth();
 const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
   if (loading)
  return (
    <LoadingPage />
  );

  if (!user) return null;

  return (
   <div className="CONTAINER w-full h-full flex justify-center items-center bg-gray-200">
      <MainMenu/>
   </div>
  );
}
