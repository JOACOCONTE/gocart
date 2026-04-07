#!/bin/bash

# GoCart - Script de Preparación para Deployment
# Este script prepara la aplicación para deployment compilando localmente
# y haciendo commit de los cambios

echo "======================================"
echo "GoCart Pre-Deployment Setup"
echo "======================================"

# 1. Limpiar build anterior
echo "🧹 Limpiando build anterior..."
rm -rf .next
rm -rf out

# 2. Instalar dependencias
echo "📥 Instalando todas las dependencias..."
npm install --legacy-peer-deps

# 3. Compilar aplicación
echo "🏗️ Compilando aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR EN LA COMPILACIÓN"
    echo "Revisa los logs arriba para más detalles"
    exit 1
fi

# 4. Hacer commit de los cambios
echo ""
echo "📦 Haciendo commit de cambios..."
git add -A
git commit -m "build: pre-compile for production deployment" || echo "ℹ️ No hay cambios nuevos para commitear"

# 5. Push a repositorio
echo ""
echo "🚀 Enviando cambios a GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ PREPARACIÓN COMPLETADA"
    echo "======================================"
    echo "La aplicación está lista para deployment"
    echo ""
    echo "En el servidor compartido, ejecuta:"
    echo "  bash deploy.sh"
    echo "======================================"
else
    echo ""
    echo "⚠️ El push falló, pero la compilación fue exitosa"
    echo "Intenta hacer push manualmente:"
    echo "  git push origin main"
fi
