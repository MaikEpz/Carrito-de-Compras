import type { Product } from './types'

// Datos de productos de ejemplo (en producción vendrían de la API REST)
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sofá Moderno Oslo',
    description: 'Sofá de tres plazas con diseño escandinavo minimalista. Tapizado en tela de alta calidad con patas de madera de roble natural. Perfecto para espacios contemporáneos.',
    price: 1299.00,
    image: '/products/sofa.jpg',
    category: 'Muebles',
    stock: 15,
  },
  {
    id: '2',
    name: 'Lámpara de Pie Arco',
    description: 'Elegante lámpara de pie con brazo arqueado y base de mármol. Pantalla de lino natural que proporciona una luz cálida y acogedora.',
    price: 349.00,
    image: '/products/lamp.jpg',
    category: 'Iluminación',
    stock: 23,
  },
  {
    id: '3',
    name: 'Mesa de Centro Nórdica',
    description: 'Mesa de centro redonda con superficie de mármol blanco y patas de metal dorado. Combina elegancia clásica con diseño moderno.',
    price: 589.00,
    image: '/products/table.jpg',
    category: 'Muebles',
    stock: 8,
  },
  {
    id: '4',
    name: 'Sillón Lectura Comfort',
    description: 'Sillón individual perfecto para rincones de lectura. Respaldo alto ergonómico con tapizado de terciopelo suave en tonos neutros.',
    price: 749.00,
    image: '/products/chair.jpg',
    category: 'Muebles',
    stock: 12,
  },
  {
    id: '5',
    name: 'Jarrón Cerámico Artesanal',
    description: 'Jarrón hecho a mano por artesanos locales. Acabado mate en tonos tierra con textura única. Cada pieza es ligeramente diferente.',
    price: 89.00,
    image: '/products/vase.jpg',
    category: 'Decoración',
    stock: 45,
  },
  {
    id: '6',
    name: 'Espejo Circular Dorado',
    description: 'Espejo decorativo con marco de metal dorado cepillado. Diámetro de 80cm, ideal para ampliar visualmente cualquier espacio.',
    price: 199.00,
    image: '/products/mirror.jpg',
    category: 'Decoración',
    stock: 18,
  },
  {
    id: '7',
    name: 'Cojines Set de 3',
    description: 'Set de tres cojines decorativos en tonos neutros y texturas variadas. Incluye fundas de lino, terciopelo y algodón orgánico.',
    price: 129.00,
    image: '/products/cushions.jpg',
    category: 'Textiles',
    stock: 32,
  },
  {
    id: '8',
    name: 'Estantería Flotante',
    description: 'Sistema de estantes flotantes modulares en madera de nogal. Set de 3 estantes de diferentes tamaños con herrajes ocultos.',
    price: 279.00,
    image: '/products/shelves.jpg',
    category: 'Muebles',
    stock: 20,
  },
]

// Simula una llamada a la API REST
export async function fetchProducts(): Promise<Product[]> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockProducts
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts.find((p) => p.id === id) || null
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const lowerQuery = query.toLowerCase()
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  )
}
