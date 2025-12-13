"use client";

import { useAuth } from ".././hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingPage from "../components/LoadingPage";
import Choice from "../components/gameComponents/Choice";

export default function GamePage() {
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
    <div className="w-full h-full">
      <Choice/>
    </div>
  );
}
