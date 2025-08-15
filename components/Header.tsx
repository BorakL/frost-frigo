"use client"
import Link from 'next/link';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const{authUser} = useAuth();

  return (
    <header className="header">
      <div className="top-bar">
        <p>Zakazivanje servisa klima uređaja brzo i jednostavno</p>
        <div className="btn-group">
          {authUser && (
            <Link href="/klijent" className="zakazi-btn">
              <i className="bi bi-person-fill"></i>
            </Link>
          )}
          
          <Link href="/zakazivanje" className="zakazi-btn">Zakaži servis</Link>
        </div>
      </div>
      <Navigation/>    
    </header>
  );
}
