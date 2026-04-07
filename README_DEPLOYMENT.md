# 🚀 DEPLOYMENT RÁPIDO - GoCart

## ⚡ Comandos para tu Servidor de Hosting (rubenbadia.com.ar)

Ejecuta estos comandos **EN TU SERVIDOR** (NO en local):

```bash
# 1. Entrar al directorio del proyecto
cd /home/u566734493/domains/rubenbadia.com.ar/public_html/.builds/source/gocart

# 2. Clonar o actualizar código
git pull origin main

# 3. Instalar dependencias
npm install --legacy-peer-deps

# 4. IMPORTANTE: Arreglar permisos (THIS IS CRITICAL!)
chmod +x node_modules/.bin/*

# 5. Crear carpeta de datos
mkdir -p .data
chmod 755 .data

# 6. Compilar
npm run build

# 7. Iniciar servidor
npm start

# O better: Usar PM2 para background
npm install -g pm2
pm2 start npm --name "gocart" -- start
pm2 save
```

---

## ✅ Qué Cambió en el Código

### ✨ Se implementó almacenamiento en ARCHIVO (Sin Prisma/BD)

```
.data/
├── banners.json      ← Se crea automáticamente
└── heroes.json       ← Se crea automáticamente
```

### 🔌 APIs Funcionales Sin Base de Datos

- `GET /api/banner` → Lee desde `.data/banners.json`
- `POST /api/banner` → Guarda en `.data/banners.json`
- `PUT /api/banner/[id]` → Actualiza en `.data/banners.json`
- `DELETE /api/banner/[id]` → Elimina de `.data/banners.json`

_Lo mismo para `/api/hero`_

### 📦 Build Configurado

- Output: `standalone` (lista para servidor)
- Sin dependencias de PostgreSQL
- Totalmente funcional en hosting compartido

---

## 🐛 Si Tienes Errores

### Error: "Permission denied"

```bash
chmod +x /home/u566734493/domains/rubenbadia.com.ar/public_html/.builds/source/gocart/node_modules/.bin/*
```

### Error: "Port 3000 already in use"

```bash
PORT=8080 npm start
```

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

---

## 📊 Monitoreo

### Ver logs

```bash
# Si usas npm start
# (stdout en la terminal)

# Si usas PM2
pm2 log gocart
```

### Ver procesos corriendo

```bash
pm2 list
# o
ps aux | grep node
```

### Detener servidor

```bash
# Si usas PM2
pm2 stop gocart

# Si usas npm (Ctrl+C en terminal)
```

---

## 🎯 Testing Post-Deployment

1. **Abre el navegador:**

   ```
   https://tu_dominio.com/admin
   ```

2. **Inicia sesión:**
   - Usuario: `Orfebre`
   - Contraseña: `arteenjoyas26`

3. **Va a Banner:**
   - Edita algo (Ej: cambía el título)
   - Click "Guardar Cambios"
   - ✅ Debería guardarse en `.data/banners.json`

4. **Para verificar:**
   ```bash
   cat .data/banners.json
   ```

---

## 📋 Resumen de Cambios Hechos

- ✅ APIs sin Prisma/PostgreSQL
- ✅ Almacenamiento en archivos JSON
- ✅ next.config.mjs optimizado para servidor
- ✅ Script deploy.sh automatizado
- ✅ Documentación completa en DEPLOYMENT.md
- ✅ Todos los cambios en Git

---

## 💡 Próximos Pasos (Opcionales)

Si en el futuro quieres usar PostgreSQL:

1. Configura la BD
2. Descomenta imports de Prisma en las APIs
3. Ejecuta: `npx prisma migrate dev`
4. Código volverá a usar BD

Pero **AHORA** funciona perfectamente sin BD 🚀

---

**¿Necesitas ayuda?** Revisa DEPLOYMENT.md para más detalles.
