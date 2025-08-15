"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
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
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  userData: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

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
    <AuthContext.Provider value={{ authUser, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
