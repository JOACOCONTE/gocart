# 🚀 GoCart - Deployment con Pre-compilación

## ⚠️ POR QUÉ CAMBIÓ EL PROCESO

El servidor compartido rechaza la ejecución de binarios en `node_modules/.bin/`, causando:
```
sh: /home/u566734493/domains/rubenbadia.com.ar/.../.bin/next: Permission denied
```

**Solución:** Compilar localmente, incluir `.next` en el repositorio, y solo instalar dependencias en el servidor.

---

## 📋 Nuevo Proceso (DOS PASOS)

### PASO 1: PREPARAR LOCALMENTE (Tu máquina)

Únicamente necesitas ejecutar:

```bash
bash prepare-deployment.sh
```

Esto automáticamente:
1. ✅ Limpia builds anteriores
2. ✅ Instala todas las dependencias
3. ✅ Compila la app (genera `.next/`)
4. ✅ Hace commit de cambios
5. ✅ Push a GitHub

**O si prefieres hacerlo manual:**

```bash
# Limpiar
rm -rf .next out

# Instalar
npm install --legacy-peer-deps

# Compilar
npm run build

# Commit y push
git add .next && git commit -m "build: pre-compile for production"
git push origin main
```

---

### PASO 2: DESPLEGAR EN SERVIDOR (SSH)

```bash
# Conectar al servidor
ssh u566734493@rubenbadia.com.ar

# Navegar a la carpeta
cd domains/rubenbadia.com.ar/public_html/gocart

# Ejecutar deployment
bash deploy.sh

# Iniciar la aplicación
npm start
# O con PM2:
pm2 start npm --name gocart -- start
```

---

## 📊 Qué Cambia en Git

```diff
# Antes:
.gitignore:
  /.next/          ← .next SI era ignorado

# Ahora:
.gitignore:
  # /.next/        ← .next AHORA SÍ se commitea
```

El directorio `.next/` pre-compilado ahora forma parte del repositorio, permitiendo deployment sin compilación en el servidor.

---

## ✅ Checklist de Deployment

**En local (antes de hacer push):**
- [ ] Ejecuté `bash prepare-deployment.sh`
- [ ] O ejecuté `npm run build` y hice commit de `.next/`
- [ ] El commit está en GitHub

**En el servidor:**
- [ ] Conecté por SSH
- [ ] Ejecuté `bash deploy.sh`
- [ ] Verifiqué que la app inicia sin errores
- [ ] PM2 está configurado (opcional)

---

## 🎯 Después del Deployment

### Iniciar la aplicación:

**Opción 1: Directamente**
```bash
npm start
# Se ejecuta en puerto 3000
# En navegador: http://rubenbadia.com.ar
```

**Opción 2: Con PM2 (recomendado)**
```bash
# Primera vez
npm install -g pm2
pm2 start npm --name gocart -- start
pm2 save
pm2 startup

# Próximas veces (después de updates):
pm2 restart gocart
```

### Ver estado:

```bash
# Ver si está corriendo
curl http://localhost:3000

# Con PM2
pm2 status
pm2 logs gocart

# Procesos del sistema
ps aux | grep node
```

---

## 🔧 Solución de Problemas

**Error: "Permission denied"**
```bash
# YA NO DEBERÍA OCURRIR - la app no se compila en el servidor
# Si aún ocurre, verifica que .next/ existe:
ls -la .next/
```

**Error: "Cannot find .next"**
```bash
# Solución: Asegurate de que .next está en GitHub
git log --oneline --name-only | head -20
# Deberías ver cambios en .next/

# Si no está, ejecuta en local:
bash prepare-deployment.sh
```

**Puerto 3000 ocupado:**
```bash
npm start -- --port 3001
# O:
PORT=3001 npm start
```

**PM2 no arranca correctamente:**
```bash
pm2 delete gocart
pm2 start npm --name gocart -- start
pm2 save
```

---

## 📈 Ventajas de Este Método

✅ **Más rápido:** deploy sin compilación (segundos vs minutos)  
✅ **Más confiable:** compilación garantizada localmente  
✅ **Menos problemas:** evita permisos del servidor  
✅ **Pre-testeo:** puedes probar locally antes de deployar  
✅ **Rollback fácil:** basta revertir Git si algo falla  

---

## 📁 Estructura Post-Deployment

```
/home/u566734493/domains/rubenbadia.com.ar/public_html/gocart/
├── .next/                    ← Pre-compilado (desde Git)
├── node_modules/             ← Solo producción
├── .data/                    ← Datos (se crea automáticamente)
│   ├── banners.json
│   └── heroes.json
├── app/
├── components/
├── lib/
├── public/
├── .env                      ← Configuración (NO en Git)
├── package.json
├── next.config.mjs
└── deploy.sh
```

---

## 🚀 Resumen Rápido

**Cada vez que hagas cambios:**

1. **Local:** `bash prepare-deployment.sh`
2. **Servidor:** `bash deploy.sh`
3. **Iniciar:** `npm start` o `pm2 restart gocart`

¡Listo! 🎉
