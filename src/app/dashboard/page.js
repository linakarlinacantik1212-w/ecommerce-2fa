"use client";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [auth, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-800 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[90%] sm:w-[500px] text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Selamat Datang di Dashboard 🌟
        </h1>
        <p className="text-gray-600 mb-6">
          Verifikasi OTP kamu berhasil! Kamu sekarang sudah masuk ke dalam sistem.
        </p>

        {user ? (
          <div className="mb-8">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">Memuat data pengguna...</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Kembali ke Beranda
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Keluar
          </button>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-600">
        <p>
          🔒 Sistem E-Commerce Aman dengan 2FA — Dibuat oleh{" "}
          <b>Tim Cloud & Cyber Security</b>
        </p>
      </footer>
    </div>
  );
}

