import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <AuthProvider>
          <Header/> 
          <main className="container my-5">
            {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
