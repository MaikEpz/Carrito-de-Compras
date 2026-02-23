/**
 * Modulo: Modelo de Dominio - Diseñador
 * 
 * Responsabilidad:
 * - Definir la estructura de datos para un diseñador.
 * 
 * Contexto de Negocio:
 * - Un diseñador es una figura clave en la industria de la moda, responsable de crear y conceptualizar prendas y colecciones. La información sobre los diseñadores es esencial para los usuarios que desean conocer más sobre las personas detrás de las marcas y productos que consumen.
 * 
 * Dependencias:
 * - Ninguna
 */

export interface Designer {
  code: string
  name: string
  role: string
  quote: string
  description: string
  image: string
  alt: string
}
