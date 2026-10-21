# Libre para React Native

Migración móvil de [PE-Lab3](https://github.com/iccoscco/PE-Lab3), una aplicación para descubrir libros. Se desarrolló con React Native, Expo SDK 58, Expo Router y TypeScript para el Laboratorio 04 de Plataformas Emergentes.

## Pantallas

1. Inicio con libros recomendados y búsqueda.
2. Explorar con consulta a Open Library.
3. Favoritos guardados en el dispositivo.
4. Colecciones con acceso a favoritos y búsquedas temáticas.
5. Acerca del proyecto.
6. Ficha de detalle de cada libro.

## Ejecutar

Requiere Node.js. En esta carpeta:

```powershell
npm install
npm start
```

Expo mostrará cómo abrir Android, iOS o web. También puede iniciar web con `npm run web`. La búsqueda y las portadas requieren conexión a internet; los favoritos se guardan localmente con AsyncStorage.

## Estructura

- `src/app/`: rutas de Expo Router.
- `src/components/`: tarjetas de libros y estructura de pantalla.
- `src/context/LibraryContext.tsx`: estado, búsqueda y favoritos.
- `src/data/books.ts`: libros recomendados y normalización de datos.
- `src/theme.ts`: colores de la interfaz.
- `docs/capturas/`: capturas de las seis pantallas.

## Verificación

Se ejecutaron `npx tsc --noEmit`, `npx expo lint` y `npx expo export --platform web`. En navegador se comprobaron las seis pantallas, una búsqueda con doce resultados y la persistencia de un favorito después de recargar.

Los identificadores de obra y portada de la lista inicial se corrigieron consultando Open Library, pues varios valores del proyecto web apuntaban a otros títulos.
