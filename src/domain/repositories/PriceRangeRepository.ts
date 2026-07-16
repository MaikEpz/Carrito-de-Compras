import type { PriceRange } from '../models/PriceRange'

/**
 * Módulo: Repositorio de Rangos de Precio
 *
 * Responsabilidad:
 * - Proveer una interfaz para acceder a los rangos de precio disponibles como filtros.
 *
 * Contexto de Negocio:
 * - Los rangos de precio permiten a los usuarios filtrar productos según su presupuesto.
 *
 * Dependencias:
 * - PriceRange
 */
export interface PriceRangeRepository {
  getAll(): Promise<PriceRange[]>
}
