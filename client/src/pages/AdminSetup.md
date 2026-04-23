# Admin Panel Setup Guide

## Integración del Panel de Administración

### 1. Agregar Ruta en App.tsx

Abre `client/src/App.tsx` y agrega:

```tsx
import AdminPanel from "@/pages/Admin";

// En tu componente de routing:
<Route path="/admin" component={AdminPanel} />
```

### 2. Proteger la Ruta (Opcional pero Recomendado)

Crea un componente ProtectedRoute:

```tsx
// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { useNavigate } from "wouter";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [, navigate] = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}
```

Usa en App.tsx:

```tsx
<Route path="/admin">
  {() => (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  )}
</Route>
```

### 3. Implementar Endpoint en el Backend

En `server/index.ts` o tu archivo de servidor:

```typescript
app.get("/api/registrations", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  // Verificar token
  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Obtener registros de tu base de datos
  const registrations = getRegistrationsFromDatabase();
  
  res.json(registrations);
});
```

### 4. Estructura esperada de Datos

El endpoint debe retornar un array de objetos:

```typescript
interface Registration {
  id: string;              // ID único
  company: string;         // Nombre empresa
  email: string;          // Email
  phone: string;          // Teléfono
  address: string;        // Dirección
  city: string;           // Ciudad
  country: string;        // País
  registrationType: string; // "boutique" | "distributor" | "other"
  timestamp: string;       // ISO date string (2026-04-23T...)
  notes?: string;         // Notas opcionales
}
```

### 5. URLs de Acceso

- Admin Dashboard: `http://localhost:3000/admin`
- En producción: `https://tudominio.com/admin`

### 6. Características del Panel

#### Búsqueda en Tiempo Real
- Busca por empresa, email o ciudad
- Actualiza mientras escribes

#### Filtros
- Todo (All Types)
- Solo Boutiques
- Solo Distribuidores
- Otros

#### Estadísticas
- Total de registros
- Registros este mes
- Cantidad de boutiques
- Cantidad de distribuidores

#### Exportar a CSV
- Botón para descargar en formato CSV
- Incluye datos filtrados
- Útil para análisis en Excel

### 7. Personalización

#### Cambiar colores
En `Admin.tsx`, busca `"var(--dreamer-blue)"` y reemplaza con otro color.

#### Agregar más columnas
1. Actualiza la interfaz `Registration`
2. Agrega header en la tabla
3. Agrega datos en las filas

#### Cambiar altura de tabla
Busca el div con `overflowX: "auto"` y agrega:
```tsx
maxHeight: "600px", // Altura máxima
```

### 8. Base de Datos

Ejemplo de tabla SQL:

```sql
CREATE TABLE registrations (
  id VARCHAR(36) PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  registration_type VARCHAR(50),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);

CREATE INDEX idx_company ON registrations(company);
CREATE INDEX idx_email ON registrations(email);
CREATE INDEX idx_timestamp ON registrations(timestamp);
```

Ejemplo de modelo en TypeScript:

```typescript
interface Registration {
  id: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  registrationType: "boutique" | "distributor" | "other";
  timestamp: Date;
  notes?: string;
}
```

### 9. Variables de Entorno

Agrega a tu `.env`:

```
ADMIN_API_URL=http://localhost:3000
ADMIN_TOKEN_SECRET=tu_secreto_aqui
```

### 10. Testing

Para probar sin backend:

```typescript
// En Admin.tsx, reemplaza fetchRegistrations con:
const fetchRegistrations = async () => {
  const mockData = [
    {
      id: "1",
      company: "Fashion Boutique Miami",
      email: "info@fashionboutique.com",
      phone: "+1 305 555 0123",
      address: "123 Collins Ave",
      city: "Miami",
      country: "USA",
      registrationType: "boutique",
      timestamp: new Date().toISOString(),
    },
    // ... más datos de prueba
  ];
  setRegistrations(mockData);
  setLoading(false);
};
```

---

## Próximos Pasos

1. ✅ Copiar `Admin.tsx` a tu proyecto
2. ✅ Agregar ruta en `App.tsx`
3. ✅ Implementar endpoint `/api/registrations`
4. ✅ Conectar a base de datos
5. ✅ Agregar autenticación
6. ✅ Personalizar colores/datos

¡Listo! Tu panel de admin está operativo.
