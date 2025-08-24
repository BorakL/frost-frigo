import HeroSection from "../../components/Hero";

const AboutPage = () => {
    return(
        <>
        <HeroSection title="O nama"/>
    <div className="max-w-5xl mx-auto px-6 py-16 mt-5"> 

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Dobrodošli u <span className="font-semibold">FrostFrigo</span> – kompaniju. Naša misija je da obezbedimo
        maksimalnu svežinu i uštedu energije, uz poštovanje najviših standarda
        kvaliteta.
      </p>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Sa sedištem u Beogradu, sarađujemo sa velikim brojem klijenata širom
        Srbije. Naš tim poseduje bogato iskustvo
        i spreman je da odgovori na sve izazove – od projektovanja i montaže,
        do servisiranja i održavanja.
      </p>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Verujemo da je uspeh moguć samo kroz stalna ulaganja u znanje, nove
        tehnologije i otvorenu komunikaciju sa našim partnerima. Upravo zato,
        FrostFrigo je sinonim za poverenje, inovaciju i dugoročnu saradnju.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h2 className="mb-3">Naša misija</h2>
          <p className="text-gray-600">
            Da obezbedimo vrhunska rashladna i klima rešenja koja unapređuju
            poslovanje naših klijenata i čuvaju prirodne resurse.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h2 className="mb-3">Naša vizija</h2>
          <p className="text-gray-600">
            Da budemo lider u inovacijama i održivim tehnologijama na tržištu
            rashlade u regionu.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h2 className="mb-3">Naše vrednosti</h2>
          <p className="text-gray-600">
            Poverenje, stručnost i posvećenost klijentima su temelji našeg rada
            i razvoja.
          </p>
        </div>
      </div>
    </div>
        </>
    )
}

export default AboutPage;