"use client";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Controller, useForm } from "react-hook-form";
import HeroSection from "../../components/Hero";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
  userId: string;
  date: string;
  time: string;
  timeSlot: string;
  service: string;
  notes: string;
  address?: string;
  phoneNumber?: string;
}

const SchedulingPage = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Appointment>();
  const { authUser, userData, loading } = useAuth();
  const router = useRouter();

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ];

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

  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate()+1);
  const minDate = tommorow.toISOString().split("T")[0];

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

  if (!authUser) {
    router.push("/login");
    return null; // spreči prikaz stranice dok redirect traje
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
            min={minDate}
          />
          {errors.date && (
            <div className="text-danger">{errors.date.message}</div>
          )}
        </div>

        {/* Vreme */}
        <div className="mb-3">
          <label className="form-label">Vreme:</label>
          {/* Time slot dropdown */}
          <Controller
            control={control}
            name="timeSlot"
            render={({ field }) => (
              <select {...field} className="border rounded p-2">
                <option value="">-- Izaberi vreme --</option>
                {timeSlots.map((slot:string) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.time && (
            <div className="text-danger">{errors.time.message}</div>
          )}
        </div>

        {/* Usluga */}
        <div className="mb-3">
          <label className="form-label">Usluga:</label>
          <select
            className="form-control"
            {...register("service", { required: "Usluga je obavezna." })}
          >
            <option value="">-- Izaberi uslugu --</option>
            <option value="čišćenje">Čišćenje</option>
            <option value="servis">Servis</option>
          </select>
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
          <label className="form-label">Adresa</label>
          <input
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            {...register("address", {
              required: "Adresa je obavezna",
              pattern: {
                value: /^[A-Za-zČĆŽŠĐčćžšđ\s]+ \d+[A-Za-z0-9/-]*,?\s*[A-Za-zČĆŽŠĐčćžšđ\s]*$/,
                message: "Unesi adresu u formatu: Ulica broj[, grad]",
              },
            })}
            placeholder="npr. Bulevar kralja Aleksandra 73, Beograd"
          />
          {typeof errors.address?.message === "string" && (
            <div className="invalid-feedback">{errors.address?.message}</div>
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
