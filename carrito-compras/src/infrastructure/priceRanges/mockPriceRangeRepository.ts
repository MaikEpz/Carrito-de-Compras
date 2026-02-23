import type { PriceRange } from '../../domain/models/PriceRange'
import type { PriceRangeRepository } from '../../domain/repositories/PriceRangeRepository'

/**
 * Módulo: Repositorio de Rangos de Precio (Mock)
 *
 * Responsabilidad:
 * - Proveer datos de rangos de precio para filtrar productos.
 *
 * Contexto de Negocio:
 * - Este repositorio simula una fuente de datos, permitiendo el desarrollo y pruebas sin depender de una base de datos real.
 *
 * Dependencias:
 * - PriceRange
 * - PriceRangeRepository
 */
const mockPriceRanges: PriceRange[] = [
  { label: 'Menos de 150€', min: 0, max: 150 },
  { label: '150€ - 400€', min: 150, max: 400 },
  { label: '400€ - 800€', min: 400, max: 800 },
  { label: 'Más de 800€', min: 800, max: Infinity },
]

export const mockPriceRangeRepository: PriceRangeRepository = {
  async getAll() {
    return mockPriceRanges
  },
}
