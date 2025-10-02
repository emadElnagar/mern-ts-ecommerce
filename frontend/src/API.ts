/// <reference types="vite/client" />

export const API_URL = import.meta.env.VITE_API_URL;
export const USERS_API_URL = API_URL + "/api/users";
export const CATEGORY_API_URL = API_URL + "/api/categories";
export const PRODUCTS_API_URL = API_URL + "/api/products";
export const CART_API_URL = API_URL + "/api/products/cart";
export const WISHLIST_API_URL = API_URL + "/api/products/wishlist";
export const ORDERS_API_URL = API_URL + "/api/orders";
