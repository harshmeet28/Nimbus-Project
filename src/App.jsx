import { useState } from "react";
import "./index.css";

function App() {
  const [items] = useState([
    { id: 1, name: "Classic T-Shirt", price: 20, img: "https://dummyimage.com/400x400/000/fff&text=T-Shirt" },
    { id: 2, name: "Blue Denim Jeans", price: 40, img: "https://dummyimage.com/400x400/2e86c1/fff&text=Jeans" },
    { id: 3, name: "Leather Jacket", price: 120, img: "https://dummyimage.com/400x400/1c2833/fff&text=Jacket" },
    { id: 4, name: "Running Sneakers", price: 60, img: "https://dummyimage.com/400x400/28b463/fff&text=Sneakers" },
    { id: 5, name: "Casual Hoodie", price: 45, img: "https://dummyimage.com/400x400/884ea0/fff&text=Hoodie" },
    { id: 6, name: "Formal Shirt", price: 35, img: "https://dummyimage.com/400x400/f39c12/fff&text=Shirt" },
    { id: 7, name: "Summer Dress", price: 50, img: "https://dummyimage.com/400x400/e74c3c/fff&text=Dress" },
    { id: 8, name: "Winter Coat", price: 150, img: "https://dummyimage.com/400x400/2ecc71/fff&text=Coat" },
    { id: 9, name: "Casual Shorts", price: 25, img: "https://dummyimage.com/400x400/f1c40f/fff&text=Shorts" },
    { id: 10, name: "Baseball Cap", price: 15, img: "https://dummyimage.com/400x400/16a085/fff&text=Cap" },
    { id: 11, name: "Sports Jacket", price: 80, img: "https://dummyimage.com/400x400/9b59b6/fff&text=Sports+Jacket" },
    { id: 12, name: "Polo Shirt", price: 30, img: "https://dummyimage.com/400x400/d35400/fff&text=Polo" },
    { id: 13, name: "Custom Uploaded Item", price: 99, img: "/9e11e269-547d-402c-9a7c-90f6ad4fc88a.png" },
  ]);

  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop");

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={() => setView("shop")}>Clothify</div>
        <nav className="nav">
          <button className="nav-btn">Login</button>
          <button className="nav-btn">Sign Up</button>
          <button className="cart-btn" onClick={() => setView("cart")}>
            🛒 Cart ({cart.length})
          </button>
        </nav>
      </header>

      {view === "shop" && (
        <main className="grid">
          {items.map((item) => (
            <div key={item.id} className="card">
              <img src={item.img} alt={item.name} />
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </main>
      )}

      {view === "cart" && (
        <main className="cart-page">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.name} />
                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>${item.price} x {item.qty}</p>
                      <p className="subtotal">= ${item.price * item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="cart-total">Total: ${getTotal()}</h3>
              <div className="cart-actions">
                <button onClick={() => alert("Proceeding to checkout!")}>Checkout</button>
                <button onClick={() => setView("shop")}>Back to Shop</button>
              </div>
            </>
          )}
        </main>
      )}

      <footer className="footer">
        <p>© 2025 Clothify - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
