'use client'

import { useEffect } from "react";
import HeroSection from "../../components/Hero";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

const ProfilePage = () => {
    const db = getFirestore();
    const router = useRouter();

    useEffect(() => {
        async function fetchUserData() {
            const user = auth.currentUser;
            if (!user) {
                console.log("Nema ulogovanog korisnika");
                router.push("/"); // redirekcija na home
                return;
            }

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Podaci o korisniku:", docSnap.data());
            } else {
                console.log("Nema dokumenta za ovog korisnika");
            }
        }

        fetchUserData();
    }, [db, router]);

    return (
        <>
            <HeroSection title="Frost Frigo" />
            <div>Profil</div>
        </>
    );
}

export default ProfilePage;
