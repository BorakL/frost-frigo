import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ZakaziButton = ()=>{
    const { authUser } = useAuth(); // 👈 imamo info o korisniku
    const router = useRouter();

    const handleZakaziClick = () => {
        if (authUser) {
            router.push("/zakazivanje");
        } else {
            router.push("/login");
        }
    };

    return(
        <button onClick={handleZakaziClick} className="zakazi-btn">
          Zakaži servis
        </button>
    )
}

export default ZakaziButton;