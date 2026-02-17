import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./Layout";
import { Home } from "@/components/Home";
import { Catalogo } from "@/components/product/Catalogo";
import { Offer } from "@/components/store/Offer";
import { CategoriesSection } from "./components/product/CategoriesSection";
import { CartView } from "./components/cart/CartView";
import { ProductDetail } from "./components/product/ProductDetail";
import { Contact } from "./components/store/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: "inicio", Component: Home },
      { path: "catalogo", Component: Catalogo },
      { path: "catalogo/:code", Component: ProductDetail },
      { path: "ofertas", Component: Offer },
      { path: "categorias", Component:  CategoriesSection},    
      { path: "carrito", Component: CartView},
      { path: "contactanos", Component: Contact},
    ],
  },
]);
