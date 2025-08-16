'use client'

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import HeroSection from "../../components/Hero";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
    userId: string;
    date: string;
    time: string;
    service: string;
    notes: string;
}

const SchedulingPage = () => {
    const { register, handleSubmit, reset } = useForm<Appointment>(); 
    const {authUser, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !authUser) {
            router.push("/login")
        }
    }, [authUser, loading, router]);


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
        if (!authUser) return;
        await addAppointment({ ...data, userId: authUser.uid });
    };

    if (loading) {
        return(
        <>
        <HeroSection title=""/>
        <p>Provera prijave...</p>
        </>
        )
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
                
                <p>

                </p>
            </form>
        </>
    );
};

export default SchedulingPage;