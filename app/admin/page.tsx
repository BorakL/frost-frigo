"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../components/Hero";

export default function AdminPage() {
  const { authUser, isAdmin, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.replace("/login"); // nije ulogovan
      } else if (!isAdmin) {
        router.replace("/"); // ulogovan ali nije admin
      }
    }
  }, [authUser, isAdmin, loading, router]);

  if (loading || !authUser || !isAdmin) return null;

  return (
    <>
    <HeroSection title="Admin" />
    <div className="container py-5">
      <h1>Admin Dashboard</h1>
      <p>Dobrodošao, {authUser.email}!</p>
      <button onClick={logout} className="btn btn-danger mt-3">Logout</button>
    </div>
    </>
  );
}
