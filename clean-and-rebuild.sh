#!/bin/bash

echo "🧹 Limpiando archivos de construcción..."

# Limpiar archivos de Next.js
rm -rf .next
echo "✓ Limpiado .next"

# Limpiar node_modules (opcional, pero recomendado)
echo "¿Deseas limpiar node_modules también? (s/n)"
read -r clean_node_modules

if [ "$clean_node_modules" = "s" ] || [ "$clean_node_modules" = "S" ]; then
    rm -rf node_modules
    rm -f package-lock.json
    echo "✓ Limpiado node_modules y package-lock.json"
    echo "📦 Instalando dependencias..."
    npm install
fi

# Reconstruir
echo "🔨 Reconstruyendo proyecto..."
npm run build

echo "✅ ¡Proyecto limpiado y reconstruido exitosamente!"
echo "🚀 Para iniciar en desarrollo: npm run dev"
echo "🚀 Para iniciar en producción: npm run start"
