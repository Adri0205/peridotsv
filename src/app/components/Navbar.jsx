
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="main-frame flex items-center justify-center py-4">
        <div className="nav-pill">
          <Link href="/hombres" className="text-xs text-gray-800 font-medium">Accesorios para Hombres</Link>
          <span className="text-gray-400">|</span>
          <Link href="/mujeres" className="text-xs text-gray-800 font-medium">Accesorios para Mujeres</Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="text-xs text-gray-800 font-medium">Hecho a mano</Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="text-xs text-gray-800 font-medium">Hazlo tú</Link>
        </div>
      </div>
    </div>
  );
}