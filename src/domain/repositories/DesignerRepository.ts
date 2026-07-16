import type { Designer } from '../models/Designer'

/**
 * Modulo: Repositorio de Diseñadores
 *
 * Responsabilidad:
 * - Proveer una interfaz para acceder a la lista de diseñadores.
 *
 * Contexto de Negocio:
 * - Los diseñadores son entidades que pueden ser listadas y seleccionadas.
 *
 * Dependencias:
 * - Designer
 */
export interface DesignerRepository {
  getAll(): Promise<Designer[]>
}
