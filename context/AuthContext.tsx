"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

// Firestore dodatni podaci o korisniku
interface UserData {
  address?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  role?: "admin" | "user";  // 👈 dodali smo polje role
}

interface AuthContextType {
  authUser: User | null;     // Firebase Auth objekat
  userData: UserData | null; // Dodatni podaci iz Firestore-a
  isAdmin: boolean;          // 👈 helper za admina
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  userData: null,
  isAdmin: false,
  logout: async () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      setUserData(null);
    } catch (err) {
      console.error("Greška pri odjavi:", err);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setAuthUser(firebaseUser);

        // 🔥 real-time listener za user dokument
        const docRef = doc(db, "clients", firebaseUser.uid);
        const unsubscribeDoc = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data() as UserData);
          } else {
            setUserData(null);
          }
          setLoading(false);
        });

        // cleanup listenera kad se korisnik odjavi ili komponenta unmount-uje
        return () => unsubscribeDoc();
      } else {
        setAuthUser(null);
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const isAdmin = userData?.role === "admin"; // 👈 ovde proveravaš

  return (
    <AuthContext.Provider value={{ authUser, userData, isAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
