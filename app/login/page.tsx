'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import HeroSection from "../../components/Hero";

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
            router.push("/profile");
        } catch (err) {
            const firebaseError = err as FirebaseError;
            setFirebaseError(firebaseError.message);
        }
    };

    return (
        <>
        <HeroSection title="Login"/>
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email je obavezan",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Neispravan format email-a"
                        }
                    })}
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

                <br />

                <input
                    type="password"
                    placeholder="Lozinka"
                    {...register("password", {
                        required: "Lozinka je obavezna",
                        minLength: {
                            value: 6,
                            message: "Lozinka mora imati bar 6 karaktera"
                        }
                    })}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

                <br />

                <button type="submit">Prijavi se</button>
            </form>

            {firebaseError && <p style={{ color: "red" }}>{firebaseError}</p>}
        </div>
        </>
    );
}
