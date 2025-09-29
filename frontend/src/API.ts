/// <reference types="vite/client" />

export const API_URL = import.meta.env.VITE_API_URL;
export const USERS_API_URL = import.meta.env.VITE_URL + "/users";
export const CATEGORY_API_URL = import.meta.env.VITE_API_URL + "/categories";
export const PRODUCTS_API_URL = import.meta.env.VITE_API_URL + "/products";
export const CART_API_URL = import.meta.env.VITE_API_URL + "/products/cart";
export const WISHLIST_API_URL =
  import.meta.env.VITE_API_URL + "/products/wishlist";
export const ORDERS_API_URL = import.meta.env.VITE_API_URL + "/orders";
