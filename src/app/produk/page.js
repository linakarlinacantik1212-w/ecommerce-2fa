"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 🛍️ Daftar produk (pakai file .jpeg)
const products = [
  { id: 1, name: "Banana Cake", price: 60000, image: "/produk1.jpg" },
  { id: 2, name: "Marmer Butter Cake", price: 100000, image: "/produk2.jpg" },
  { id: 3, name: "strawberry sweet lumer", price: 15000, image: "/produk3.jpg" },
  { id: 4, name: "cream puff vanila siram coklat", price: 4000, image: "/produk4.jpg" },
];

export default function ProdukPage() {
  const [cart, setCart] = useState([]); // Simpan data keranjang
  const router = useRouter();

  // 🔹 Ambil keranjang dari localStorage saat halaman pertama kali dibuka
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, []);

  // 🔹 Tambahkan produk ke keranjang
  const addToCart = (item) => {
    if (typeof window === "undefined") return;
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = [...existingCart, item];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${item.name} berhasil ditambahkan ke keranjang 🛒`);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 font-sans p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-10 drop-shadow-md">
        🛍️ Daftar Produk Kami
      </h1>

      {/* 🔹 Daftar produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-xl p-5 w-72 text-center hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-[200px] hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-4">{p.name}</h3>
            <p className="text-blue-600 font-semibold mt-1">
              Rp {p.price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => addToCart(p)}
              className="mt-4 bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 Tombol ke halaman keranjang */}
      <div className="text-center mt-12">
        <button
          onClick={() => router.push("/keranjang")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition"
        >
          🛒 Lihat Keranjang ({cart.length})
        </button>
      </div>
    </div>
  );
}
