import type { Product } from '../../../domain/models/Product'

/**
 * Módulo: Componente de Tarjeta de Producto
 *
 * Responsabilidad:
 * - Representar visualmente un producto en el catálogo.
 * - Permitir al usuario interactuar con el producto (agregar al carrito, ver detalles).
 */
export interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

/**
 * Módulo: Componente de Vista de Productos
 *
 * Responsabilidad:
 * - Mostrar una colección de productos en formato grid o lista.
 * - Manejar estados vacíos y mensajes contextuales.
 */
export interface ProductViewProps {
  products: Product[]
  noCategoriesSelected?: boolean
  viewMode?: 'grid' | 'list'
}
