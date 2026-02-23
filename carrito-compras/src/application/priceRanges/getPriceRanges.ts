import type { PriceRangeRepository } from '../../domain/repositories/PriceRangeRepository'

/**
 * Módulo: Gestión de Rangos de Precio
 *
 * Responsabilidad:
 * - Obtener la lista de rangos de precio disponibles.
 *
 * Contexto de Negocio:
 * - El usuario desea ver los rangos de precio disponibles para filtrar productos.
 *
 * Dependencias:
 * - PriceRangeRepository
 */
export async function getPriceRanges(repo: PriceRangeRepository) {
  return repo.getAll()
}
