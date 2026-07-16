import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import logo from '@/assets/Hogar-logo.png'
import { useCart } from '../context/CartContext'
import { CartSidebar } from './cart/CartSideBar'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { MenuIcon } from '@/assets/icons/MenuIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { CartIcon } from '@/assets/icons/CartIcon'

/** * Componente de Cabecera que incluye el logo, navegación principal, barra de búsqueda y acceso al carrito.
 *
 * Responsabilidad:
 * - Mostrar el logo de la tienda y proporcionar navegación a las secciones principales.
 * - Permitir a los usuarios buscar productos desde cualquier página.
 * - Mostrar el estado del carrito y permitir acceso rápido al mismo.
 * 
 * Contexto de Negocio:
 * - La cabecera es un elemento persistente que facilita la navegación y mejora la experiencia del usuario.
 * - El acceso al carrito es fundamental para incentivar las compras, por lo que se muestra de manera prominente.
 * 
 * Dependencias:
 * - useCart: Hook para acceder al estado y acciones del carrito.
 * - CartSidebar: Componente que muestra el contenido del carrito en una barra lateral.
 * - Iconos: CloseIcon, MenuIcon, SearchIcon, CartIcon para mejorar la experiencia visual y de interacción.
 */
export function Header() {
  const navigate = useNavigate()
  const { getItemCount, toggleCart, state } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const itemCount = getItemCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim()
    const params = new URLSearchParams()
    if (query) {
      params.set('buscar', query)
    }

    navigate(`/catalogo${params.toString() ? `?${params.toString()}` : ''}`)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Hogar" className="size-10" />
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              HOGAR
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex px-6">
            <Link
              to="/categorias"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categorias
            </Link>
            <Link
              to="/ofertas"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ofertas
            </Link>
            <Link
              to="/catalogo"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Catalogo
            </Link>
            <Link
              to="/contactanos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contactanos
            </Link>
          </nav>
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-lg mx-8 md:flex bg-secondary rounded-lg">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-secondary pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </form>

          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="relative flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary cursor-pointer"
            >
              <CartIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Menú</span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <form onSubmit={handleSearch} className="mb-4 bg-secondary rounded-lg">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-secondary pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </form>

              <nav className="flex flex-col gap-2">
                <Link
                  to="/categorias"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Categorias
                </Link>
                <Link
                  to="/ofertas"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link
                  to="/catalogo"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Catalogo
                </Link>
                <Link
                  to="/contactanos"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contactanos
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      {state.isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={toggleCart} />

          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-background shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 className="text-lg font-semibold text-foreground">Tu Carrito</h2>
                <button
                  onClick={toggleCart}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <CloseIcon className="h-5 w-5" />
                  <span className="sr-only">Cerrar</span>
                </button>
              </div>
              <div className="flex-1 overflow-hidden px-6">
                <CartSidebar />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
