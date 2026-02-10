export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className=" max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-foreground">HOGAR</span>
            </a>
            <p className="mt-4 text-sm text-black/70
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
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Muebles
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Decoración
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Iluminación
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
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
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Nuestros Diseñadores
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-black/70
                 hover:text-black">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-black/70
            ">
              Suscríbete para recibir novedades y ofertas exclusivas.
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-black/70
                   focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 cursor-pointer"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-black/5 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-black/70">
            &copy; {new Date().getFullYear()} HOGAR. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
