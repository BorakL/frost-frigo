"use client";

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
  address?: string;
  phoneNumber?: string;
}

const SchedulingPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Appointment>();
  const { authUser, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [authUser, loading, router]);

  // Ako postoje podaci u profilu, auto-popuni polja
  useEffect(() => {
    if (userData) {
      if (userData.address) setValue("address", userData.address);
      if (userData.phoneNumber) setValue("phoneNumber", userData.phoneNumber);
    }
  }, [userData, setValue]);

  async function addAppointment(appointmentData: Appointment) {
    try {
      await addDoc(collection(db, "appointments"), {
        ...appointmentData,
        status: "pending",
        createdAt: Timestamp.now(),
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
    return (
      <>
        <HeroSection title="" />
        <p>Provera prijave...</p>
      </>
    );
  }

  return (
    <>
      <HeroSection title="Zakazivanje" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container p-3 mt-4 border rounded bg-light"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="mb-4 text-center">Zakaži servis</h3>

        {/* Datum */}
        <div className="mb-3">
          <label className="form-label">Datum:</label>
          <input
            type="date"
            className="form-control"
            {...register("date", { required: "Datum je obavezan." })}
          />
          {errors.date && (
            <div className="text-danger">{errors.date.message}</div>
          )}
        </div>

        {/* Vreme */}
        <div className="mb-3">
          <label className="form-label">Vreme:</label>
          <input
            type="time"
            className="form-control"
            {...register("time", { required: "Vreme je obavezno." })}
          />
          {errors.time && (
            <div className="text-danger">{errors.time.message}</div>
          )}
        </div>

        {/* Usluga */}
        <div className="mb-3">
          <label className="form-label">Usluga:</label>
          <textarea
            className="form-control"
            {...register("service", { required: "Usluga je obavezna." })}
          />
          {errors.service && (
            <div className="text-danger">{errors.service.message}</div>
          )}
        </div>

        {/* Napomena */}
        <div className="mb-3">
          <label className="form-label">Napomena:</label>
          <textarea className="form-control" {...register("notes")} />
        </div>

        {/* Adresa */}
        <div className="mb-3">
          <label className="form-label">Adresa:</label>
          <input
            type="text"
            className="form-control"
            {...register("address", { required: "Adresa je obavezna." })}
            placeholder="Unesi adresu"
          />
          {errors.address && (
            <div className="text-danger">{errors.address.message}</div>
          )}
        </div>

        {/* Telefon */}
        <div className="mb-3">
          <label className="form-label">Telefon:</label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber", {
              required: "Telefon je obavezan.",
              pattern: {
                value: /^[0-9+\- ]{6,15}$/,
                message: "Unesi validan broj telefona.",
              },
            })}
            placeholder="Unesi broj telefona"
          />
          {errors.phoneNumber && (
            <div className="text-danger">{errors.phoneNumber.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Zakaži
        </button>
      </form>
    </>
  );
};

export default SchedulingPage;
