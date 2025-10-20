"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KeranjangPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Ambil data dari localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Hapus item dari keranjang
  const removeItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Hitung total harga
  const totalHarga = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 font-sans p-6">
      <h1 className="text-4xl font-extrabold text-green-700 text-center mb-8">
        🛍️ Keranjang Belanja Kamu
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-700 mt-20">
          <p className="text-lg mb-4">Keranjang kamu masih kosong 😅</p>
          <button
            onClick={() => router.push("/produk")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Lihat Produk
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-green-600 font-bold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: Rp {totalHarga.toLocaleString("id-ID")}
            </h2>

            {/* 🔹 Tombol ke halaman checkout */}
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Lanjut ke Checkout 💳
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Tombol kembali ke dashboard */}
      <div className="text-center mt-10">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}
