import HeroSection from "../../components/Hero";

const Usluge = () => {
  const services = [
    {
      title: "Servis klima uređaja",
      description:
        "Redovan servis klima uređaja obezbeđuje dugotrajan rad i manju potrošnju struje. Naši stručnjaci dolaze na vašu adresu i vrše kompletnu proveru uređaja.",
      image: "/images/servis.png",
    },
    {
      title: "Montaža klima uređaja",
      description:
        "Profesionalna ugradnja klima uređaja uz poštovanje svih standarda i preporuka proizvođača. Garantujemo bezbedan i pouzdan rad.",
      image: "/images/montaza.png",
    },
    {
      title: "Demontaža klima uređaja",
      description:
        "Stručno uklanjanje postojećeg klima uređaja bez oštećenja zidova i instalacija. Idealno prilikom renoviranja ili selidbe.",
      image: "/images/demontaza.png",
    },
    {
      title: "Popravka klima uređaja",
      description:
        "Brza i pouzdana dijagnostika i popravka svih kvarova na klima uređajima. Koristimo originalne delove i pružamo garanciju na rad.",
      image: "/images/popravka.png",
    },
    {
      title: "Čišćenje klima uređaja",
      description:
        "Temeljno čišćenje filtera i unutrašnjih delova klima uređaja sprečava širenje bakterija i obezbeđuje zdraviji vazduh u prostoru.",
      image: "/images/ciscenje.png",
    },
  ];

  return (
    <>
      <HeroSection title="Naše usluge" />
      <section className="services">
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="services-card fade-in"
          >
            {/* Slika kao ikona/usluga */}
            <div className="flex justify-center mb-3 -mt-12"> 
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              /> 
            </div>

            {/* Tekstualni deo */} 
              <h3>
                {service.title}
              </h3>
              <p>
                {service.description}
              </p> 
          </div>
        ))}
      </div>
      </section>
     
    </>
  );
};

export default Usluge;
