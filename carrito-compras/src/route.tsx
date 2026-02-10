import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "@/components/Home";
import {Catalog} from "@/components/product/Catalog";
import Offer from "./components/store/Offer";
import { CategoriesSection } from "./components/product/CategoriesSection";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "catalogo", Component: Catalog },
      { path: "ofertas", Component: Offer },
      { path: "categorias", Component:  CategoriesSection},
      /*{ path: "productos", Component: Products },
      { path: "carrito", Component: Cart },*/
    ],
  },
]);
