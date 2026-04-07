#!/bin/bash

# GoCart - Deployment Script para Servidor de Hosting
# Este script usa la carpeta .next PRE-COMPILADA (generada localmente)
# NO intenta compilar en el servidor para evitar problemas de permisos

echo "======================================"
echo "GoCart Deployment Script"
echo "======================================"

# 1. Actualizar repositorio
echo "📦 Actualizando código..."
git pull origin main || echo "⚠️ Git pull falló - verifica permisos"

# 2. Instalar SOLO dependencias de producción
echo "📥 Instalando dependencias (production)..."
npm install --only=production --legacy-peer-deps

# 3. Crear carpeta de datos
echo "📁 Creando carpeta de datos..."
mkdir -p .data
chmod 755 .data

# 4. Verificar que .next existe (carpeta pre-compilada)
if [ ! -d ".next" ]; then
    echo ""
    echo "❌ ERROR: Carpeta .next no encontrada"
    echo "El código debe haber sido compilado localmente antes del deploy"
    echo ""
    echo "Para compilar localmente antes de hacer push:"
    echo "  npm run build"
    echo "  git add .next && git commit -m 'build: pre-compile for production'"
    echo "  git push origin main"
    echo ""
    exit 1
fi

echo ""
echo "✅ DEPLOYMENT EXITOSO"
echo "======================================"
echo "La aplicación está lista para ejecutar:"
echo ""
echo "  npm start"
echo ""
echo "O usa PM2 para ejecutar en background:"
echo "  pm2 start npm --name gocart -- start"
echo "  pm2 save"
echo "  pm2 startup"
echo "======================================"
