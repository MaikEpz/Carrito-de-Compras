import { Outlet } from 'react-router'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

/**  
 * Componente de Layout que envuelve toda la aplicación, incluyendo la cabecera, el pie de página y el espacio para el contenido principal.
 *
 * Responsabilidad:
 * - Proporcionar una estructura consistente para todas las páginas de la aplicación.
 * - Incluir elementos comunes como la cabecera y el pie de página.
 * - Renderizar el contenido específico de cada página a través del Outlet.
 * 
 * Contexto de Negocio:
 * - El usuario navega por diferentes páginas de la aplicación, y el Layout asegura que la experiencia visual sea coherente.
 * - La cabecera puede incluir elementos de navegación, mientras que el pie de página puede contener información de contacto o enlaces a redes sociales.
 * 
 * Dependencias:
 * - Header: Componente de cabecera que se muestra en todas las páginas.
 * - Footer: Componente de pie de página que se muestra en todas las páginas.
 * - Outlet: Componente de React Router que renderiza el contenido específico de cada ruta.
 */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
