"use client";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import app from "../firebaseConfig";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("Registrasi berhasil!");
      router.push("/login");
    } catch (err) {
      setError("Registrasi gagal: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Daftar Akun</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" type="email" required /><br />
        <input {...register("password")} placeholder="Password" type="password" required /><br />
        <button type="submit">Daftar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Sudah punya akun? <a href="/login">Login di sini</a>
      </p>
    </div>
  );
}
