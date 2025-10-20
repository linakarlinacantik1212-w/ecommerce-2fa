"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PembelianSukses() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lastOrder"));
    setOrder(saved);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Belum ada data pembelian.</h2>
        <button
          onClick={() => router.push("/produk")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Belanja Sekarang 🛍️
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-6 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center w-[90%] sm:w-[500px]">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          🎉 Pembelian Berhasil!
        </h1>
        <p className="text-gray-700 mb-4">
          Terima kasih, <span className="font-semibold">{order.nama}</span>!
        </p>
        <p className="text-gray-600 mb-2">
          Pesananmu akan dikirim ke alamat berikut:
        </p>
        <p className="font-medium text-gray-800 mb-4">{order.alamat}</p>
        <p className="text-gray-700 mb-2">
          Metode Pembayaran: <b>{order.metode}</b>
        </p>
        <p className="text-blue-700 font-bold text-lg mb-4">
          Total: Rp {order.totalHarga.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Waktu Pembelian: {order.waktu}
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
