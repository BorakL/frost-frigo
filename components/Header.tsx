import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <p>Zakazivanje servisa klima uređaja brzo i jednostavno</p>
        <Link href="/zakazivanje" className="zakazi-btn">Zakaži servis</Link>
      </div>
      <div className="main-nav container">
        <div className="logo">
          <Link href="/">
            <span>Frost Frigo</span>
          </Link>
          <p className="slogan">Profesionalna ugradnja, čišćenje i servis klima</p>
        </div>
        <nav>
          <ul>
            <li><Link href="/">Početna</Link></li>
            <li><Link href="/usluge">Usluge</Link></li>
            <li><Link href="/o-nama">O nama</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </nav>
        <div className="kontakt-info">
          <a href="tel:+381601234567">📞 +381 60 123 4567</a>
        </div>
      </div>
    </header>
  );
}
