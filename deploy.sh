#!/bin/bash

# GoCart - Deployment Script para Servidor de Hosting
# Este script ejecuta todos los pasos necesarios para deployar

echo "======================================"
echo "GoCart Deployment Script"
echo "======================================"

# 1. Actualizar repositorio
echo "📦 Actualizando código..."
git pull origin main || echo "⚠️ Git pull falló - verifica permisos"

# 2. Instalar dependencias
echo "📥 Instalando dependencias..."
npm install --legacy-peer-deps

# 3. Arreglar permisos CRÍTICO
echo "🔧 Fijando permisos..."
chmod +x node_modules/.bin/* 2>/dev/null || true
chmod 755 node_modules/.bin/ 2>/dev/null || true

# 4. Crear carpeta de datos
echo "📁 Creando carpeta de datos..."
mkdir -p .data
chmod 755 .data

# 5. Construir aplicación
echo "🏗️ Compilando aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOYMENT EXITOSO"
    echo "======================================"
    echo "La aplicación está lista para ejecutar:"
    echo ""
    echo "  npm start"
    echo ""
    echo "O usa PM2 para ejecutar en background:"
    echo "  pm2 start npm --name gocart -- start"
    echo "======================================"
else
    echo ""
    echo "❌ ERROR EN LA COMPILACIÓN"
    echo "Revisa los logs arriba para más detalles"
    exit 1
fi
