'use client'

import HeroSection from "../../components/Hero";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import {
  doc, setDoc, collection, query,
  where, orderBy, limit, getDocs,
  startAfter, QueryDocumentSnapshot, DocumentData
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
};

type Appointment = {
  id: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: string;
  createdAt?: string;
};

const ProfilePage = () => {
  const { userData, authUser, logout, loading } = useAuth(); // 🔑 uzmi i loading iz contexta
  const [saving, setSaving] = useState(false); // 🔑 odvojeno od auth loading-a
  const router = useRouter();

  // 📌 appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5;

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
  });

  const logoutHandler = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log("Greška pri logout-u", error);
    }
  };

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data: FormData) => {
    if (!authUser?.uid) return;
    setSaving(true);
    try {
      const userRef = doc(db, "clients", authUser.uid);
      await setDoc(userRef, data, { merge: true });
      reset(data);
      alert("Profil uspešno ažuriran!");
    } catch (err) {
      console.error("Greška pri ažuriranju profila:", err);
      alert("Došlo je do greške.");
    } finally {
      setSaving(false);
    }
  };

  // 📌 ucitavanje appointments
  const fetchAppointments = async () => {
    if (!authUser) return;
    try {
      let q = query(
        collection(db, "appointments"),
        where("userId", "==", authUser.uid),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(
          collection(db, "appointments"),
          where("userId", "==", authUser.uid),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const snap = await getDocs(q);

      if (!snap.empty) {
        const newData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];

        setAppointments(prev => [...prev, ...newData]);
        setLastDoc(snap.docs[snap.docs.length - 1]);
        setHasMore(snap.docs.length === pageSize);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Greška pri učitavanju servisa:", err);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchAppointments();
    }
  }, [authUser]);

  // 🔑 redirect ako korisnik NIJE ulogovan, ali tek nakon što auth proveri
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [loading, authUser, router]);

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
      <HeroSection title={userData?.name || "Moj profil"} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      {...register("email", { required: true })}
                      className="form-control"
                      type="email"
                      placeholder="Unesi email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Adresa</label>
                    <input
                      {...register("address")}
                      className="form-control"
                      placeholder="Unesi adresu"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Telefon</label>
                    <input
                      {...register("phoneNumber")}
                      className="form-control"
                      placeholder="Unesi broj telefona"
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn btn-primary"
                    >
                      {saving ? "Čuvanje..." : "Sačuvaj"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* 📌 Lista zakazanih servisa */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Moji servisi</h5>
                {appointments.length === 0 ? (
                  <p className="text-muted">Nema zakazanih servisa.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Datum</th>
                          <th>Vreme</th>
                          <th>Usluga</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(app => (
                          <tr key={app.id}>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.service}</td>
                            <td>
                              <span className="badge bg-secondary">{app.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {hasMore && (
                  <button className="btn btn-outline-primary w-100" onClick={fetchAppointments}>
                    Učitaj još
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
