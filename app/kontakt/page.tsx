import HeroSection from "../../components/Hero";

const Kontakt = () => {
    return(
        <>
        <HeroSection title="Kontakt"/>
        <div className="container mt-5">
    <h2 className="text-center mb-4">Kontaktirajte nas</h2>
    
    <div className="row justify-content-center">
      <div className="col-md-6">
        
        <form>
          <div className="mb-3">
            <label className="form-label">Ime i prezime</label>
            <input type="text" className="form-control" id="ime" placeholder="Vaše ime"/>
          </div>

          <div className="mb-3">
            <label className="form-label">Email adresa</label>
            <input type="email" className="form-control" id="email" placeholder="ime@email.com"/>
          </div>

          <div className="mb-3">
            <label className="form-label">Poruka</label>
            <textarea className="form-control" id="poruka" placeholder="Vaša poruka..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">Pošalji</button>
        </form>

        <div className="mt-4 text-center">
          <p><strong>Telefon:</strong> +381 60 123 4567</p>
          <p><strong>Email:</strong> frostFrigo@gmail.com</p>
          <p><strong>Adresa:</strong> Beograd</p>
        </div>

      </div>
    </div>
  </div>
        </>
    )
}

export default Kontakt;