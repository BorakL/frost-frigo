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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Ime:</label>
        <input {...register("name", { required: "Ime je obavezno" })} />
        {typeof errors.name?.message === 'string' && <p>{errors.name?.message}</p>}
      </div>

      <div>
        <label>Adresa:</label>
        <input {...register("address", { required: "Adresa je obavezna" })} />
        {typeof errors.address?.message === 'string' && <p>{errors.address?.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email", { required: "Email je obavezan" })} />
        {typeof errors.email?.message === 'string' && <p>{errors.email?.message}</p>}
      </div>

      <div>
        <label>Lozinka:</label>
        <input
          type="password"
          {...register("password", {
            required: "Lozinka je obavezna",
            minLength: { value: 6, message: "Lozinka mora imati bar 6 karaktera" },
          })}
        />
        {typeof errors.password?.message === 'string' && <p>{errors.password?.message}</p>}
      </div>

      <button type="submit">Registruj se</button>
    </form>
    </>
  );
}
