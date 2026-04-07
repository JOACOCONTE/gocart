# Guía de Deployment - GoCart

## 📋 Requisitos Previos

- Node.js 18+
- npm 9+
- Acceso SSH al servidor de hosting

## 🚀 Pasos de Deployment

### 1. Clonar el repositorio

```bash
cd /home/tu_usuario/domains/tu_dominio.com/public_html
git clone https://github.com/tu_usuario/gocart.git .
```

### 2. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Arreglar permisos (IMPORTANTE)

```bash
# Dar permisos de ejecución a los binarios
chmod +x node_modules/.bin/*

# Crear carpeta para datos del servidor
mkdir -p .data
chmod 755 .data
```

### 4. Compilar la aplicación

```bash
npm run build
```

### 5. Iniciar el servidor

**Opción A: Usando npm start**

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

**Opción B: Usando PM2 (recomendado para producción)**

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Crear archivo ecosystem.config.js
pm2 start npm --name "gocart" -- start

# Guardar configuración
pm2 save

# Auto-iniciar cuando el servidor reinicia
pm2 startup
```

### 6. (Opcional) Configurar reverse proxy con Nginx

```nginx
server {
    listen 80;
    server_name tu_dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Estructura de Datos

Los datos del admin se almacenan localmente en:

```
.data/
├── banners.json
└── heroes.json
```

Estos archivos se crean automáticamente cuando el admin hace cambios.

## ⚠️ Troubleshooting

### Error: Permission denied

```bash
chmod +x /home/tu_usuario/.../node_modules/.bin/*
```

### Error: Port 3000 already in use

```bash
# Cambiar puerto
PORT=8000 npm start
```

### Error: Cannot find module

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

## 🔄 Actualizaciones del Código

1. Pull de cambios:

```bash
git pull origin main
```

2. Instalar nuevas dependencias (si hay):

```bash
npm install
```

3. Reconstruir:

```bash
npm run build
```

4. Reiniciar la aplicación:

```bash
# Si usas npm
npm start

# Si usas PM2
pm2 restart gocart
```

## 📱 Notas Importantes

- La aplicación ahora funciona **SIN necesidad de PostgreSQL**
- Los datos se almacenan en archivos JSON en la carpeta `.data`
- Los cambios del admin panel se guardan automáticamente
- Todos los dispositivos verán los cambios en tiempo real

## 🔗 Variables de Entorno

Crear archivo `.env` en el root:

```env
NEXT_PUBLIC_CURRENCY_SYMBOL=$
NEXT_PUBLIC_API_URL=https://tu_dominio.com
NODE_ENV=production
```

## 📞 Soporte

Si tienes problemas, verifica:

1. Node.js version: `node --version`
2. npm version: `npm --version`
3. Permisos: `ls -la node_modules/.bin/`
4. Logs: `cat .next/server.log`
