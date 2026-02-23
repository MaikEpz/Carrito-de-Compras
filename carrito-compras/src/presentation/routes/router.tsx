import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from '../layout/Layout'
import { Home } from '../components/Home'
import { Catalogo } from '../components/product/Catalogo'
import { Offer } from '../components/store/Offer'
import { CategoriesSection } from '../components/product/CategoriesSection'
import { CartView } from '../components/cart/CartView'
import { ProductDetail } from '../components/product/ProductDetail'
import { Contact } from '../components/store/Contact'

/**
 * Configuración de rutas para la aplicación utilizando React Router.
 *
 * Responsabilidad:
 * - Definir las rutas principales de la aplicación y los componentes asociados a cada ruta.
 * - Proporcionar una estructura de navegación clara para los usuarios.
 *
 * Contexto de Negocio:
 * - El usuario navega por diferentes páginas de la aplicación, y esta configuración asegura que cada página se renderice correctamente según la URL.
 *
 * Dependencias:
 * - Layout: Componente de layout que envuelve todas las páginas.
 * - Home: Componente de la página de inicio.
 * - Catalogo: Componente que muestra el catálogo de productos.
 * - Offer: Componente que muestra las ofertas disponibles.
 * - CategoriesSection: Componente que muestra las categorías de productos.
 * - CartView: Componente que muestra el contenido del carrito de compras.
 * - ProductDetail: Componente que muestra los detalles de un producto específico.
 * - Contact: Componente que muestra la información de contacto.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: 'inicio', Component: Home },
      { path: 'catalogo', Component: Catalogo },
      { path: 'catalogo/:code', Component: ProductDetail },
      { path: 'ofertas', Component: Offer },
      { path: 'categorias', Component: CategoriesSection },
      { path: 'carrito', Component: CartView },
      { path: 'contactanos', Component: Contact },
    ],
  },
])
