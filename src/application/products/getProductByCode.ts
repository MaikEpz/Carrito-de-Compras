import type { ProductRepository } from '../../domain/repositories/ProductRepository'

/**
 * Modulo: Gestion de Productos
 * 
 * Responsabilidad:
 * - Obtener un producto por su código.
 * 
 * Contexto de Negocio:
 * - El usuario desea ver los detalles de un producto específico, identificado por su código único.
 * 
 * Dependencias:
 * - ProductRepository
 */
export async function getProductByCode(repo: ProductRepository, code: string) {
  return repo.getByCode(code)
}
