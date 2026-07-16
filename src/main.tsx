import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./presentation/routes/router";
import "./global.css";
import { CartProvider } from "./presentation/context/CartContext";

/**
 * Punto de entrada de la aplicación React. Aquí se configura el enrutamiento, el contexto del carrito y se monta la aplicación en el DOM.
 *
 * Responsabilidad:
 * - Configurar el enrutamiento de la aplicación utilizando React Router.
 * - Proporcionar el contexto del carrito a toda la aplicación.
 * - Renderizar la aplicación en el elemento raíz del DOM.
 * 
 * Contexto de Negocio:
 * - El usuario accede a la aplicación y navega por diferentes páginas, y esta configuración asegura que cada página se renderice correctamente según la URL.
 * - El contexto del carrito permite que cualquier componente de la aplicación pueda acceder al estado del carrito y realizar acciones relacionadas con el mismo.
 * 
 * Dependencias:
 * - RouterProvider: Componente de React Router que proporciona el enrutamiento a la aplicación.
 * - CartProvider: Componente de contexto que proporciona el estado y las acciones del carrito a toda la aplicación.
 * - router: Configuración de rutas definida en src/presentation/routes/router.tsx.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);  