// app/components/Footer.jsx
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-bar">
      <div className="main-frame py-4 px-6">
        <div className="flex items-center justify-between">
          <p className="text-lg" style={{fontFamily: "cursive"}}>Síguenos en nuestras redes sociales para tener más información</p>
          <div className="flex gap-3 footer-icons">
            <a href="#" target="_blank" rel="noreferrer"><FaInstagram className="text-white"/></a>
            <a href="#" target="_blank" rel="noreferrer"><FaFacebook className="text-white"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}