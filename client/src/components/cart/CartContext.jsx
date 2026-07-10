import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
    // Load cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // ==========================
    // Add To Cart
    // ==========================
    function addToCart(product, quantity = 1) {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });
    }

    // ==========================
    // Remove Product Completely
    // ==========================
    function removeFromCart(id) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }

    // ==========================
    // Increase Quantity
    // ==========================
    function increaseQuantity(id) {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    // ==========================
    // Decrease Quantity
    // ==========================
    function decreaseQuantity(id) {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    // ==========================
    // Clear Cart
    // ==========================
    function clearCart() {
        setCartItems([]);
    }

    // ==========================
    // Check if Product Exists
    // ==========================
    function isInCart(id) {
        return cartItems.some((item) => item.id === id);
    }

    // ==========================
    // Total Quantity
    // ==========================
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // ==========================
    // Subtotal
    // ==========================
    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // ==========================
    // Shipping
    // ==========================
    const shipping = subtotal > 50000 ? 0 : 5000;

    // ==========================
    // Tax (Example 18%)
    // ==========================
    const tax = subtotal * 0.18;

    // ==========================
    // Grand Total
    // ==========================
    const total = subtotal + shipping + tax;

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}