"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import HeroSection from "../../components/Hero";

interface Appointment {
  id: string;
  createdAt: Date | null;
  date: string;
  time: string;
  service: string;
  status: string;
  notes?: string;
  userId: string;
  client?: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
  };
}

export default function AdminPage() {
  const { authUser, isAdmin, loading, logout } = useAuth();
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageSize = 5;

  // 🔐 zaštita rute
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.replace("/login");
      } else if (!isAdmin) {
        router.replace("/");
      }
    }
  }, [authUser, isAdmin, loading, router]);

  // Učitavanje appointmenta sa klijentima
  const fetchAppointments = async (initial = false) => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      let q;

      if (initial || !lastDoc) {
        q = query(
          collection(db, "appointments"),
          orderBy("createdAt", "desc"),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, "appointments"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const newAppointments: Appointment[] = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            let clientData = {};

            if (data.userId) {
              const clientRef = doc(db, "clients", data.userId);
              const clientSnap = await getDoc(clientRef);
              if (clientSnap.exists()) {
                clientData = clientSnap.data();
              }
            }

            return {
              id: docSnap.id,
              createdAt: data.createdAt?.toDate?.() || null,
              date: data.date,
              time: data.time,
              service: data.service,
              status: data.status,
              notes: data.notes,
              userId: data.userId,
              client: clientData as Appointment["client"],
            };
          })
        );

        setAppointments((prev) => {
          const merged = initial ? newAppointments : [...prev, ...newAppointments];
          const unique = merged.filter(
            (appt, index, self) =>
              index === self.findIndex((a) => a.id === appt.id)
          );
          return unique;
        });

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (err) {
      console.error("Greška pri učitavanju:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // inicijalno učitavanje
  useEffect(() => {
    if (authUser && isAdmin) {
      fetchAppointments(true);
    }
  }, [authUser, isAdmin]);

  // endless scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight
      ) {
        fetchAppointments(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastDoc]);

  if (loading || !authUser || !isAdmin) return null;

  return (
    <>
      <HeroSection title="Admin Dashboard" />
      <div className="container py-5">
        <button onClick={logout} className="btn btn-danger mb-4">
          Logout
        </button>

        <h2>Zakazani servisi</h2>
        {appointments.length === 0 && <p>Nema zakazanih servisa.</p>}
        <div className="list-group">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="list-group-item mb-3 shadow-sm rounded"
            >
              <h5>{appt.service}</h5>
              <p>
                📅 {appt.date} u {appt.time} <br />
                📝 {appt.notes || "Nema napomena"} <br />
              </p>
              {appt.client && (
                <p className="mb-0">
                  👤 {appt.client.name} <br />
                  📍 {appt.client.address} <br />
                  📞 {appt.client.phoneNumber} <br />
                  ✉️ {appt.client.email}
                </p>
              )}
            </div>
          ))}
        </div>

        {loadingMore && <p className="text-center mt-3">Učitavanje...</p>}
      </div>
    </>
  );
}
