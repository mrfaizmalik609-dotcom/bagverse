// context/CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);
  const [lastAddedMessage, setLastAddedMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Add or Remove from Wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.text === product.text);
      if (exists) {
        // Remove if already exists
        return prev.filter((item) => item.text !== product.text);
      } else {
        // Add if not in wishlist
        return [...prev, product];
      }
    });
  };

  // ✅ Add to Cart
  const addToCart = (item, qty = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.text === item.text);

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += qty;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: qty }];
      }
    });

    setLastAddedMessage(`${item.text} added to cart 🛒`);
    setTimeout(() => setLastAddedMessage(""), 3000);
  };

  // ✅ Buy Now
  const handleBuyNow = (item) => {
    setBuyNowItem(item);
    setBuyNowQuantity(1);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        lastAddedMessage,
        buyNowItem,
        setBuyNowItem,
        handleBuyNow,
        buyNowQuantity,
        setBuyNowQuantity,
        searchTerm,
        setSearchTerm,
        wishlistItems,       // ✅ expose
        addToWishlist,       // ✅ expose
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
