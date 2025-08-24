import HeroSection from "../../components/Hero";

const Usluge = () => {
    const services = [
    {
      title: "Servis i popravka",
      description:
        "Brz i pouzdan servis svih tipova rashladnih uređaja za domaćinstva. Naši majstori dolaze na vašu adresu i rešavaju problem u najkraćem roku.",
      icon: "🛠️",
    },
    {
      title: "Ugradnja novih uređaja",
      description:
        "Profesionalna ugradnja frižidera, zamrzivača i klima uređaja uz garanciju i savete za pravilno korišćenje i održavanje.",
      icon: "⚡",
    },
    {
      title: "Preventivno održavanje",
      description:
        "Redovnim pregledom i čišćenjem rashladnih uređaja sprečavate kvarove i produžavate vek trajanja uređaja.",
      icon: "✅",
    },
    {
      title: "Hitne intervencije",
      description:
        "Dostupni smo za hitne pozive – kada frižider ili zamrzivač otkaže, stižemo što je pre moguće da rešimo problem.",
      icon: "🚀",
    },
  ];

    return(
        <>
      <HeroSection title="Usluge" />
      <div className="max-w-6xl mx-auto text-center px-4 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
    )
}

export default Usluge;