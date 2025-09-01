"use client";
import { useState } from "react"; 

export default function Galerija() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = Array.from({ length: 10 }, (_, i) => i + 1); // 1–10

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
    <div>
      {/* GRID GALERIJA */}
      <div className="grid grid-cols-3 gap-2">
        {images.map((num, index) => (
          <img
            key={index}
            src={`/images/galerija/${num}.jpg`}
            alt={`Thumbnail ${num}`}
            className="cursor-pointer object-cover w-full h-40 rounded-lg"
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl z-[60]"
          >
            &times;
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-4xl z-[60] px-3 py-2 bg-black/40 rounded-full hover:bg-black/70"
          >
            &#8249;
          </button>

          <img
            src={`/images/galerija/${images[currentIndex]}.jpg`}
            alt={`Large ${images[currentIndex]}`}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-4xl z-[60] px-3 py-2 bg-black/40 rounded-full hover:bg-black/70"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
