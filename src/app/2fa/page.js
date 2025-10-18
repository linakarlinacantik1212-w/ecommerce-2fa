"use client";
import { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../firebaseConfig";
import { useRouter } from "next/navigation";

export default function TwoFactorAuth() {
  const [auth, setAuth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ Pastikan Firebase Auth hanya dibuat di client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const firebaseAuth = getAuth(app);
      setAuth(firebaseAuth);

      // Nonaktifkan verifikasi SMS saat testing
      if (firebaseAuth?.settings) {
        firebaseAuth.settings.appVerificationDisabledForTesting = true;
      }
    }
  }, []);

  // 🔹 Setup reCAPTCHA setelah Auth siap
  useEffect(() => {
    if (auth && typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA verified!");
          },
        }
      );
      window.recaptchaVerifier.render();
    }
  }, [auth]);

  // 🔹 Fungsi kirim OTP
  const sendOTP = async () => {
    try {
      if (!auth || !window.recaptchaVerifier) {
        setMessage("Auth atau reCAPTCHA belum siap, coba ulangi sebentar lagi.");
        return;
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setMessage("Kode OTP telah dikirim ke nomor Anda!");
    } catch (error) {
      console.error(error);
      setMessage("Gagal mengirim OTP: " + error.message);
    }
  };

  // 🔹 Fungsi verifikasi OTP
  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Verifikasi OTP berhasil!");
      router.push("/dashboard");
    } catch (error) {
      setMessage("Kode OTP salah atau kadaluarsa.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}>
      <h2>Verifikasi 2FA (OTP)</h2>
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <>
          <input
            type="text"
            placeholder="Masukkan Nomor HP (+62...)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button onClick={sendOTP}>Kirim OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Masukkan Kode OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button onClick={verifyOTP}>Verifikasi</button>
        </>
      )}

      {message && <p style={{ color: message.includes("Gagal") ? "red" : "green" }}>{message}</p>}
    </div>
  );
}
