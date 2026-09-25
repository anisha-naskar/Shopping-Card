import { Tag, ReceiptText, Sparkles } from "lucide-react";

function OrderSummary({
  subtotal,
  discount,
  gst,
  total,
  coupon,
  setCoupon,
  applyCoupon,
  couponMessage,
}) {
  return (
    <div className="summary-card">
      <div className="summary-title">
        <div className="summary-icon">
          <ReceiptText size={21} />
        </div>

        <div>
          <h2>Order Summary</h2>
          <p>Your purchase details</p>
        </div>
      </div>

      <div className="coupon-box">
        <div className="coupon-heading">
          <Tag size={18} />
          <span>Have a coupon?</span>
        </div>

        <div className="coupon-input">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) =>
              setCoupon(e.target.value.toUpperCase())
            }
          />

          <button onClick={applyCoupon}>
            Apply
          </button>
        </div>

        {couponMessage && (
          <p className="coupon-message">
            {couponMessage}
          </p>
        )}
      </div>

      <div className="summary-lines">
        <div>
          <span>Subtotal</span>
          <strong>
            ₹{subtotal.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Coupon Discount</span>
          <strong className="discount">
            -₹{discount.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>GST (18%)</span>
          <strong>
            ₹{gst.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="summary-divider"></div>

      <div className="grand-total">
        <div>
          <span>Grand Total</span>
          <small>Including GST</small>
        </div>

        <strong>
          ₹{total.toLocaleString("en-IN")}
        </strong>
      </div>

      <button className="checkout-button">
        <Sparkles size={19} />
        Proceed to Checkout
      </button>
    </div>
  );
}

export default OrderSummary;