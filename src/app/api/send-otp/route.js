import { NextResponse } from "next/server";

// Simpan OTP sementara di memory (untuk production pakai Redis/DB)
const otpStore = new Map();

export async function POST(request) {
  const { phoneNumber } = await request.json();

  // Validasi nomor
  if (!phoneNumber || !phoneNumber.startsWith("+62")) {
    return NextResponse.json(
      { error: "Format nomor salah. Gunakan +62..." },
      { status: 400 }
    );
  }

  // Generate OTP 6 digit
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Simpan OTP dengan expiry 5 menit
  otpStore.set(phoneNumber, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  // Format nomor untuk Fonnte (tanpa + di depan)
  const target = phoneNumber.replace("+", "");

  // Kirim OTP via Fonnte
  const response = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      Authorization: process.env.FONNTE_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      target,
      message: `Kode OTP kamu adalah: *${otp}*\n\nBerlaku selama 5 menit. Jangan bagikan kode ini ke siapapun.`,
      countryCode: "62",
    }),
  });

  const result = await response.json();

  if (!result.status) {
    return NextResponse.json(
      { error: "Gagal mengirim OTP: " + result.reason },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// Ekspor otpStore agar bisa diakses route verify
export { otpStore };