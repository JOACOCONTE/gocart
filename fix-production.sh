#!/bin/bash

# Script de Reparación Rápida para rubenbadia.com.ar
# Uso: bash fix-production.sh

set -e

echo "🔧 ========================================="
echo "🔧 FIX: Errores MIME Type en Producción"
echo "🔧 ========================================="
echo ""

PROJECT_PATH="/home/tu_usuario/gocart"  # CAMBIAR: reemplaza con tu ruta real

if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Error: Ruta del proyecto no existe"
    echo "   Edita este script y establece PROJECT_PATH correctamente"
    echo "   Línea: PROJECT_PATH=\"/home/tu_usuario/gocart\""
    exit 1
fi

cd "$PROJECT_PATH"

echo "📁 Directorio: $PROJECT_PATH"
echo ""

# 1. Detener proceso
echo "🛑 Deteniendo proceso anterior..."
pm2 stop gocart 2>/dev/null || pkill -f "next start" 2>/dev/null || true
sleep 2

# 2. Limpiar build
echo "🧹 Limpiando build anterior..."
rm -rf .next

# 3. Construir
echo "🔨 Reconstruyendo proyecto..."
npm run build

if [ ! -d ".next" ]; then
    echo "❌ Error: Build falló"
    exit 1
fi

echo "✅ Build completado exitosamente"

# 4. Verificar permisos
echo "🔐 Verificando permisos..."
chmod -R 755 .next
chmod -R 755 public
echo "✅ Permisos configurados"

# 5. Iniciar
echo ""
echo "🚀 Iniciando aplicación..."
echo ""

# Opción A: Sin PM2 (Recomendado para primeras pruebas)
echo "   Opción 1: Iniciar sin PM2 (Presiona Ctrl+C después de ver 'ready on 3000')"
echo "   npm start"
echo ""
echo "   Opción 2: Iniciar con PM2"
echo "   pm2 start ecosystem.config.js --name gocart"
echo ""
echo "¿Cuál prefieres? Presiona 1 o 2:"
read -r choice

if [ "$choice" = "1" ]; then
    echo "▶️  Iniciando con npm start..."
    npm start
elif [ "$choice" = "2" ]; then
    echo "▶️  Iniciando con PM2..."
    pm2 start ecosystem.config.js --name gocart
    pm2 logs gocart
else
    echo "❌ Opción inválida"
    exit 1
fi

echo ""
echo "✅ ¡Listo! Accede a https://rubenbadia.com.ar"
