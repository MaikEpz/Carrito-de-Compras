'use client'


const categories = [
    {
        name: 'Muebles',
        description: 'Sofás, mesas y más',
        image: '/categories/furniture.jpg',
        productCount: 4,
    },
    {
        name: 'Decoración',
        description: 'Jarrones, espejos y accesorios',
        image: '/categories/decor.jpg',
        productCount: 2,
    },
    {
        name: 'Iluminación',
        description: 'Lámparas y luminarias',
        image: '/categories/lighting.jpg',
        productCount: 1,
    },
    {
        name: 'Textiles',
        description: 'Cojines y mantas',
        image: '/categories/textiles.jpg',
        productCount: 1,
    },
]

export function CategoriesSection() {
    return (
        <section id="categorias" className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Explora por Categoría
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        Encuentra exactamente lo que buscas para tu espacio
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <a
                            key={category.name}
                            href={`/?categoria=${category.name.toLowerCase()}`}
                            className="group relative overflow-hidden rounded-xl"
                        >
                            <div className="aspect-[4/5] relative bg-secondary">

                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                    <p className="mt-1 text-sm text-white/80">{category.description}</p>
                                    <p className="mt-2 text-xs uppercase tracking-wider text-white/60">
                                        {category.productCount} productos
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
