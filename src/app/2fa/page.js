"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+62")) {
      setMessage("Gunakan format +62 (contoh: +6281234567890)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ " + data.error);
        return;
      }

      setOtpSent(true);
      setMessage("✅ Kode OTP telah dikirim ke WhatsApp kamu!");
    } catch {
      setMessage("❌ Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ " + data.error);
        return;
      }

      setMessage("✅ Verifikasi berhasil! Mengalihkan...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setMessage("❌ Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[400px] text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Verifikasi OTP 🔐</h2>
        <p className="text-gray-600 mb-6">
          Masukkan nomor HP untuk mendapatkan kode OTP via WhatsApp.
        </p>

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nomor HP (+62...)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendOTP}
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Mengirim OTP..." : "Kirim OTP via WhatsApp"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Kode dikirim ke: <strong>{phoneNumber}</strong></p>
            <input
              type="text"
              placeholder="Masukkan Kode OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={verifyOTP}
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Memverifikasi..." : "Verifikasi"}
            </button>
            <button
              onClick={() => { setOtpSent(false); setMessage(""); }}
              className="text-sm text-blue-500 hover:underline"
            >
              Ganti nomor / Kirim ulang
            </button>
          </div>
        )}

        {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
      </div>
    </div>
  );
}