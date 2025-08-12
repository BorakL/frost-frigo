'use client'

// SignUp.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import HeroSection from '../../components/Hero';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();


  interface UserData {
    name: string,
    address: string,
    email:string,
    password: string,
  }

  const onSubmit = async (data: UserData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      // Čuvamo dodatne informacije o korisniku u Firestore
      await setDoc(doc(db, "clients", user.uid), {
        name: data.name,
        address: data.address,
        email: data.email
      });
      alert("Uspešna registracija!");
    } catch (err) {
        const firebaseError = err as FirebaseError;
        console.error("Greška pri registraciji:", firebaseError.message);
        alert(firebaseError.message);
    }
  };

  return (
    <>
    <HeroSection title="Registracija"/>
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4 p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '500px' }}>
  <h3 className="mb-4 text-center">Registruj se</h3>

  <div className="mb-3">
    <label className="form-label">Ime</label>
    <input
      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
      {...register("name", { required: "Ime je obavezno" })}
    />
    {typeof errors.name?.message === 'string' && (
      <div className="invalid-feedback">{errors.name?.message}</div>
    )}
  </div>

  <div className="mb-3">
    <label className="form-label">Adresa</label>
    <input
      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
      {...register("address", { required: "Adresa je obavezna" })}
    />
    {typeof errors.address?.message === 'string' && (
      <div className="invalid-feedback">{errors.address?.message}</div>
    )}
  </div>

  <div className="mb-3">
    <label className="form-label">Email</label>
    <input
      type="email"
      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
      {...register("email", { required: "Email je obavezan" })}
    />
    {typeof errors.email?.message === 'string' && (
      <div className="invalid-feedback">{errors.email?.message}</div>
    )}
  </div>

  <div className="mb-3">
    <label className="form-label">Lozinka</label>
    <input
      type="password"
      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
      {...register("password", {
        required: "Lozinka je obavezna",
        minLength: { value: 6, message: "Lozinka mora imati bar 6 karaktera" },
      })}
    />
    {typeof errors.password?.message === 'string' && (
      <div className="invalid-feedback">{errors.password?.message}</div>
    )}
  </div>

  <button type="submit" className="btn btn-primary w-100">Registruj se</button>
</form>
    </>
  );
}
