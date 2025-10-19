"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 text-gray-800 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md mb-2">
          🌐 E-Commerce 2FA
        </h1>
        <p className="text-lg text-gray-700">
          Keamanan Belanja Online dengan Verifikasi Dua Langkah 🔒
        </p>
      </header>

      {/* Tombol navigasi */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/register"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Daftar Akun
        </Link>

        <Link
          href="/login"
          className="bg-white border border-blue-600 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition"
        >
          Masuk
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-600">
        <p>
          Dibuat dengan ❤️ oleh <b>Tim Cloud & Cyber Security</b>
        </p>
      </footer>
    </div>
  );
}
