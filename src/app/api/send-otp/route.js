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
      message: `🛍️ *Verifikasi Akun Anda*\n\nHalo! Kami menerima permintaan login ke akun Anda di *Ecommerce 2FA*.\n\nGunakan kode OTP berikut untuk melanjutkan:\n\n🔐 *${otp}*\n\n⏰ Kode berlaku selama *5 menit*\n⚠️ Jangan bagikan kode ini kepada siapapun, termasuk pihak yang mengaku dari tim kami.\n\n_Jika kamu tidak merasa melakukan permintaan ini, abaikan pesan ini._\n\n— Tim Ecommerce 2FA`,
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