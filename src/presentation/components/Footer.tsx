import { Link } from 'react-router'

/** * Componente de Pie de Página que proporciona información de contacto, enlaces a secciones importantes y un formulario de suscripción al boletín.
 *
 * Responsabilidad:
 * - Mostrar información de contacto y enlaces a secciones importantes del sitio.
 * - Proporcionar un formulario de suscripción al boletín para que los usuarios puedan recibir novedades y ofertas exclusivas.
 *
 * Contexto de Negocio:
 * - El pie de página es una sección clave para mantener a los usuarios informados y fomentar la interacción continua con la marca.
 *
 * Dependencias:
 * - Link: Componente de navegación para redirigir a diferentes secciones del sitio.
 */
export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className=" max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-foreground">HOGAR</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground
            ">
              Diseño elegante para transformar tu hogar con piezas únicas y de calidad.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Tienda
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Muebles
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Decoración
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Iluminación
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Textiles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Información
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/inicio#AboutUs" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/inicio#OurDesigners" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Nuestros Diseñadores
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/contactanos" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-muted-foreground
            ">
              Suscríbete para recibir novedades y ofertas exclusivas.
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground
                   focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 cursor-pointer"
                >
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 border-t border-border text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HOGAR. Desarrollado por Michael Peñaloza.
          </p>
        </div>
      </div>
    </footer>
  )
}
