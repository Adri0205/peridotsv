CREATE TABLE pulseras (
    id_pulsera SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    sexo VARCHAR(10) CHECK (sexo IN ('Hombre', 'Mujer', 'Unisex')),
    imagen_url VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT NOW()
);

INSERT INTO pulseras (nombre_producto, descripcion, precio, sexo, imagen_url)
VALUES
('Pulsera Cuero Clásica', 'Pulsera de cuero negro con broche metálico.', 15.99, 'Hombre', 'https://example.com/img/pulsera_cuero.jpg'),
('Pulsera de Perlas', 'Pulsera con perlas naturales blancas.', 25.50, 'Mujer', 'https://example.com/img/pulsera_perlas.jpg'),
('Pulsera Trenzada Multicolor', 'Pulsera artesanal trenzada con hilos de colores.', 8.75, 'Unisex', 'https://example.com/img/pulsera_trenzada.jpg');