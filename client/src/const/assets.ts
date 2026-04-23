/**
 * DREAMER Assets Configuration
 *
 * Este archivo centraliza todas las referencias de imágenes y assets.
 * Para usar imágenes locales, reemplaza las URLs con rutas relativas.
 *
 * Ejemplo:
 *   FROM: "https://example.com/image.webp"
 *   TO:   "/assets/images/image.webp"
 */

// =============================================================================
// LOGO Y FAVICON
// =============================================================================
export const LOGO = "/assets/images/DREAMER_LOGO.png";
export const FAVICON = "/assets/images/cropped-faviconDre-32x32.png";

// =============================================================================
// HERO BANNERS
// =============================================================================
export const HERO_BG = "/assets/images/dreamer-hero-bg.webp";

// =============================================================================
// COLECCIONES
// =============================================================================
export const COLLECTIONS = {
  RESORT: "/assets/images/dreamer-collection-resort.webp",
  DENIM: "/assets/images/dreamer-collection-denim.webp",
  ESSENTIALS: "/assets/images/dreamer-collection-essentials.webp",
};

// =============================================================================
// ESSENCE / ABOUT
// =============================================================================
export const ESSENCE = "/assets/images/dreamer-essence.webp";

// =============================================================================
// Colores del Brand (desde CSS)
// =============================================================================
export const COLORS = {
  NAVY: "#071729",
  BLUE: "#A1C1D8",
  GOLD: "#C9A96E",
  CREAM: "#F5F0E8",
  CHARCOAL: "#1a1a2e",
  WHITE: "#FFFFFF",
} as const;

// =============================================================================
// Tipografías
// =============================================================================
export const FONTS = {
  HEADING: "'Playfair Display', serif",
  BODY: "'Montserrat', sans-serif",
} as const;
