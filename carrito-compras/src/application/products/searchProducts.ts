import type {
  ProductRepository,
  SearchFilters,
} from '../../domain/repositories/ProductRepository'

/**
 * Modulo: Gestion de Productos 
 * 
 * Responsabilidad:
 * - Buscar productos según filtros específicos.
 * 
 * Contexto de Negocio:
 * - El usuario desea encontrar productos que cumplan con ciertos criterios, como categoría, diseñador, rango de precios, etc.
 * 
 * Dependencias:
 * - ProductRepository
 */
export async function searchProducts(
  repo: ProductRepository,
  filters: SearchFilters = {}
) {
  return repo.search(filters)
}
