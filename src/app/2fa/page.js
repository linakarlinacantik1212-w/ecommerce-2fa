"use client";
import { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function TwoFactorAuth() {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => console.log("reCAPTCHA verified"),
        }
      );
    }
  }, [auth]);

  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+62")) {
      setMessage("Gunakan format nomor dengan +62 (contoh: +6281234567890)");
      return;
    }

    setLoading(true);
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setMessage("✅ Kode OTP telah dikirim ke nomor Anda!");
    } catch (error) {
      setMessage("❌ Gagal mengirim OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setMessage("✅ Verifikasi berhasil!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setMessage("⚠️ Kode OTP salah atau kadaluarsa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 font-sans">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] sm:w-[400px] text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Verifikasi OTP 🔐</h2>
        <p className="text-gray-600 mb-6">
          Masukkan nomor HP Anda untuk mendapatkan kode verifikasi.
        </p>

        <div id="recaptcha-container" className="flex justify-center mb-4"></div>

        {!confirmationResult ? (
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
              {loading ? "Mengirim OTP..." : "Kirim OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
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
          </div>
        )}

        {message && (
          <p className="text-sm text-gray-700 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
