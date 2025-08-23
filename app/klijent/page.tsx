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
  timeSlot: string;
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

  const { register, handleSubmit, reset, formState:{errors} } = useForm<FormData>({
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
        name: userData.name || authUser?.displayName || "",
        email: userData.email || authUser?.email || "",
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
        console.log("newData",newData)

        setAppointments(prev => {
          const all = [...prev, ...newData];
          const unique = all.filter(
            (item, index, self) => index === self.findIndex(a => a.id === item.id)
          );
          return unique;
        });
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
      <HeroSection title={userData?.name || authUser?.displayName || ""} />

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
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(app => (
                          <tr key={app.id}>
                            <td>{app.date}</td>
                            <td>{app.timeSlot}</td>
                            <td>{app.service}</td>
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
