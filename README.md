# Proyecto Empresas - React + TypeScript + Node/Express

Estructura: cliente (Vite + React + TypeScript) y servidor (Express + TypeScript).

## Requisitos
- Node.js 18+ y npm
- En la terminal, desde las carpetas 'client' y 'server':
  - `npm install`
- Variables de entorno en `server/.env` (puedes copiar `server/.env.example`)

## Ejecutar en desarrollo
1. Abrir terminal en `/server`:
   - `npm install`
   - `npm run dev`
2. Abrir otra terminal en `/client`:
   - `npm install`
   - `npm run dev`
3. Cliente corre en http://localhost:5173 y servidor en http://localhost:4000

## Notas
- Login simple con JWT. Datos sensibles de 'companies' se cifran con AES-256-GCM en el servidor.
- Revisa `server/.env.example` para la clave `JWT_SECRET` y `CRYPTO_KEY` (256-bit hex).
- Este es un scaffold minimal funcional para desarrollo local.
- Cambiar las visibilidades de los puertos en publicos

##GitHUB
https://github.com/NicolasForeroAlv/hackaton2.git
