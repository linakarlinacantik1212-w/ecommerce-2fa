"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [metode, setMetode] = useState("Transfer Bank");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const totalHarga = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !alamat) {
      alert("Mohon isi semua data pembeli terlebih dahulu.");
      return;
    }

    // Simpan data pembelian ke localStorage (sementara)
    const orderData = {
      nama,
      alamat,
      metode,
      totalHarga,
      waktu: new Date().toLocaleString("id-ID"),
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Kosongkan keranjang
    localStorage.removeItem("cart");

    // Arahkan ke halaman sukses
    router.push("/pembelian-sukses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 font-sans p-6">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-8">
        💳 Checkout Pembelian
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-700 mt-20">
          <p className="text-lg mb-4">Keranjang kamu kosong 😅</p>
          <button
            onClick={() => router.push("/produk")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Kembali ke Produk
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ringkasan Pesanan 🧾
          </h2>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between py-3 text-gray-700">
                <span>{item.name}</span>
                <span className="font-semibold text-blue-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-right mb-8">
            Total:{" "}
            <span className="text-blue-700">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Pembeli 🧍‍♀️</h2>

            <div>
              <label className="block text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Metode Pembayaran</label>
              <select
                value={metode}
                onChange={(e) => setMetode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Transfer Bank</option>
                <option>COD (Bayar di Tempat)</option>
                <option>GoPay</option>
                <option>OVO</option>
                <option>Dana</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => router.push("/keranjang")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
              >
                Kembali ke Keranjang
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Konfirmasi Pembelian ✅
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
