"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Firestore dodatni podaci o korisniku
interface UserData {
  address?: string;
  phoneNumber?: string; 
  email?:string;
  name?:string;
}

interface AuthContextType {
  authUser: User | null;     // Firebase Auth objekat
  userData: UserData | null; // Dodatni podaci iz Firestore-a
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  userData: null,
  logout: async ()=>{},
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setAuthUser(firebaseUser);

        // Učitaj podatke iz Firestore-a
        const docRef = doc(db, "clients", firebaseUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setUserData(snapshot.data() as UserData);
        } else {
          setUserData(null);
        }
      } else {
        setAuthUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, userData, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
