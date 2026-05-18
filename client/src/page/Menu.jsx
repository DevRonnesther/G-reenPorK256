import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Clock,
  Truck,
  ShieldCheck,
  Minus,
  X,
  ShoppingBasket,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import Pizza from "../assets/pizza(17).png";
import FreshPork from "../assets/freshporke.png";
import Porkies from "../assets/PikPng.com_png-restaurant_5027947.png";
// import Porkies from "../assets/pngwing.com (21).png";
import Burger from "../assets/Burger.png";
import Chicken from "../assets/pngwing.com (25).png";

/* HELPERS */
const discount = (price, anchor) =>
  Math.round((1 - price / parseInt(anchor)) * 100);

/* DATA */
const CATEGORIES = [
  { key: "all", label: "All Menu" },
  { key: "pork", label: "Pork" },
  { key: "chicken", label: "Chicken" },
  { key: "burgers", label: "Burgers" },
  { key: "pizza", label: "Pizza" },
];

const ALL_ITEMS = [
  {
    id: 1,
    image: Burger,
    category: "burgers",
    anchoring: "8000",
    name: "Beef Burger",
    price: 6000,
    description:
      "Juicy grilled beef patty with fresh lettuce, cheese and creamy sauce.",
    rating: 4.8,
    cookTime: "15–20 min",
    tag: "Popular",
  },
  {
    id: 2,
    image: Porkies,
    category: "pork",
    anchoring: "15000",
    name: "Roasted Pork",
    price: 10000,
    description:
      "Roasted pork with fried cassava, salad and chapati.",
    rating: 4.9,
    cookTime: "30–35 min",
    tag: "Best Seller",
  },
  {
    id: 3,
    image: Chicken,
    category: "chicken",
    anchoring: "78000",
    name: "Crispy Chicken",
    price: 55000,
    description:
      "Golden crispy chicken with a fiery spice blend.",
    rating: 4.6,
    cookTime: "20–25 min",
    tag: "Spicy",
  },
  {
    id: 4,
    image: Pizza,
    category: "pizza",
    anchoring: "18000",
    name: "Chicken Pizza",
    price: 15000,
    description:
      "Hand-tossed dough with premium chicken and mozzarella.",
    rating: 4.7,
    cookTime: "40–45 min",
    tag: "New",
  },
  {
    id: 5,
    image: Chicken,
    category: "chicken",
    anchoring: "55000",
    name: "Whole Chicken",
    price: 45000,
    description:
      "Farm-fresh whole chicken, marinated and roasted.",
    rating: 4.7,
    cookTime: "35–40 min",
    tag: null,
  },
  {
    id: 6,
    image: FreshPork,
    category: "pork",
    anchoring: "20000",
    name: "Fresh Pork Cuts",
    price: 16000,
    description:
      "Premium farm-fresh pork, hygienically prepared.",
    rating: 4.5,
    cookTime: "—",
    tag: "Organic",
  },
];

/* BADGE */
const TagBadge = ({ label }) => {
  const styles = {
    Popular: "bg-emerald-100 text-emerald-700",
    "Best Seller": "bg-orange-100 text-orange-700",
    Spicy: "bg-red-100 text-red-700",
    New: "bg-violet-100 text-violet-700",
    Organic: "bg-lime-100 text-lime-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] font-bold ${styles[label]}`}
    >
      {label}
    </span>
  );
};

const OrderingComponent = () => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] =
    useState("all");
  const [likedItems, setLikedItems] =
    useState(new Set());
  const [cartOpen, setCartOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [productModalOpen, setProductModalOpen] =
    useState(false);

  const filtered =
    activeCategory === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter(
        (i) => i.category === activeCategory
      );

  const addToCart = (item) => {
    setCart((prev) => [
      ...prev,
      {
        ...item,
        cartId: Date.now() + Math.random(),
      },
    ]);
  };

  const removeFromCart = (cartId) =>
    setCart((prev) =>
      prev.filter((i) => i.cartId !== cartId)
    );

  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const s = new Set(prev);

      s.has(id) ? s.delete(id) : s.add(id);

      return s;
    });
  };

  const total = cart.reduce(
    (s, i) => s + i.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 overflow-hidden">

      {/* PREMIUM LIGHT BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-100 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100 blur-[140px]" />
      </div>

      {/* HEADER */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">

          <div>
            <p className="text-red-500 text-sm font-semibold tracking-[3px] uppercase">
              Premium Menu
            </p>

            <h1 className="text-3xl md:text-4xl font-black mt-1">
              Delicious Food Collection
            </h1>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            <ShoppingBag className="w-6 h-6" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-black flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="max-w-7xl mx-auto px-5 pb-5 flex gap-3 overflow-x-auto scrollbar-none">

          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() =>
                setActiveCategory(cat.key)
              }
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${activeCategory === cat.key
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedProduct(item);
                setProductModalOpen(true);
              }}
              className="group relative rounded-[32px] overflow-hidden border border-gray-200 bg-white hover:border-red-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-2xl"
            >

              {/* IMAGE */}
              <div className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[240px] h-[240px] object-contain group-hover:scale-110 transition-all duration-700"
                />

                {/* DISCOUNT */}
                <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg">
                  -{discount(item.price, item.anchoring)}%
                </div>

                {/* LIKE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  className={`absolute top-5 right-5 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${likedItems.has(item.id)
                      ? "bg-red-600"
                      : "bg-white shadow-md"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 ${likedItems.has(item.id)
                        ? "fill-white text-white"
                        : "text-gray-600"
                      }`}
                  />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <div className="flex items-center justify-between mb-3">

                  {item.tag && (
                    <TagBadge label={item.tag} />
                  )}

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-400" />

                    <span className="text-sm font-bold text-gray-800">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-black mb-2">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-gray-400 line-through text-sm">
                      UGX{" "}
                      {parseInt(
                        item.anchoring
                      ).toLocaleString()}
                    </p>

                    <h3 className="text-2xl font-black text-red-600">
                      UGX {item.price.toLocaleString()}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/20 transition-all duration-300 hover:scale-110"
                  >
                    <ShoppingBasket className="w-5 h-5" />
                  </button>
                </div>

                {/* FOOTER */}
                <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    {item.cookTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-500" />
                    Free Delivery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {productModalOpen && selectedProduct && (
        <>
          <div
            onClick={() =>
              setProductModalOpen(false)
            }
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

            <div className="w-full max-w-screen rounded-[40px] overflow-hidden bg-white border border-gray-200 shadow-2xl">

              <div className="grid md:grid-cols-2">

                {/* LEFT */}
                <div className="relative flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-10">

                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full max-w-md object-contain"
                  />
                </div>

                {/* RIGHT */}
                <div className="p-8 md:p-12">

                  <div className="flex items-center justify-between mb-6">

                    {selectedProduct.tag && (
                      <TagBadge
                        label={
                          selectedProduct.tag
                        }
                      />
                    )}

                    <button
                      onClick={() =>
                        setProductModalOpen(false)
                      }
                      className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h2 className="text-5xl font-black mb-4 leading-tight">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-gray-500 leading-relaxed text-lg mb-8">
                    {selectedProduct.description}
                  </p>

                  {/* FEATURES */}
                  <div className="flex flex-wrap gap-3 mb-8">

                    <div className="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-400" />
                      {selectedProduct.cookTime}
                    </div>

                    <div className="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                      <Truck className="w-5 h-5 text-emerald-500" />
                      Free Delivery
                    </div>

                    <div className="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-yellow-500" />
                      Premium Quality
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mb-10">

                    <p className="line-through text-gray-400 text-xl">
                      UGX{" "}
                      {parseInt(
                        selectedProduct.anchoring
                      ).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-2">

                      <h3 className="text-5xl font-black text-red-600">
                        UGX{" "}
                        {selectedProduct.price.toLocaleString()}
                      </h3>

                      <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold">
                        Save{" "}
                        {(
                          parseInt(
                            selectedProduct.anchoring
                          ) -
                          selectedProduct.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        addToCart(
                          selectedProduct
                        )
                      }
                      className="flex-1 h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg flex items-center justify-center gap-3 transition-all"
                    >
                      <ShoppingBasket className="w-5 h-5" />
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        toggleLike(
                          selectedProduct.id
                        )
                      }
                      className={`w-16 rounded-2xl border transition-all ${likedItems.has(
                        selectedProduct.id
                      )
                          ? "bg-red-600 border-red-600"
                          : "border-gray-200 bg-white"
                        }`}
                    >
                      <Heart
                        className={`mx-auto ${likedItems.has(
                          selectedProduct.id
                        )
                            ? "fill-white text-white"
                            : "text-gray-700"
                          }`}
                      />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-[80] transition-all duration-500 ${cartOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >

        {/* HEADER */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-black">
              Your Cart
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {cart.length} items added
            </p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="w-11 h-11 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {cart.map((item) => (
            <div
              key={item.cartId}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-4 flex items-center gap-4"
            >

              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center border border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="flex-1">

                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-red-600 font-black mt-1">
                  UGX {item.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.cartId)
                }
                className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center"
              >
                <Minus className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-gray-200">

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 mb-5">

            <div className="flex justify-between mb-3">
              <span className="text-gray-500">
                Total
              </span>

              <span className="text-3xl font-black text-red-600">
                UGX {total.toLocaleString()}
              </span>
            </div>

            <p className="text-sm text-gray-400">
              Free delivery included
            </p>
          </div>

          <button className="w-full h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg flex items-center justify-center gap-3 transition-all">
            Checkout Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderingComponent;