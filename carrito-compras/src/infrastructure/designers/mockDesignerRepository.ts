import type { Designer } from '../../domain/models/Designer'
import type { DesignerRepository } from '../../domain/repositories/DesignerRepository'

/**
 * Modulo: Repositorio de Diseñadores (Mock)
 *
 * Responsabilidad:
 * - Proveer datos de diseñadores para la sección "Conoce a Nuestros Diseñadores".
 *
 * Contexto de Negocio:
 * - Este repositorio simula una fuente de datos, permitiendo el desarrollo y pruebas sin depender de una base de datos real.
 *
 * Dependencias:
 * - Designer
 * - DesignerRepository
 */
const mockDesigners: Designer[] = [
  {
    code: 'DES-ELN-001',
    name: 'Elena Vance',
    role: 'Diseñadora de Mobiliario',
    quote: '"El diseño es silencio visual."',
    description:
      'Especialista en estructuras de madera nórdica. Elena busca el equilibrio entre la calidez orgánica y las líneas industriales limpias.',
    image:
      'https://img.freepik.com/foto-gratis/mujer-morena-sonriendo-brazos-cruzados-mirando-camara-sobre-gris_171337-987.jpg',
    alt: 'Elena Vance, Diseñadora Senior',
  },
  {
    code: 'DES-JUL-002',
    name: 'Julian Arcas',
    role: 'Arquitecto de Interiores',
    quote: '"Menos, pero con mejor intención."',
    description:
      'Con más de 15 años de experiencia, Julian lidera nuestra visión arquitectónica, integrando mobiliario y espacio de forma indivisible.',
    image:
      'https://img.freepik.com/foto-gratis/apuesto-joven-brazos-cruzados-sobre-fondo-blanco_23-2148222620.jpg',
    alt: 'Julian Arcas, Arquitecto de Interiores',
  },
  {
    code: 'DES-SOF-003',
    name: 'Sofia Martens',
    role: 'Curadora de Textiles',
    quote: '"La textura es el alma del hogar."',
    description:
      'Sofia se encarga de la selección de fibras naturales, asegurando que cada pieza de HOGAR sea tan placentera al tacto como a la vista.',
    image:
      'https://img.freepik.com/foto-gratis/hermosa-mujer-sonriente-que-ve-amistosa-lista-ayudar-al-cliente-o-al-cliente-tomandose-mano-mirando-fondo-blanco-camara_176420-53436.jpg',
    alt: 'Sofia Martens, Curadora de Arte y Textil',
  },
]

export const mockDesignerRepository: DesignerRepository = {
  async getAll() {
    return mockDesigners
  },
}
