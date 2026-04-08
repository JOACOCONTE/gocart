# 🚨 SOLUCIÓN: Errores de MIME Type en Servidor (rubenbadia.com.ar)

## El Problema

Los errores que ves indican que **nginx está sirviendo los arquivos con MIME type incorrecto**:

```
❌ Refused to execute script because its MIME type ('text/plain') is not executable
❌ Refused to apply style because its MIME type ('text/plain') is not a supported stylesheet
❌ Failed to load resource: 404
```

Esto ocurre cuando nginx no sabe qué tipo de archivo es (`.js` debe ser `application/javascript`, `.css` debe ser `text/css`).

---

## ✅ SOLUCIÓN 1: Sin Nginx (Más Rápido)

**Esta es la solución MÁS FÁCIL y RECOMENDADA.**

### En tu servidor (SSH):

```bash
cd /home/tu_usuario/gocart

# Detener el proceso actual
pm2 stop gocart
# O si usas: pkill -f "next start"

# Limpiar build anterior
rm -rf .next node_modules package-lock.json

# Reinstalar dependencias
npm install

# Reconstruir
npm run build

# Iniciar sin proxy
npm start

# O si usas PM2:
pm2 start ecosystem.config.js --name gocart
```

**Luego en tu DNS/Dominio:**
- Asegúrate que `rubenbadia.com.ar` apunta DIRECTAMENTE al puerto 3000
- NO pases por nginx, deja que Next.js sirva los archivos directamente

**Ventajas:**
- ✅ Sin complejidad de nginx
- ✅ Funciona instantáneamente
- ✅ Next.js maneja tipos MIME correctamente
- ✅ Mejor rendimiento

---

## ✅ SOLUCIÓN 2: Con Nginx (Si necesitas proxy)

**Si necesitas nginx para otras cosas, usa esta configuración:**

### 1. Edita `/etc/nginx/mimes.types` (O crea uno nuevo)

```bash
sudo nano /etc/nginx/mime.types
```

Asegúrate que tenga:
```
application/javascript          js;
application/javascript          mjs;
text/css                         css;
image/webp                       webp;
application/wasm                 wasm;
```

### 2. Edita `/etc/nginx/sites-available/default` (o tu virtual host)

```bash
sudo nano /etc/nginx/sites-available/default
```

Reemplaza TODO con esto:

```nginx
upstream nextjs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    
    server_name rubenbadia.com.ar www.rubenbadia.com.ar;
    
    # Logs
    access_log /var/log/nginx/gocart-access.log;
    error_log /var/log/nginx/gocart-error.log;
    
    # Configuración de caché para archivos estáticos
    location ~* ^/_next/static/ {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 200 30d;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Configuración para archivos públicos
    location ~* \.(js|css|gif|jpe?g|png|svg|woff|woff2|ttf|eot|ico)$ {
        proxy_pass http://nextjs_upstream;
        expires 30d;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
    }
    
    # API routes - NO cache
    location /api/ {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Sin caché para APIs
        proxy_no_cache 1;
        proxy_cache_bypass 1;
    }
    
    # Todos los otros requests
    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Prueba la configuración

```bash
sudo nginx -t
```

Debería mostrar:
```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 4. Reinicia nginx

```bash
sudo systemctl restart nginx
```

### 5. Verifica que Next.js está corriendo

```bash
pm2 list
# o
ps aux | grep "next start"
```

---

## 🔍 Verificar que Funciona

### Desde tu PC, abre DevTools:

```javascript
// En la consola del navegador:
fetch('/_next/static/chunks/main.js')
  .then(r => {
    console.log('Status:', r.status)
    console.log('Content-Type:', r.headers.get('content-type'))
  })
```

Debería mostrar:
```
Status: 200
Content-Type: application/javascript  ✅ (NO 'text/plain')
```

### O desde SSH:

```bash
# Verifica que Next.js esté corriendo
curl -I http://localhost:3000/

# Verifica tipos MIME
curl -I https://rubenbadia.com.ar/_next/static/chunks/main.js | grep Content-Type
# Debe mostrar: Content-Type: application/javascript
```

---

## 🆘 Si aún hay errores

### Checklist:

- [ ] ¿Ejecutaste `npm run build` después de cambios?
- [ ] ¿Está Next.js corriendo en puerto 3000?
- [ ] ¿Nginx apunta a `localhost:3000`?
- [ ] ¿Limpiaste caché del navegador (Ctrl+Shift+Del)?
- [ ] ¿El dominio apunta al servidor correcto?
- [ ] ¿`.next/static/` tiene permisos 755?

### Permisos:

```bash
chmod -R 755 .next
chmod -R 755 public
ll .next/static/ | head
```

---

## 📋 Resumen Rápido

| Paso | Comando |
|------|---------|
| 1. SSH al servidor | `ssh usuario@rubenbadia.com.ar` |
| 2. Navega al proyecto | `cd /home/tu_usuario/gocart` |
| 3. Detén proceso | `pm2 stop gocart` |
| 4. Limpia | `rm -rf .next node_modules` |
| 5. Instala | `npm install` |
| 6. Construye | `npm run build` |
| 7. Inicia | `npm start` (o `pm2 start ecosystem.config.js`) |
| 8. Verifica | `pm2 list` |

**LISTO ✅**

---

## 🎯 Resultado Esperado

✅ Sin errores de MIME type  
✅ CSS carga correctamente  
✅ JavaScript ejecuta sin problemas  
✅ Página se ve perfecta en todo dispositivo  

---

¿Qué opción prefieres: **Sin nginx (más simple)** o **Con nginx (más configurable)**?
