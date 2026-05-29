import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(request) {
  const { phoneNumber, otp } = await request.json();

  const stored = otpStore.get(phoneNumber);

  if (!stored) {
    return NextResponse.json(
      { error: "OTP tidak ditemukan. Minta OTP baru." },
      { status: 400 }
    );
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(phoneNumber);
    return NextResponse.json(
      { error: "OTP sudah kadaluarsa. Minta OTP baru." },
      { status: 400 }
    );
  }

  if (stored.otp !== otp) {
    return NextResponse.json(
      { error: "Kode OTP salah." },
      { status: 400 }
    );
  }

  // OTP valid → hapus dari store
  otpStore.delete(phoneNumber);
  return NextResponse.json({ success: true });
}