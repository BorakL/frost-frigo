import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top container">
        <div>
          <h4>Frost Frigo</h4>
          <p>Pružamo profesionalne usluge montaže, čišćenja i servisa klima uređaja.</p>
        </div>
        <div>
          <h4>Brze veze</h4>
          <ul>
            <li><Link href="/">Početna</Link></li>
            <li><Link href="/usluge">Naše usluge</Link></li>
            <li><Link href="/zakazivanje">Zakaži servis</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <p>📍 Beograd, Srbija</p>
          <p>📞 060 123 4567</p>
          <p>📧 kontakt@frostfrigo.rs</p>
        </div>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Frost Frigo. Sva prava zadržana.
      </div>
    </footer>
  );
}
