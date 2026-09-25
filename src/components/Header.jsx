import { ShoppingBag, ShoppingCart } from "lucide-react";

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-icon">
          <ShoppingBag size={25} />
        </div>

        <div>
          <h1>SakuraStash</h1>
          <span>Simple. Soft. Stylish.</span>
        </div>
      </div>

      <button className="cart-button" onClick={onCartClick}>
        <ShoppingCart size={21} />

        <span>Cart</span>

        {cartCount > 0 && (
          <span className="cart-count">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;