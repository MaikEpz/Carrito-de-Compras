/**
 * Módulo: Modelo de Dominio - Categoría
 *
 * Responsabilidad:
 * - Definir la estructura de datos para una categoría de productos.
 *
 * Contexto de Negocio:
 * - Las categorías agrupan productos por tipo, permitiendo a los usuarios navegar y filtrar el catálogo de manera organizada.
 *
 * Dependencias:
 * - Ninguna
 */

export interface Category {
  code: string
  name: string
  description: string
  image: string
}
