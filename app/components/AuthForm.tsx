"use client";

import { useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Konto zostało utworzone");
        setEmail("");
        setPassword("");
        setTimeout(() => router.push("/"), 1000); 
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Zalogowano! Przekierowywanie...");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error: any) {
      setMessage("Błąd: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-[#1D1E22] text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="
    bg-gray-800/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-around gap-6 border border-gray-700/40 transition-all duration-300 hover:shadow-blue-500/10"
      >
        <h1 className="text-4xl font-extrabold text-center tracking-wide drop-shadow-lg">
          {mode === "login" ? "Logowanie" : "Rejestracja"}
        </h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Wprowadź email"
            className="h-14 p-6 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 outline-none text-white hover:bg-gray-700/70 hover:border-gray-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-300">Hasło</label>
          <input
            type="password"
            placeholder="Wprowadź hasło"
            className="h-14 p-6 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 outline-none text-white hover:bg-gray-700/70 hover:border-gray-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          className="bg-blue-600 h-14 rounded-xl font-semibold text-lg hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 cursor-pointer"
          disabled={loading}
        >
          {loading
            ? mode === "login"
              ? "Logowanie..."
              : "Tworzenie..."
            : mode === "login"
            ? "Zaloguj się"
            : "Utwórz konto"}
        </button>

        {message && <p className={`text-center text-lg ${message.startsWith("Błąd") ? "text-red-500" : "text-green-500"}`}>{message}</p>}

        <div className="text-center">
          <p className="text-sm text-gray-400">
            {mode === "login" ? "Nie masz konta?" : "Masz już konto?"}
          </p>
          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
            className="text-blue-400 hover:text-blue-300 font-medium mt-2 transition hover:underline active:scale-95 cursor-pointer"
          >
            {mode === "login" ? "Zarejestruj się" : "Zaloguj się"}
          </button>
        </div>
      </form>
    </div>
  );
}
