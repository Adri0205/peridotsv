export default function ProductCard({ image, title }) {
  return (
    <div className="product-card-large">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}