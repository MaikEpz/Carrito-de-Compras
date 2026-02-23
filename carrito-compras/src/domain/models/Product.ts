/**
 * Modulo: Modelo de Producto
 * 
 * Responsabilidad:
 * - Definir la estructura de datos para un producto en el sistema.
 * 
 * Contexto de Negocio:
 * - Los productos son los elementos fundamentales del catálogo de la tienda. Cada producto tiene características específicas que lo identifican, como su nombre, descripción, precio y disponibilidad.
 */

export interface Product {
  code: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  discount: number
}
