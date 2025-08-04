import HeroSection from "../components/Hero";

const HomePage = () => {
    return(
        <>
        <HeroSection 
            variant="home" 
            title="Montaža, servis i čišćenje klima uređaja" 
            subtitle = "Zakažite svoj servis brzo i jednostavno"
        />
        <section className="bg-white py-5">
        <div className="container">
            <h2 className="text-center mb-4">Zašto odabrati nas?</h2>
            <div className="row text-center">
            <div className="col-md-3">
                <i className="bi bi-clock-history display-4 text-primary"></i>
                <h5 className="mt-3">Brzo zakazivanje</h5>
                <p>U par klikova do čistog i ispravnog klima uređaja.</p>
            </div>
            <div className="col-md-3">
                <i className="bi bi-tools display-4 text-primary"></i>
                <h5 className="mt-3">Iskusni majstori</h5>
                <p>Stručan i sertifikovan tim za sve vrste klima uređaja.</p>
            </div>
            <div className="col-md-3">
                <i className="bi bi-shield-check display-4 text-primary"></i>
                <h5 className="mt-3">Kvalitet i sigurnost</h5>
                <p>Koristimo proverena sredstva i garantujemo bezbednost.</p>
            </div>
            <div className="col-md-3">
                <i className="bi bi-calendar-check display-4 text-primary"></i>
                <h5 className="mt-3">Podsetnik na servis</h5>
                <p>Nećete zaboraviti sledeće čišćenje – mi vas podsećamo!</p>
            </div>
            </div>
        </div>
        </section>
        <section className="bg-light py-5">
        <div className="container">
            <h2 className="text-center mb-4">Naše usluge</h2>
            <div className="our-services row text-center">
            <div className="col-md-4 mb-4">
                <img src="/images/installing.png" alt="Ugradnja klime" className="img-fluid rounded" />
                <h5 className="mt-3">Ugradnja</h5>
                <p>Brza i sigurna montaža klima uređaja svih brendova.</p>
            </div>
            <div className="col-md-4 mb-4">
                <img src="/images/cleaning.png" alt="Čišćenje klime" className="img-fluid rounded" />
                <h5 className="mt-3">Čišćenje</h5>
                <p>Detaljno čišćenje i dezinfekcija unutrašnje i spoljne jedinice.</p>
            </div>
            <div className="col-md-4 mb-4">
                <img src="/images/repairing.png" alt="Servis klime" className="img-fluid rounded" />
                <h5 className="mt-3">Servis</h5>
                <p>Popravka i redovno održavanje uz garanciju kvaliteta.</p>
            </div>
            </div>
        </div>
        </section>
        <section className="bg-primary text-white py-5 text-center">
        <div className="container">
            <h2 className="mb-3">Vaš klima uređaj zaslužuje osveženje!</h2>
            <p className="lead">Ne čekajte leto – zakažite servis još danas.</p>
            <a href="/zakazivanje" className="btn btn-light btn-lg mt-2">Zakaži servis</a>
        </div>
        </section>


        </>
    )
}

export default HomePage;