/**
 * Componente "AboutUs" que presenta información sobre la empresa, su historia y valores.
 *
 * Responsabilidad:
 * - Proporcionar una sección informativa que destaque la historia, misión y valores de la empresa.
 * - Incluir imágenes que refuercen la identidad de la marca y su enfoque en el diseño de interiores.
 * 
 * Contexto de Negocio:
 * - La sección "Sobre Nosotros" es crucial para construir confianza y conexión emocional con los clientes, mostrando la autenticidad y el compromiso de la empresa con la calidad y el diseño.
 *
 * Dependencias:
 * - Ninguna
 */
export function AboutUs() {
  return (
    <section className="py-24 px-6 bg-background border-b border-border" id="AboutUs">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-serif font-bold ">Sobre Nosotros</h2>
          <div className="space-y-6 text-muted-foreground">
            <p>
              Fundada bajo la premisa del minimalismo funcional, HOGAR ha evolucionado de un pequeño taller artesanal a una referencia en el diseño de interiores moderno. No fabricamos muebles; diseñamos experiencias táctiles y visuales que perduran en el tiempo.
            </p>
            <p>
              Cada material es seleccionado meticulosamente bajo estándares de sostenibilidad y calidad superior. Madera certificada, textiles orgánicos y metales reciclados se fusionan para crear piezas que son tanto declaraciones de arte como objetos de uso cotidiano.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div>
              <p className="text-3xl mb-2">10+</p>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Años de Excelencia</p>
            </div>
            <div>
              <p className="text-3xl mb-2">4k</p>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Espacios Transformados</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            alt="Detalle de madera tallada"
            className="w-full h-80 object-cover mt-12"
            src="https://cdn.pixabay.com/photo/2018/06/14/21/15/bedroom-3475656_1280.jpg"
          />
          <img
            alt="Lámpara de diseño minimalista"
            className="w-full h-80 object-cover"
            src="https://cdn.pixabay.com/photo/2014/09/15/21/46/couch-447484_1280.jpg"
          />
        </div>
      </div>
    </section>
  )
}
