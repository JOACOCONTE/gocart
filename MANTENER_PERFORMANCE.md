# 📋 Checklist: Mantener el Rendimiento Optimizado

## Cuando Agregues Nuevos Componentes

### ✅ Componentes de Presentación (ProductCard, etc)

```javascript
// ✅ CORRECTO - Memoized
const MyCard = memo(({ data }) => {
	return <div>{data.name}</div>;
});

// ❌ EVITAR - Sin memo
const MyCard = ({ data }) => {
	return <div>{data.name}</div>;
};
```

### ✅ Funciones en Handlers (onClick, onChange, etc)

```javascript
// ✅ CORRECTO - useCallback
const handleClick = useCallback(() => {
	doSomething();
}, [dependency]);

// ❌ EVITAR - Nueva función cada render
const handleClick = () => {
	doSomething();
};
```

### ✅ Cálculos Costosos

```javascript
// ✅ CORRECTO - useMemo
const total = useMemo(() => {
	return items.reduce((a, b) => a + b.price, 0);
}, [items]);

// ❌ EVITAR - Recalcular siempre
const total = items.reduce((a, b) => a + b.price, 0);
```

### ✅ Datos de API

```javascript
// ✅ CORRECTO - En useEffect o en componente Server
useEffect(() => {
	fetchData().then(setData);
}, []); // Dependencies clara

// ❌ EVITAR - En el body del componente
const data = await fetch(url); // Causa re-renders infinitos
```

---

## Cuando Modifiques Componentes Existentes

### Antes de Cambiar:

- [ ] ¿Es este componente que rara vez cambia (lista de categorías, banners)?
- [ ] ¿Se pasa a muchos hijos (ProductCard x 100)?
- [ ] ¿Tiene cálculos costosos (ratings, sums)?
- Si respondiste SÍ a alguno → Memoizar

### Checklist de Performance:

```javascript
// En un componente que modificas, verifica:

const MyComponent = /* memo */ ({ prop1, prop2 }) => {
	// 1. ¿Hay cálculos que se repiten?
	const expensiveValue = useMemo(() => {
		return prop1.map((x) => x * 2).filter((x) => x > 10);
	}, [prop1]);

	// 2. ¿Hay funciones que se pasan a hijos?
	const handleChange = useCallback(
		(e) => {
			onChange?.(e.target.value);
		},
		[onChange],
	);

	// 3. ¿Hay logs de debug? (Perf killer)
	// console.log('Render', prop1) ❌ REMOVE

	return (
		<div>
			<button onClick={handleChange}>Click</button>
		</div>
	);
};
```

---

## Comandos Útiles para Testing

### Ver tamaño del bundle en desarrollo

```bash
npm run build
# Busca en la salida las rutas más grandes
```

### Ver análisis detallado

```bash
npm install --save-dev @next/bundle-analyzer

# En next.config.mjs:
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  // ... config
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)

# Luego:
ANALYZE=true npm run build
```

### Test en red lenta (simular 3G)

```bash
npm run dev
# DevTools → Network → Throttling → "Slow 3G"
# Luego navega - verás los problemas reales
```

### Profiling con Next.js

```bash
npm run dev -- --turbopack
# Más rápido que webpack, mejor para desarrollo
```

---

## Anti-Patterns (Evitar)

### ❌ Redux en Todo

```javascript
// Evitar guardar data que no necesita ser global
const [user] = useSelector((state) => state.user); // OK para auth
const [cartCount] = useSelector((state) => state.cart.total); // OK
const [productSearch] = useSelector((state) => state.search); // ❌ Usa useState local
```

### ❌ useEffect Inecesarios

```javascript
// ❌ MAL - useEffect sin dependencias claras
useEffect(() => {
	setData(props.data);
}); // Se ejecuta cada render

// ✅ BIEN - Con dependencias
useEffect(() => {
	setData(props.data);
}, [props.data]); // Solo cuando props.data cambia
```

### ❌ Props Inline Objects

```javascript
// ❌ MAL - Nuevo objeto cada render
<Child config={{ color: 'red', size: 10 }} />

// ✅ BIEN - Memoizar config
const config = useMemo(() => ({ color: 'red', size: 10 }), [])
<Child config={config} />
```

### ❌ Props Inline Arrays

```javascript
// ❌ MAL
<List items={[1, 2, 3]} />

// ✅ MEJOR
const items = useMemo(() => [1, 2, 3], [])
<List items={items} />

// ✅ O mejor: No deserializar en cada render
const items = [1, 2, 3] // Si es estática
<List items={items} />
```

---

## Monitoring de Performance en Producción

### Agregar Web Vitals

```bash
npm install web-vitals
```

```javascript
// app/layout.jsx
import { reportWebVitals } from "web-vitals";

export function reportWebVitals(metric) {
	console.log("Web Vital:", metric.name, metric.value);

	// Enviar a servicio de analytics
	if (typeof window !== "undefined") {
		// sendToAnalytics(metric)
	}
}
```

### Métricas a Monitorear

- **LCP (Largest Contentful Paint)** - < 2500ms
- **FID (First Input Delay)** - < 100ms
- **CLS (Cumulative Layout Shift)** - < 0.1

---

## Optimizaciones Futuras (Fase 2)

Cuando ya estés cómodo con lo anterior:

### 1. Image Optimization Avanzada

```javascript
// Agregar placeholder blur
<Image
	src={product.image}
	placeholder="blur"
	blurDataURL="data:image/..." // Genera con plaiceholder.co
/>
```

### 2. Suspense para Streaming

```javascript
<Suspense fallback={<Loading />}>
	<AsyncComponent />
</Suspense>
```

### 3. Service Worker para Cache

```bash
npm install workbox-webpack-plugin
```

### 4. Code Splitting Automático

Next.js ya lo hace, pero versifica que dinámicos funcionen:

```javascript
const HeavyModal = dynamic(() => import("./HeavyModal"), {
	loading: () => <p>Cargando modal...</p>,
	ssr: false, // Si solo se usa en cliente
});
```

### 5. Database Query Optimization

- [ ] Evitar N+1 queries (cargar usuario + todos sus productos = 102 queries)
- [ ] Usar select específico (no SELECT \*)
- [ ] Indexar columnas de búsqueda frecuente

---

## Debugging Rápido

Si algo está lento:

### 1. Chrome DevTools - Performance

```
1. F12 → Performance
2. Record
3. Interactúa (click, scroll)
4. Stop
5. Busca "Long Tasks" (> 50ms = problema)
```

### 2. React DevTools - Profiler

```
1. Extensión instalada
2. El DevTools → Profiler
3. Record
4. Interactúa
5. Busca "⚠️" - No te debería ver sino están memoizados correctamente
```

### 3. Network Tab

```
1. F12 → Network
2. Throttling = "Slow 3G"
3. Intercara
4. Busca requests lentas > 5s (probablemente API)
```

### 4. Console

```javascript
// Agregar logging temporal para debug
console.time("filterProcess");
// ... código
console.timeEnd("filterProcess"); // Muestra ms tomados
```

---

## Resumen: Las 5 Cosas Más Importantes

1. **memo()** - Usa en componentes que se repiten
2. **useCallback()** - Usa en handlers que pasas como props
3. **useMemo()** - Usa en cálculos costosos
4. **Evita Logs en Render** - Usa solo en desarrollo
5. **Test con Throttling** - Siempre simula red lenta

---

## Links Útiles

- [React Docs - memo](https://react.dev/reference/react/memo)
- [React Docs - useCallback](https://react.dev/reference/react/useCallback)
- [React Docs - useMemo](https://react.dev/reference/react/useMemo)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/articles/vitals)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

¿Preguntas o necesitas ayuda? Usa este como referencia cuando agregues nuevas features. 🚀
