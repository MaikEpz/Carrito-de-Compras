import type { ProductRepository } from '../../domain/repositories/ProductRepository'

/**
 * Modulo: Gestion de Productos
 * 
 * Responsabilidad:
 * - Obtener la lista de productos disponibles.
 * 
 * Contexto de Negocio:
 * - El usuario desea ver los productos disponibles para realizar compras.
 * 
 * Dependencias:
 * - ProductRepository
 */
export async function getAllProducts(repo: ProductRepository) {
  return repo.getAll()
}
