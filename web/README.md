# PlayJS

Landing page y sitio para [PlayJS](https://playjs.dev/) - el playground interactivo para JavaScript/TypeScript.

Este es el sitio web de PlayJS construido con **Astro** y **React**. Es el punto de entrada para usuarios que quieren conocer qué es PlayJS, ver características en vivo, y aprender cómo usarlo.

## Estructura del Proyecto

```
web/
├── public/              # Activos estáticos
├── src/
│   ├── assets/
│   │   ├── icons/       # SVG de iconos personalizados
│   │   ├── images/      # Imágenes de la web
│   │   └── logos/       # Logos de marcas y PlayJS
│   ├── components/      # Componentes React/JSX
│   │   ├── Hero.jsx              # Sección principal
│   │   ├── Features1/2.jsx       # Características
│   │   ├── PlayJSExamples.jsx    # Ejemplos interactivos
│   │   ├── Testimonials.jsx      # Testimonios
│   │   ├── Blog.jsx              # Últimos artículos
│   │   ├── FAQ.jsx               # Preguntas frecuentes
│   │   └── ...otros componentes
│   ├── layouts/         # Layouts Astro
│   ├── pages/           # Páginas principales
│   │   └── index.astro  # Página de inicio
│   └── styles/          # Estilos globales
└── package.json
```

## Cómo Contribuir

¿Quieres mejorar la web? ¡Excelente! Aquí hay algunas formas en que puedes ayudar:

### Mejoras de Contenido
- **Corregir texto o traduciones** - Encuentra textos con errores tipográficos o mejora las traducciones
- **Reescribir descripciones** - Haz los textos más claros o atractivos
- **Agregar más testimonios** - Añade testimonios reales de usuarios
- **Mejorar artículos del blog** - Actualiza o expande los artículos existentes

### Mejoras de Diseño
- **Diseño responsivo** - Mejora la experiencia en dispositivos móviles
- **Accesibilidad** - Implementa mejoras WCAG
- **Animaciones** - Añade transiciones y efectos visuales
- **Temas** - Implementa temas alternativos

### Nuevas Características
- **Ejemplos interactivos** - Agrega más ejemplos de código en `PlayJSExamples.jsx`
- **Secciones nuevas** - Diseña nuevas secciones (Roadmap, Community, etc.)
- **Integración de datos** - Conecta con APIs (GitHub stars, últimas releases, etc.)
- **Multi-idioma** - Expande el soporte de idiomas

## ⚙️ Configuración Local

### Requisitos
- Node.js 16+ 
- npm o pnpm

### Pasos

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/salteadorneo/PlayJS.git
   cd PlayJS/web
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   Dirígete a `http://localhost:3000`

## Comandos Disponibles

```bash
# Desarrollo en vivo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Linter/Formatter
npm run lint
```

## Trabajar con Componentes

Los componentes están organizados por función:

- **Hero.jsx** - Sección principal con call-to-action
- **Features1.jsx** - Características principales de PlayJS
- **PlayJSExamples.jsx** - Ejemplos interactivos con iframes
- **Features2.jsx** - Testing integrado
- **Testimonials.jsx** - Testimonios de usuarios
- **FAQ.jsx** - Preguntas frecuentes
- **Blog.jsx** - Últimos artículos
- **Pricing.jsx** - Planes (todos gratuitos)

### Para añadir un ejemplo interactivo

Edita `src/components/PlayJSExamples.jsx` y agrega un objeto al array `examples`:

```jsx
{
  title: "Mi Ejemplo",
  description: "Descripción del ejemplo",
  code: "const x = 2 + 2\nx",
  hash: "Y29uc3QgeCA9IDIgKyAyCng="  // Base64 del código
}
```

El hash se genera automáticamente en [playjs.dev](https://playjs.dev). Copia el código en la URL y luego copia el hash.

## Idiomas

La web está completamente en **español**. Si quieres:
- **Traducir a otro idioma** - Crea nuevas archivos i18n
- **Mejorar el español** - Sugiere cambios en textos existentes

## Checklist para PRs

Antes de enviar un PR asegúrate de:
- [ ] El código está limpio y sigue el estilo existente
- [ ] Los cambios se ven bien en mobile y desktop
- [ ] Las imágenes están optimizadas
- [ ] No hay textos en inglés (usar español)
- [ ] El sitio carga rápido

## Reportar Issues

Si encuentras un problema:
1. Verifica que no sea un issue duplicado
2. Describe el problema claramente
3. Incluye pasos para reproducirlo si es posible
4. Adjunta screenshots si es visual

## Recursos

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## Contacto

¿Preguntas? Abre un [Discussion](https://github.com/salteadorneo/PlayJS/discussions) o contacta con los maintainers.

---

**¡Gracias por ayudar a mejorar PlayJS! ���**

![GitHub stars](https://img.shields.io/github/stars/salteadorneo/PlayJS)
![GitHub issues](https://img.shields.io/github/issues/salteadorneo/PlayJS)
![GitHub license](https://img.shields.io/github/license/salteadorneo/PlayJS)
