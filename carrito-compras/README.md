# 🛒 HOGAR - E-commerce de Muebles y Decoración

Aplicación web moderna de comercio electrónico especializada en muebles y artículos de decoración para el hogar. Construida con **React**, **TypeScript** y siguiendo los principios de **Clean Architecture**.

## ✨ Características Principales

- 🛍️ **Catálogo de Productos** - Navegación intuitiva con vista en grid o lista
- 🔍 **Búsqueda y Filtrado** - Búsqueda en tiempo real con filtros por categoría y rango de precio
- 🛒 **Carrito de Compras** - Gestión completa del carrito con persistencia
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🎨 **Interfaz Moderna** - Diseño minimalista con Tailwind CSS
- ⚡ **Alto Rendimiento** - Carga rápida y experiencia fluida
- 🏗️ **Clean Architecture** - Código mantenible y escalable

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación SPA
- **Tailwind CSS** - Estilos utilitarios

### Arquitectura
- **Clean Architecture** - Separación de responsabilidades
- **Repository Pattern** - Abstracción de datos
- **Context API** - Gestión de estado global

## 📁 Estructura del Proyecto

```
src/
├── application/        # Casos de uso (lógica de negocio)
│   ├── cart/          # Operaciones del carrito
│   ├── categories/    # Gestión de categorías
│   ├── designers/     # Gestión de diseñadores
│   ├── products/      # Operaciones de productos
│   └── priceRanges/   # Gestión de rangos de precio
├── domain/            # Modelos y contratos
│   ├── models/        # Entidades del dominio
│   └── repositories/  # Interfaces de repositorios
├── infrastructure/    # Implementaciones concretas
│   ├── categories/    # Repositorio mock de categorías
│   ├── designers/     # Repositorio mock de diseñadores
│   ├── products/      # Repositorio mock de productos
│   └── priceRanges/   # Repositorio mock de rangos
└── presentation/      # Capa de UI
    ├── components/    # Componentes React
    ├── context/       # Contextos globales
    ├── layout/        # Layouts de página
    ├── routes/        # Configuración de rutas
    └── utils/         # Utilidades de presentación
```

## 🏛️ Arquitectura Clean

El proyecto sigue los principios de **Clean Architecture**, organizando el código en capas con dependencias unidireccionales:

```
Presentation → Application → Domain ← Infrastructure
```

### Capas

1. **Domain** - Entidades y reglas de negocio puras
2. **Application** - Casos de uso y lógica de aplicación
3. **Infrastructure** - Implementaciones de repositorios y servicios externos
4. **Presentation** - Componentes React y UI

## 🎯 Funcionalidades Implementadas

### Catálogo
- ✅ Listado de productos con información detallada
- ✅ Vista en grid y lista
- ✅ Búsqueda por nombre y descripción
- ✅ Filtrado por categorías (Muebles, Decoración, Iluminación, Textiles)
- ✅ Filtrado por rangos de precio
- ✅ Ordenamiento (precio, nombre)
- ✅ Página de detalle de producto

### Carrito de Compras
- ✅ Agregar/eliminar productos
- ✅ Actualizar cantidades
- ✅ Cálculo automático de totales
- ✅ Aplicación de descuentos
- ✅ Sidebar deslizable
- ✅ Vista completa del carrito
- ✅ Validación de stock

### Otras Características
- ✅ Sección de categorías destacadas
- ✅ Información de diseñadores
- ✅ Página de ofertas
- ✅ Formulario de contacto
- ✅ Navegación responsive con menú móvil

## 🛠️ Instalación y Uso

### Requisitos Previos
- Node.js 18+ o Bun
- npm, yarn o bun

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/carrito-compras.git

# Navegar al directorio
cd carrito-compras

# Instalar dependencias
npm install
# o con bun
bun install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# o con bun
bun dev

# La aplicación estará disponible en http://localhost:5173
```

### Construcción

```bash
# Generar build de producción
npm run build
# o con bun
bun run build

# Preview del build
npm run preview
# o con bun
bun preview
```

## 📦 Scripts Disponibles

- `dev` - Inicia el servidor de desarrollo
- `build` - Genera el build de producción
- `preview` - Preview del build de producción
- `lint` - Ejecuta ESLint

## 🎨 Características de Diseño

- **Tema Minimalista** - Diseño limpio y moderno
- **Paleta Neutral** - Colores tierra y tonos suaves
- **Tipografía Elegante** - Fuentes serif para títulos
- **Animaciones Sutiles** - Transiciones suaves
- **Dark Mode Ready** - Preparado para tema oscuro

## 🔮 Próximas Mejoras

- [ ] Integración con API real
- [ ] Persistencia del carrito en localStorage
- [ ] Sistema de autenticación
- [ ] Proceso de checkout completo
- [ ] Pasarela de pago
- [ ] Panel de administración
- [ ] Sistema de reviews
- [ ] Lista de deseos
- [ ] Comparador de productos

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

Desarrollado con ❤️ por [Tu Nombre]

---

⭐ Si te gusta este proyecto, no olvides darle una estrella en GitHub
