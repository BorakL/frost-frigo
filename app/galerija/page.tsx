"use client";
import { useState } from "react"; 
import HeroSection from "../../components/Hero";

export default function Galerija() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = Array.from({ length: 19 }, (_, i) => i + 6); // 1–10

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
    <HeroSection title="Galerija"/>
    <div className="container py-5">
      {/* GRID GALERIJA */}
      <div className="row g-3">
        {images.map((num, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <img
              src={`/images/galerija/${num}.jfif`}
              alt={`Thumbnail ${num}`}
              className="img-fluid rounded shadow-sm"
              style={{ cursor: "pointer", height: "200px", objectFit: "cover", width: "100%" }}
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
          {/* Close dugme */}
          <button
            onClick={closeModal}
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          ></button>

          {/* Prev dugme */}
          <button
            onClick={prevImage}
            className="position-absolute start-0 top-50 translate-middle-y btn btn-dark rounded-circle opacity-75"
          >
            &#8249;
          </button>

          {/* Slika */}
          <img
            src={`/images/galerija/${images[currentIndex]}.jfif`}
            alt={`Large ${images[currentIndex]}`}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain" }}
          />

          {/* Next dugme */}
          <button
            onClick={nextImage}
            className="position-absolute end-0 top-50 translate-middle-y btn btn-dark rounded-circle opacity-75"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
    </>

  );
}
