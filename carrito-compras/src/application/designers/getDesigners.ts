import type { DesignerRepository } from '../../domain/repositories/DesignerRepository'

/**
 * Modulo: Gestion de Diseñadores
 * 
 * Responsabilidad:
 * - Obtener la lista de diseñadores disponibles.
 * 
 * Contexto de Negocio:
 * - El usuario desea ver los diseñadores disponibles para filtrar productos o para información general.
 * 
 * Dependencias:
 * - DesignerRepository
 */
export async function getDesigners(repo: DesignerRepository) {
  return repo.getAll()
}
