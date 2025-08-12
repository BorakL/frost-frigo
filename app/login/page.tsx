'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import HeroSection from "../../components/Hero";
import Link from "next/link";

interface UserData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();
  const [firebaseError, setFirebaseError] = useState("");

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    setFirebaseError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/klijent");
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setFirebaseError(firebaseError.message);
    }
  };

  const handleGoogleLogin = async () => {
    setFirebaseError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/klijent");
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setFirebaseError(firebaseError.message);
    }
  };

  return (
    <>
      <HeroSection title="Login" />
      <div className="d-flex justify-content-center align-items-center bg-light mt-4">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Prijava</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email adresa</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Unesite email"
                {...register("email", {
                  required: "Email je obavezan",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Neispravan format email-a",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Lozinka */}
            <div className="mb-3">
              <label className="form-label">Lozinka</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Unesite lozinku"
                {...register("password", {
                  required: "Lozinka je obavezna",
                  minLength: {
                    value: 6,
                    message: "Lozinka mora imati bar 6 karaktera",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>

            {/* Error poruka iz Firebase-a */}
            {firebaseError && (
              <div className="alert alert-danger py-2">{firebaseError}</div>
            )}

            {/* Submit dugme */}
            <button type="submit" className="btn btn-primary w-100 mb-2">
              Prijavi se
            </button>
          </form>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline-danger w-100"
          >
            <i className="bi bi-google me-2"></i> Prijavi se preko Google-a
          </button>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span>Nemate nalog? </span>
        <Link href="/registracija">Registrujte se ovde</Link>
      </div>
    </>
  );
}
