import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <p>Zakazivanje servisa klima uređaja brzo i jednostavno</p>
        <Link href="/zakazivanje" className="zakazi-btn">Zakaži servis</Link>
      </div>
      <Navigation/>    
    </header>
  );
}
