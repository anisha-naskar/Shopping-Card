import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
      />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <span>{item.category}</span>

        <strong>
          ₹{item.price.toLocaleString("en-IN")}
        </strong>
      </div>

      <div className="quantity-controls">
        <button
          onClick={() => onDecrease(item.id)}
          disabled={item.quantity === 1}
        >
          <Minus size={15} />
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => onIncrease(item.id)}
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="cart-item-total">
        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
      </div>

      <button
        className="remove-button"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default CartItem;