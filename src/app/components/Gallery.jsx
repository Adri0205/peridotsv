// app/components/Gallery.jsx
export default function Gallery() {
  const images = [
    { id: 1, src: "/img/pulsera1.jpg", alt: "Pulsera 1" },
    { id: 2, src: "/img/pulsera2.jpg", alt: "Pulsera 2" },
    { id: 3, src: "/img/pulsera3.jpg", alt: "Pulsera 3" }
  ];

  return (
    <div className="pattern-wrapper">
      <div className="main-frame pattern-inner">
        <div className="center-grid">
          {/* Columna izquierda: logo grande */}
          <div className="logo-area">
            <img src="/img/logo_big.png" alt="Peridot" className="max-h-44 object-contain" />
          </div>

          {/* Columna derecha: 3 tarjetas en fila */}
          <div className="gallery-area">
            <div className="product-row">
              {images.map(img => (
                <div key={img.id} className="product-card">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}