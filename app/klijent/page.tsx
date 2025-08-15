'use client'
 
import HeroSection from "../../components/Hero";  
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => { 
    const{userData} = useAuth();
    console.log("userdata", userData)

    return (
        <>
            <HeroSection title={userData?.name || ""} />
            <div>
                <p>Email: {userData?.email}</p>
                <p>Adresa: {userData?.address}</p>
                <p>Telefon: {userData?.phoneNumber}</p>
            </div> 
        </>
    );
}

export default ProfilePage;
