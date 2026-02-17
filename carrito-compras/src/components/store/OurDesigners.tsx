'use client';
export function OurDesigners() {
    const designers = [
        {
            id: 1,
            name: "Elena Vance",
            role: "Diseñadora de Mobiliario",
            quote: '"El diseño es silencio visual."',
            description:
                "Especialista en estructuras de madera nórdica. Elena busca el equilibrio entre la calidez orgánica y las líneas industriales limpias.",
            image:
                "https://img.freepik.com/foto-gratis/mujer-morena-sonriente-brazos-cruzados-mirando-camara-sobre-gris_171337-987.jpg",
            alt: "Elena Vance, Diseñadora Senior",
        },
        {
            id: 2,
            name: "Julian Arcas",
            role: "Arquitecto de Interiores",
            quote: '"Menos, pero con mejor intención."',
            description:
                "Con más de 15 años de experiencia, Julian lidera nuestra visión arquitectónica, integrando mobiliario y espacio de forma indivisible.",
            image:
                "https://img.freepik.com/foto-gratis/apuesto-joven-brazos-cruzados-sobre-fondo-blanco_23-2148222620.jpg",
            alt: "Julian Arcas, Arquitecto de Interiores",
        },
        {
            id: 3,
            name: "Sofia Martens",
            role: "Curadora de Textiles",
            quote: '"La textura es el alma del hogar."',
            description:
                "Sofia se encarga de la selección de fibras naturales, asegurando que cada pieza de HOGAR sea tan placentera al tacto como a la vista.",
            image:
                "https://img.freepik.com/foto-gratis/hermosa-mujer-sonriente-que-ve-amistosa-lista-ayudar-al-cliente-o-al-cliente-tomandose-mano-mirando-fondo-blanco-camara_176420-53436.jpg",
            alt: "Sofia Martens, Curadora de Arte y Textil",
        },
    ];

    return (
        <section className="py-20 px-6 bg-background" id='OurDesigners'>
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h2 className="mb-4 text-4xl font-bold font-serif text-foreground">Nuestros Diseñadores</h2>
                    <p className="text-muted-foreground">
                        El talento y la visión creativa que da vida a HOGAR
                    </p>
                </div>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {designers.map((designer) => (
                        <div key={designer.id} className="group">
                            <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                                <img
                                    alt={designer.alt}
                                    className="size-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                    src={designer.image}
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-sm text-primary-foreground">{designer.quote}</p>
                                </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold font-serif text-foreground">{designer.name}</h3>
                            <p className="mb-4 text-xs  uppercase tracking-widest text-muted-foreground">
                                {designer.role}
                            </p>
                            <p className="text-muted-foreground">
                                {designer.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}