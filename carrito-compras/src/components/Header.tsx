import { useState } from 'react'
import { useNavigate } from 'react-router'
import logo from '@/assets/Hogar-logo.png'
import { useCart } from '../context/CartContext'
import { CartSidebar } from '@/components/cart/CartSideBar'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { MenuIcon } from '@/assets/icons/MenuIcon'
import { SearchIcon } from '@/assets/icons/SearchIcon'
import { CartIcon } from '@/assets/icons/CartIcon'

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
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

    navigate(`/productos${params.toString() ? `?${params.toString()}` : ''}`)
    onSearch?.(query)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          { /*Logo*/}
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Hogar" className="size-10" />
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              HOGAR
            </span>
          </a>

          { /*Desktop Navigation*/}
          <nav className="hidden items-center gap-8 md:flex px-6">
            <a
              href="/categorias"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categorias
            </a>
            <a
              href="/ofertas"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ofertas
            </a>
            <a
              href="/catalogo"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Catalogo
            </a>
            <a
              href="/contactanos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contactanos
            </a>
            
          </nav>
          {/*Search Bar - Desktop */}
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

          { /*Right Actions*/}
          <div className="flex items-center">
            {/*Cart Button */}
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

            {/*Mobile Menu Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              <span className="sr-only">Menú</span>
            </button>
          </div>

        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              {/* Mobile Search */}
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

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-2">
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </a>
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Muebles
                </a>
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Decoración
                </a>
                <a
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iluminación
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
      {/*Cart Sidebar Overlay */}
      {state.isOpen && (
        <div className="fixed inset-0 z-50">
          { /*Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleCart}
          />

          { /*Sidebar */}
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-background shadow-xl">
            <div className="flex h-full flex-col">
              { /*Header */}
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
              {/* Content */}
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
