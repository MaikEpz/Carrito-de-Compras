import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon'
import { Link } from 'react-router'

/** * Componente de la sección hero que presenta una introducción atractiva al sitio, destacando el diseño elegante y moderno de los productos ofrecidos.
 *
 * Responsabilidad:
 * - Presentar una introducción visualmente atractiva al sitio.
 * - Destacar el diseño elegante y moderno de los productos ofrecidos.
 * - Proporcionar enlaces claros para explorar el catálogo y las categorías.
 * 
 * Contexto de Negocio:
 * - El usuario llega a la página principal y busca una introducción que le motive a explorar los productos.
 * - El diseño debe ser atractivo y alineado con la estética de la marca para captar la atención del usuario.
 * 
 * Dependencias:
 * - Link: Componente de navegación para redirigir a la página de catálogo y categorías.
 * - ArrowRightIcon: Icono para mejorar la apariencia del enlace "Ver Catalogo".
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-4xl font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            <span className="block">Diseño elegante</span>
            <span className="block mt-2">para tu hogar</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Descubre nuestra colección de muebles y artículos de decoración con diseño
            moderno y minimalista para transformar cualquier espacio.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver Catalogo
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/categorias"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary"
            >
              Explorar Categorías
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
