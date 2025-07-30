import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <Header/>
        <main className="container my-5">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
