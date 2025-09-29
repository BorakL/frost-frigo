"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ZakaziButton from "./AppointmentButton";

const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`container main-nav ${isSticky ? "sticky-navbar" : ""}`}>
      {/* Logo */}
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

      {/* Hamburger dugme */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Navigacija */}
      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Početna</Link>
          </li>
          <li>
            <Link href="/usluge" onClick={() => setIsOpen(false)}>Usluge</Link>
          </li>
          <li>
            <Link href="/o-nama" onClick={() => setIsOpen(false)}>O nama</Link>
          </li>
          <li>
            <Link href="/galerija" onClick={() => setIsOpen(false)}>Galerija</Link>
          </li>
          <li>
            <Link href="/kontakt" onClick={() => setIsOpen(false)}>Kontakt</Link>
          </li>
        </ul>
      </nav>

      {/* Kontakt info / dugme */}
      {!isSticky ? (
        <div className="kontakt-info">
          <a href="tel:+381601234567">📞 +381 60 123 4567</a>
        </div>
      ) : (
        <ZakaziButton />
      )}
    </div>
  );
};

export default Navigation;
