type HeroProps = {
  variant?: 'home' | 'page';
  title: string;
  subtitle?: string;
};

export default function HeroSection({ variant = 'page', title, subtitle }: HeroProps) {
  const isHome = variant === 'home';

  return (
    <section className={isHome ? 'hero-section hero--home' : 'hero-section hero--page'}>
      <div className="hero-overlay"> 
        <div className="container hero-content">
          <h1 className="display-4 fw-bold">{title}</h1>
          {subtitle && <p className="lead">{subtitle}</p>}
          {isHome && <a href="/zakazivanje" className=" btn btn-primary btn-lg">Zakaži odmah</a>}
        </div>        
      </div>
    </section>
  );
}
