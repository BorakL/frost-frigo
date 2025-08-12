'use client'

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useForm } from "react-hook-form";
import HeroSection from "../../components/Hero";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";

interface Appointment {
    userId: string;
    date: string;
    time: string;
    service: string;
    notes: string;
}

const SchedulingPage = () => {
    const { register, handleSubmit, reset } = useForm<Appointment>();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    async function addAppointment(appointmentData: Appointment) {
        try {
            await addDoc(collection(db, "appointments"), {
                ...appointmentData,
                status: "pending",
                createdAt: Timestamp.now()
            });
            alert("Zakazivanje sačuvano!");
            reset();
        } catch (error) {
            console.error("Greška pri dodavanju termina:", error);
        }
    }

    const onSubmit = async (data: Appointment) => {
        if (!user) return;
        await addAppointment({ ...data, userId: user.uid });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                router.push("/login");
            } else {
                setUser(firebaseUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <p className="text-center mt-5">Učitavanje...</p>;
    }

    return (
        <>
            <HeroSection title="Zakazivanje" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="container p-3 mt-4 border rounded bg-light"
                style={{ maxWidth: '500px' }}
            >
                <h3 className="mb-4 text-center">Zakaži servis</h3>
                <div className="mb-3">
                    <label className="form-label">Datum:</label>
                    <input
                        type="date"
                        className="form-control"
                        {...register("date", { required: true })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Vreme:</label>
                    <input
                        type="time"
                        className="form-control"
                        {...register("time", { required: true })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Usluga:</label>
                    <textarea
                        className="form-control"
                        {...register("service", { required: true })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Napomena:</label>
                    <textarea
                        className="form-control"
                        {...register("notes")}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Zakaži</button>
            </form>
        </>
    );
};

export default SchedulingPage;