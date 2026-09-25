import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("SakuraStash");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");

  const [notification, setNotification] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      "SakuraStash",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setNotification(
      `${product.name} added to cart`
    );

    setTimeout(() => {
      setNotification("");
    }, 2200);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount =
    subtotal * (discountPercent / 100);

  const taxableAmount =
    subtotal - discount;

  const gst = taxableAmount * 0.18;

  const total = taxableAmount + gst;

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "PASTEL10") {
      setDiscountPercent(10);
      setCouponMessage(
        "10% discount applied successfully!"
      );
    } else if (code === "SAVE20") {
      setDiscountPercent(20);
      setCouponMessage(
        "20% discount applied successfully!"
      );
    } else if (code === "WELCOME15") {
      setDiscountPercent(15);
      setCouponMessage(
        "15% welcome discount applied!"
      );
    } else {
      setDiscountPercent(0);
      setCouponMessage(
        "Invalid coupon code. Try PASTEL10."
      );
    }
  };

  const scrollToCart = () => {
    document
      .getElementById("cart-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="app">

      {/* Animated background */}
      <div className="background-shapes">
        <div className="shape shape-one"></div>
        <div className="shape shape-two"></div>
        <div className="shape shape-three"></div>
        <div className="shape shape-four"></div>
      </div>

      <Header
        cartCount={cartCount}
        onCartClick={scrollToCart}
      />

      {notification && (
        <div className="notification">
          <CheckCircle2 size={19} />
          {notification}
        </div>
      )}

      <main>

        {/* Hero */}
        <section className="hero">
          <div className="hero-text">

            <span className="hero-label">
              ✦ Curated for you
            </span>

            <h2>
              Shopping made
              <span> simple & beautiful.</span>
            </h2>

            <p>
              Discover thoughtfully selected
              products and create your perfect cart.
            </p>

            <button
              className="hero-button"
              onClick={scrollToProducts}
            >
              Explore Products
            </button>

          </div>

          <div className="hero-decoration">
            <div className="floating-card card-a">
              ✦
            </div>

            <div className="hero-circle">
              <span>SHOP</span>
              <strong>softly.</strong>
            </div>

            <div className="floating-card card-b">
              ♡
            </div>
          </div>
        </section>

        {/* Products */}
        <section
          className="products-section"
          id="products-section"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">
                OUR COLLECTION
              </span>

              <h2>Featured Products</h2>
            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          {/* Search and filters */}
          <div className="filters">

            <div className="search-box">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="category-filter">
              <SlidersHorizontal size={18} />

              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              ))}
            </div>

          </div>

          <ProductList
            products={filteredProducts}
            onAdd={addToCart}
          />
        </section>

        {/* Cart */}
        <Cart
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
          subtotal={subtotal}
          discount={discount}
          gst={gst}
          total={total}
          coupon={coupon}
          setCoupon={setCoupon}
          applyCoupon={applyCoupon}
          couponMessage={couponMessage}
          onContinueShopping={
            scrollToProducts
          }
        />

      </main>

      <footer>
        <div className="footer-logo">
          <div className="logo-icon">
            ✦
          </div>

          <strong>SakuraStash</strong>
        </div>

        <p>
          Have a lovely shoping experience ✨
        </p>

        <span>
          © 2026 SakuraStash
        </span>
      </footer>

    </div>
  );
}

export default App;