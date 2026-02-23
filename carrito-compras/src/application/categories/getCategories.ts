import type { CategoryRepository } from '../../domain/repositories/CategoryRepository'

/**
 * Módulo: Gestión de Categorías
 *
 * Responsabilidad:
 * - Obtener la lista de categorías disponibles.
 *
 * Contexto de Negocio:
 * - El usuario desea ver las categorías disponibles para filtrar productos.
 *
 * Dependencias:
 * - CategoryRepository
 */
export async function getCategories(repo: CategoryRepository) {
  return repo.getAll()
}
