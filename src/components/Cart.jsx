import { ShoppingBag, ArrowLeft } from "lucide-react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  subtotal,
  discount,
  gst,
  total,
  coupon,
  setCoupon,
  applyCoupon,
  couponMessage,
  onContinueShopping,
}) {
  return (
    <section className="cart-section" id="cart-section">

      <div className="cart-heading">
        <div>
          <h2>Your Shopping Cart</h2>
          <p>
            Review your items before checkout.
          </p>
        </div>

        <button
          className="continue-button"
          onClick={onContinueShopping}
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">
            <ShoppingBag size={45} />
          </div>

          <h3>Your cart is empty</h3>

          <p>
            Add some beautiful products to get started.
          </p>

          <button
            onClick={onContinueShopping}
            className="shop-now-button"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">

          <div className="cart-items-container">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            gst={gst}
            total={total}
            coupon={coupon}
            setCoupon={setCoupon}
            applyCoupon={applyCoupon}
            couponMessage={couponMessage}
          />

        </div>
      )}
    </section>
  );
}

export default Cart;