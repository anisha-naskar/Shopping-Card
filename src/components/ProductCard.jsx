import { ShoppingCart, Plus } from "lucide-react";

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />

        <span className="category-badge">
          {product.category}
        </span>
      </div>

      <div className="product-content">
        <h3>{product.name}</h3>

        <div className="product-bottom">
          <div>
            <span className="price-label">Price</span>
            <p className="product-price">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => onAdd(product)}
          >
            <Plus size={18} />
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

/*Coupon	Discount
PASTEL10	10%
WELCOME15	15%
SAVE20	    20%*/