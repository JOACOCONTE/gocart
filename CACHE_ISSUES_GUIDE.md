# 🔧 Guía de Solución: Error 404 en Recursos Estáticos

## Problema Reportado

- ❌ Styling roto al cargar la página en PC
- ❌ Errores de 404 al cargar recursos
- ❌ ChunkLoadError al cargar chunks de JavaScript
- ✅ Se ve normal cuando se abre en incógnito o limpia caché

## Causa Raíz

El problema es típicamente causado por:

1. **Caché del navegador** - Archivos CSS/JS antiguos guardados en caché
2. **Configuración de Next.js** - Parámetros desactualizados
3. **Archivos .next desactualizados** - Build previos corrupto

## ✅ Solución Paso a Paso

### 1️⃣ OPCIÓN RÁPIDA (Limpiar Caché del Navegador)

**En Chrome/Edge/Brave:**

```
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

- Selecciona "Todos los tiempos"
- Marca: Cookies, Archivos en caché, Imágenes en caché
- Haz clic en "Borrar datos"

Luego recarga: `Ctrl + Shift + R` (fuerza recarga sin caché)

### 2️⃣ OPCIÓN RECOMENDADA (Reconstruir en Desarrollo)

**En Windows (cmd o PowerShell):**

```bash
cd c:\Users\Usuario\Documents\GitHub\gocart
rm -r .next
npm run dev
```

**En Mac/Linux:**

```bash
cd ~/Documents/GitHub/gocart
rm -rf .next
npm run dev
```

### 3️⃣ OPCIÓN COMPLETA (Limpieza Total de Caché)

Ejecuta el script de limpieza:

**En Windows (Git Bash o WSL):**

```bash
bash clean-and-rebuild.sh
```

**En Mac/Linux:**

```bash
bash clean-and-rebuild.sh
chmod +x clean-and-rebuild.sh
```

### 4️⃣ OPCIÓN NUCLEAR (Última Instancia)

```bash
# Windows (PowerShell como Admin)
rm -r node_modules
rm package-lock.json
rm -r .next
npm install
npm run build
npm run start
```

## 🌐 Si el Problema Persiste en Producción

Si los errores continúan después de desplegar en `rubenbadia.com.ar`:

1. **Verifica que los archivos estáticos se sirvan correctamente:**

   ```bash
   # Los archivos deben estar en: .next/static/
   ls -la .next/static/
   ```

2. **Asegúrate que el servidor web (nginx/apache) sirva los chunks correctamente:**
   - Los archivos `.js` deben tener header `Content-Type: application/javascript`
   - Los archivos `.css` deben tener header `Content-Type: text/css`

3. **Verifica los permisos:**
   ```bash
   chmod -R 755 .next
   chmod -R 755 public
   ```

## 📋 Cambios Realizados en Esta Sesión

- ✅ Actualizado `next.config.mjs` con configuración mejorada
- ✅ Removido `webpackDevMiddleware` (deprecated)
- ✅ Agregado `swcMinify` para mejor compilación
- ✅ Mejorada caché headers para producción
- ✅ Añadidos headers de seguridad

## 🚨 Indicadores de Éxito

✅ Los estilos cargan correctamente sin "flash" de contenido sin estilo  
✅ No hay errores de 404 en la consola del navegador  
✅ No hay errores de ChunkLoadError  
✅ Las fuentes se cargan correctamente  
✅ Los colores y layouts son consistentes entre recargas

## 💡 Prevención Futura

- Realiza Clean Build después de cambios en `next.config.mjs`: `npm run build`
- Usa modo incógnito para development a menudo para evitar problemas de caché
- En producción, usa staging env para validar antes de desplegar
- Configura headers HTTP apropiados en el servidor web

---

Si los problemas persisten después de seguir estos pasos, verifica los logs del servidor en `rubenbadia.com.ar`.
