// app/hombres/page.jsx
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Accesorios para Hombres - PeridotSV",
};

export default function HombresPage() {
  return (
    <div className="min-h-screen bg-[var(--beige)]">
      {/* Navbar */}
       <Navbar />
      <main className="py-10">
        <div className="main-frame p-8">
          <h2 className="text-2xl text-center font-semibold mb-8" style={{fontFamily: "cursive"}}>
            Estás viendo las pulseras para hombres
          </h2>

          {/* Grid de productos */}
          <ProductGrid />
        </div>
      </main>
       <Footer />
    </div>
  );
}



