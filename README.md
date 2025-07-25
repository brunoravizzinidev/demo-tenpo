# Tenpo Chile - Landing Page

## Descripción del Proyecto

Landing page para demo de Tenpo.

### Objetivo Principal

Capturar leads calificados mediante un formulario digital para la apertura de cuenta o solicitud de información, optimizado para tráfico proveniente de campañas en Instagram, Facebook, YouTube y Google Ads.

### Palabra Clave Principal

"Tenpo cuenta digital Chile"

## Stack Tecnológico

-   **HTML5:** Estructura semántica y accesible
-   **Tailwind CSS:** Framework CSS utilitario y responsive
-   **JavaScript (Vanilla):** Funcionalidades interactivas sin dependencias externas
-   **JSON:** Gestión de contenido dinámico
-   **Python:** Servidor de desarrollo local opcional

### Dependencias

-   `tailwindcss`: Framework CSS
-   `@tailwindcss/typography`: Plugin extendido para mejorar la legibilidad

## Características Principales

### Funcionalidades

-   📱 Diseño 100% responsive y mobile-first
-   ⚡ Carga dinámica de contenido desde JSON y Loading
-   📝 Formulario de apertura de cuenta con validación en tiempo real
-   🎭 Micro-interacciones y animaciones fluidas con GSAP, atroposjs y ScrollTrigger
-   🔍 SEO optimizado con meta tags y Open Graph desde JSON
-   ♿ Accesibilidad
-   📊 Listo para integración con Google Tag Manager

### Secciones

1. **Header/Navegación:** Sticky header con logo Tenpo y CTA destacado - Adapta Movile
2. **Hero:** Video de fondo (vida digital) y mensaje principal - CTA
3. **Benefits:** Textos y showcase animado del producto en la App
4. **Beneficios:** Grilla animada con las ventajas y servicios clave
5. **Contacto:** Formulario digital con feedback instantáneo
6. **Footer:** Información institucional, redes sociales y legalidad

## Cómo Empezar

### Prerrequisitos

-   Node.js (v14 o superior)
-   Python 3.x (opcional, para servidor de desarrollo local)

### Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd demo-tenpo
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Compilar Tailwind CSS**

```bash
npm run build
```

4. **Iniciar servidor de desarrollo**

```bash
npm run serve
```

5. **Abrir en navegador**

```
http://localhost:8000
```

### Scripts Disponibles

-   `npm run dev`: Compila Tailwind en modo watch
-   `npm start`: Compila Tailwind en modo watch e Inicia server
-   `npm run build`: Compila Tailwind para producción
-   `npm run serve`: Inicia servidor HTTP local

## Estructura del Proyecto

```
demo-tenpo/
├── index.html              # Página principal
├── README.md               # Documentación
├── package.json            # Configuración npm
├── tailwind.config.js      # Configuración Tailwind
├── data/
│   └── content.json        # Contenido dinámico
├── dist/
│   └── styles.css          # CSS compilado
├── js/
│   └── main.js             # JavaScript principal
├── src/
│   └── input.css           # CSS fuente
└── assets/
    ├── images/             # Imágenes de producto/branding
    ├── videos/             # Videos hero o mockup app
    └── icons/              # Iconos SVG (ej. Feather, Lucide)
```

## Cómo Personalizar

### 1. Cambiar Contenido

Edita `data/content.json` para modificar:

-   Textos de todas las secciones
-   Beneficios y servicios destacados
-   Datos de contacto
-   Redes sociales y links
-   Metadatos SEO y Open Graph

**Ejemplo:**

```json
{
	"hero": {
		"headline": "Pon tu dinero en movimiento",
		"subheadline": "Control total desde tu celular con la Cuenta Digital Tenpo.",
		"cta_button_text": "Abre tu cuenta gratis"
	}
}
```

### 3. Configurar Google Tag Manager

1. **Obtener ID personalizado de GTM**
    - Crear cuenta en Google Tag Manager
    - Obtener el ID del contenedor (formato: GTM-XXXXXXX)
2. **Activar en HTML**

```html
<!-- En index.html, antes del cierre de <head>, reemplaza GTM-XXXXXXX -->
<script>
	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != 'dataLayer' ? '&l=' + l : '';
		j.async = true;
		j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-TU_ID_AQUI');
</script>
```

### 4. Personalizar Colores y Tipografía

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      tenpo: '#00C48C',
      'tenpo-suave': '#A7F3CE',
      secondary: '#00B2FF',
      'tenpo-bg': '#F5F6FA',
      'dark-text': '#222B45',
      'light-text': '#EEEEEE'
    },
    fontFamily: {
      heading: ['Graphie', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    }
  }
}
```

### 5. Reemplazar Imágenes

1. **Agregar nuevas imágenes** en `assets/images/`
2. **Actualizar rutas** en `data/content.json`
3. **Optimizar formato** (usa .webp para performance)

## Optimización para Producción

### Performance

-   ✅ Imágenes optimizadas y lazy loading
-   ✅ CSS minificado y modular
-   ✅ JavaScript estructurado
-   ✅ Fuentes precargadas

### SEO

-   ✅ Meta tags y Open Graph dinámicos
-   ✅ Estructura HTML5 semántica
-   ✅ Textos alt descriptivos en imágenes

### Accesibilidad

-   ✅ Buen contraste de colores (revisión WCAG)
-   ✅ Navegación por teclado fluida
-   ✅ Atributos ARIA en elementos interactivos
-   ✅ Etiquetas descriptivas

## Despliegue

### Opciones de Hosting

1. **Netlify** (recomendado)
2. **Vercel**
3. **GitHub Pages**

### Pasos para Netlify

1. Conectar el repositorio Git
2. Configurar el build: `npm run build`
3. Directorio de publicación: `./`
4. Deploy automático con cada push

## Soporte y Mantenimiento

### Actualizaciones de Contenido

-   Editar `data/content.json`
-   Los cambios se reflejan al instante tras recarga

### Monitoreo

-   Google Analytics via GTM
-   Lighthouse para performance y accesibilidad
-   Search Console para SEO

## Licencia

MIT License - Tenpo Chile 2025

## Contacto Técnico

Para soporte técnico o consultas sobre el desarrollo:

-   Email: brunomailcasa@gmail.com
-   Documentación: Este README.md

**Desarrollado para ustedes - Aprovechando mi Tenpo**
