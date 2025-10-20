import { getPulseras } from "@/services/get-pulseras";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import ProductGrid from "./_components/ProductGrid";
import Footer from "./_components/Footer";

export default async function Home() {
  const pulseras = await getPulseras();
  const whatsappNumber = "50312345678"; // Número genérico
  const whatsappMessage = "¡Hola! Me interesa conocer más sobre sus pulseras.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      <Header />
      <Hero whatsappNumber={whatsappNumber} whatsappMessage={whatsappMessage} />
      <ProductGrid
        pulseras={pulseras}
        whatsappNumber={whatsappNumber}
        whatsappMessage={whatsappMessage}
      />
      <Footer />
    </div>
  );
}
