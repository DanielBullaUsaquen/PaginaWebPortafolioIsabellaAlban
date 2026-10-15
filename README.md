# ISALBÁN — Portafolio de Isabella Andrea Albán Fernández

Sitio de portafolio profesional (diseño editorial, identidad visual y diseño de información).
Construido con [Astro](https://astro.build): HTML estático, sin JavaScript en el cliente, imágenes optimizadas
automáticamente (AVIF/WebP responsivas) y listo para desplegar en Vercel.

## Requisitos

- Node.js 22.12 o superior

## Comandos

| Comando            | Qué hace                                                        |
| ------------------ | --------------------------------------------------------------- |
| `npm install`      | Instala dependencias                                            |
| `npm run dev`      | Servidor local en `http://localhost:4321` con recarga en vivo   |
| `npm run build`    | Verifica tipos y genera el sitio en `dist/`                     |
| `npm run preview`  | Sirve `dist/` localmente                                        |
| `npm test`         | Compila y ejecuta las pruebas (escritorio + móvil)              |
| `npm run test:ui`  | Pruebas en modo visual interactivo                              |

La primera vez que se ejecuten las pruebas: `npx playwright install chromium`.

## Estructura

```
src/
  assets/imagenes/   Imágenes originales suministradas (Astro las optimiza al compilar)
  components/        Header (menú permanente) y Nombre (firma tipográfica)
  data/proyectos.ts  Contenido de los 4 proyectos: título, descripción, etiquetas, imagen
  layouts/Base.astro Estructura común, SEO y metadatos
  pages/             index (Inicio), proyectos, sobre-mi, contacto, 404
  styles/global.css  Tokens: paleta, tipografía, espaciado, temas por página
public/fonts/        Playfair Display (archivos suministrados, convertidos a WOFF2) + licencia OFL
recursos/            Brief original y referencias de diagramación (no se publican)
tests/               Pruebas Playwright
```

## Editar contenido

- **Proyectos**: `src/data/proyectos.ts`. Para agregar uno, coloca la imagen en `src/assets/imagenes/` e
  impórtala en ese archivo.
- **Texto «Sobre mí»**: `src/pages/sobre-mi.astro`.
- **Correo, teléfono y redes**: arriba de `src/pages/contacto.astro`.
- **Colores y tipografía**: variables en `src/styles/global.css`.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: _Add New → Project_, importar el repositorio. Vercel detecta Astro automáticamente
   (build `npm run build`, salida `dist`). No requiere variables de entorno.
3. Con el dominio definitivo, descomentar `site` en `astro.config.mjs` (habilita URL canónicas y Open Graph absolutas).
