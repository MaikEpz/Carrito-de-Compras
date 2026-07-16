import { useEffect, useState } from 'react'
import type { Designer } from '../../../domain/models/Designer'
import { getDesigners } from '../../../application/designers/getDesigners'
import { mockDesignerRepository } from '../../../infrastructure/designers/mockDesignerRepository'

/** * Módulo: Nuestros Diseñadores
 *
 * Responsabilidad:
 * - Mostrar a los usuarios el talento creativo detrás de HOGAR a través de perfiles de diseñadores destacados.
 * - Inspirar confianza y conexión emocional al presentar a los diseñadores que contribuyen a la marca.
 *
 * Contexto de Negocio:
 * - Los usuarios valoran conocer a las personas detrás de los productos, lo que puede aumentar la lealtad a la marca y la percepción de calidad.
 *
 * Dependencias:
 * - getDesigners: Función para obtener la lista de diseñadores desde el repositorio.
 * - mockDesignerRepository: Repositorio simulado para acceder a los datos de los diseñadores.
 */
export function OurDesigners() {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDesigners = async () => {
      try {
        const data = await getDesigners(mockDesignerRepository)
        setDesigners(data)
      } catch (error) {
        console.error('Error al cargar diseñadores:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDesigners()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-background" id="OurDesigners">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-4xl font-bold font-serif text-foreground">
              Nuestros Diseñadores
            </h2>
            <p className="text-muted-foreground">
              El talento y la visión creativa que da vida a HOGAR
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            Cargando diseñadores...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-background" id="OurDesigners">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-4xl font-bold font-serif text-foreground">
            Nuestros Diseñadores
          </h2>
          <p className="text-muted-foreground">
            El talento y la visión creativa que da vida a HOGAR
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {designers.map((designer) => (
            <div key={designer.code} className="group">
              <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                <img
                  alt={designer.alt}
                  className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  src={designer.image}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm text-primary-foreground">
                    {designer.quote}
                  </p>
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold font-serif text-foreground">
                {designer.name}
              </h3>
              <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                {designer.role}
              </p>
              <p className="text-muted-foreground">{designer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
