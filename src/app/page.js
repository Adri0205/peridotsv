import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}