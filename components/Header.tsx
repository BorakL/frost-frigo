"use client"
import Link from 'next/link';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import ZakaziButton from './AppointmentButton';

export default function Header() {
  const{authUser, isAdmin} = useAuth();

  return (
    <header className="header">
      <div className="top-bar">
        <p>Zakazivanje servisa klima uređaja brzo i jednostavno</p>
        <div className="btn-group">
          {authUser && (
          <Link href={`/${isAdmin ? "admin" : "klijent"}`} className="zakazi-btn">
            <i className="bi bi-person-fill"></i>
          </Link>
          )}
          <ZakaziButton/>
        </div>
      </div>
      <Navigation/>    
    </header>
  );
}
