# 📁 DREAMER Assets

Esta carpeta contiene todos los activos visuales del portal mayorista DREAMER.

## Estructura

```
/assets
├── /images          # Imágenes de colecciones, hero, essence, logos
├── /icons           # Iconos SVG (opcional)
└── README.md        # Este archivo
```

## Cómo Descargar las Imágenes

Las URLs de las imágenes se encuentran en `/DREAMER — Recursos Visuales.md` en la raíz del proyecto.

### Opción 1: Descargar manualmente
1. Abre `/DREAMER — Recursos Visuales.md`
2. Copia la URL de cada imagen (usando las URLs `.webp` para web)
3. Descarga cada imagen en el navegador
4. Guarda en `/assets/images/` con el nombre exacto:

**Nombres esperados:**
- `DREAMER_LOGO.png` - Logo principal
- `cropped-faviconDre-32x32.png` - Favicon
- `dreamer-hero-bg.webp` - Hero banner (1536x864)
- `dreamer-essence.webp` - Sección essence (1024x1536)
- `dreamer-collection-resort.webp` - Colección Miami Resort (1056x1408)
- `dreamer-collection-denim.webp` - Colección Urban Denim (1056x1408)
- `dreamer-collection-essentials.webp` - Colección Elevated Essentials (1056x1408)

### Opción 2: Script de descarga (si tienes acceso a terminal)

```bash
cd client/public/assets/images

# Descargar todas las imágenes
curl -L -o "dreamer-hero-bg.webp" "https://d2xsxph8kpxj0f.cloudfront.net/310519663589279883/DFEqF8ZJpAMU9AbgUrCZG2/dreamer-hero-bg-Ph8LChmw9VgHdQryvMA9J8.webp"

curl -L -o "dreamer-essence.webp" "https://d2xsxph8kpxj0f.cloudfront.net/310519663589279883/DFEqF8ZJpAMU9AbgUrCZG2/dreamer-essence-gCunjygkhPcyMfBDB9p4zy.webp"

curl -L -o "dreamer-collection-resort.webp" "https://d2xsxph8kpxj0f.cloudfront.net/310519663589279883/DFEqF8ZJpAMU9AbgUrCZG2/dreamer-collection-resort-CsVtXaN5NYGmKtoMXHzpwe.webp"

curl -L -o "dreamer-collection-denim.webp" "https://d2xsxph8kpxj0f.cloudfront.net/310519663589279883/DFEqF8ZJpAMU9AbgUrCZG2/dreamer-collection-denim-m8PkPD2rGo3DyXkHzjCJG4.webp"

curl -L -o "dreamer-collection-essentials.webp" "https://d2xsxph8kpxj0f.cloudfront.net/310519663589279883/DFEqF8ZJpAMU9AbgUrCZG2/dreamer-collection-essentials-iQYC2tJwDTEawmfpYesarE.webp"

curl -L -o "DREAMER_LOGO.png" "https://dreamerjeans.co/cdn/shop/files/DREAMER_LOGO.png?v=1729086588&width=230"

curl -L -o "cropped-faviconDre-32x32.png" "https://dreamerjeans.co/cdn/shop/files/cropped-faviconDre-32x32.png?v=1615937710&width=96"
```

## Cómo Actualizar las Imágenes

Si necesitas cambiar alguna imagen:

1. Descarga la nueva imagen
2. Reemplaza el archivo en `/assets/images/`
3. Asegúrate de usar el mismo nombre
4. El código se actualizará automáticamente

**Los nombres están centralizados en:**
- `src/const/assets.ts` - Importa desde aquí en tus componentes

## Ejemplos de uso en componentes

```tsx
import { HERO_BG, COLLECTIONS, LOGO } from "@/const/assets";

export function Home() {
  return (
    <div>
      <img src={LOGO} alt="DREAMER Logo" />
      <img src={HERO_BG} alt="Hero" />
      <img src={COLLECTIONS.RESORT} alt="Resort Collection" />
    </div>
  );
}
```

## Optimización

- ✅ Usa imágenes `.webp` para web (60-70% más pequeñas que PNG)
- ✅ Las imágenes están optimizadas para retina/HiDPI
- ✅ Hero: 1536x864px (16:9)
- ✅ Colecciones: 1056x1408px (3:4)
- ✅ Essence: 1024x1536px (3:4)

## Notas

- El archivo `src/const/assets.ts` es la fuente única de verdad para las URLs
- Para cambiar entre CDN y local, solo modifica las URLs en `assets.ts`
- Las imágenes locales se sirven 2-3x más rápido que CDN (sin latencia de red)

---

**Última actualización:** Abril 2026
**Brand:** DREAMER — Dress Your Dreams
