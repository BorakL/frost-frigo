"use client"
import Link from 'next/link';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import ZakaziButton from './AppointmentButton';

export default function Header() {
  const{authUser, isAdmin} = useAuth();

  return (
    <header className="header">
      <div className="top-bar d-flex justify-content-end">
        <div>
          {authUser && (
          <Link href={`/${isAdmin ? "admin" : "klijent"}`} >
            <button className="zakazi-btn btn btn-light btn-lg mt-2"><i className="bi bi-person-fill"></i></button>
          </Link>
          )}
          <ZakaziButton/>
        </div>
      </div>
      <Navigation/>    
    </header>
  );
}
