import { useEffect } from 'react'
import { HeroSection } from './store/HeroSection'
import { AboutUs } from './store/AboutUs'
import { OurDesigners } from './store/OurDesigners'

/** * Componente principal de la página de inicio que integra las secciones de héroe, sobre nosotros y nuestros diseñadores.
 *
 * Responsabilidad:
 * - Mostrar una introducción atractiva a la tienda con el héroe.
 * - Proporcionar información sobre la tienda y su misión en la sección "Sobre Nosotros".
 * - Destacar a los diseñadores que colaboran con la tienda en la sección "Nuestros Diseñadores".
 * 
 * Contexto de Negocio:
 * - La página de inicio es la primera impresión que los usuarios tienen de la tienda, por lo que debe ser atractiva y comunicar claramente el valor de la marca.
 * - Las secciones están diseñadas para construir confianza y conexión emocional con los visitantes, incentivando la exploración del catálogo.
 * 
 * Dependencias:
 * - HeroSection: Componente que muestra una imagen destacada y un mensaje de bienvenida.
 * - AboutUs: Componente que proporciona información sobre la tienda y su misión.
 * - OurDesigners: Componente que destaca a los diseñadores colaboradores.
 */
export function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <>
      <HeroSection />
      <AboutUs />
      <OurDesigners />
    </>
  )
}
