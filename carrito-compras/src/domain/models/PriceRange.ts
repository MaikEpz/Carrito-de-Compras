/**
 * Módulo: Modelo de Dominio - Rango de Precio
 *
 * Responsabilidad:
 * - Definir la estructura de datos para un rango de precios disponible como filtro.
 *
 * Contexto de Negocio:
 * - Los rangos de precio permiten a los usuarios filtrar productos por su rango de costo, facilitando la búsqueda según su presupuesto.
 *
 * Dependencias:
 * - Ninguna
 */

export interface PriceRange {
  label: string
  min: number
  max: number
}
