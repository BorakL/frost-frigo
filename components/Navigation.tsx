"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navigation = () => {
    const[isSticky, setIsSticky] = useState(false);
    
    useEffect(()=>{
        const handleScroll = ()=>{
            const scrollY = window.scrollY;
            setIsSticky(scrollY>300)
        };
        window.addEventListener('scroll', handleScroll);
        return ()=> window.removeEventListener('scroll', handleScroll)
    },[])

    return( 
        <div className={`container main-nav ${isSticky ? "sticky-navbar" : ""} `}>
            <div className="logo"> 
                <Link href="/">
                    <Image
                        src="/images/frost-frigo.png"
                        alt="logo" 
                        width={!isSticky ? 100 : 30}
                        height={!isSticky ? 100 : 30}
                    />
                    {!isSticky ? <span>Frost Frigo</span> : null}
                </Link>  
            </div>
            <nav>
                <ul>
                    <li><Link href="/">Početna</Link></li>
                    <li><Link href="/usluge">Usluge</Link></li>
                    <li><Link href="/o-nama">O nama</Link></li>
                    <li><Link href="/kontakt">Kontakt</Link></li>
                </ul>
            </nav>
            {
                !isSticky ?
                <div className="kontakt-info">
                    <a href="tel:+381601234567">📞 +381 60 123 4567</a>
                </div> :
                <Link href="/zakazivanje" className="zakazi-btn">Zakaži servis</Link>
            }
            
        </div>
    )
}

export default Navigation;