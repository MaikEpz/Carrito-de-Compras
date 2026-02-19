export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className=" max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-foreground">HOGAR</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground
            ">
              Diseño elegante para transformar tu hogar con piezas únicas y de calidad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Tienda
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Muebles
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Decoración
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Iluminación
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Textiles
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Información
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="/inicio#AboutUs" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/inicio#OurDesigners" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Nuestros Diseñadores
                </a>
              </li>
              <li>
                <a href="/ofertas" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="/contactanos" className="text-sm text-muted-foreground
                 hover:text-foreground">
                  Contacto
                </a>
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
