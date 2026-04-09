# Todo List 2

Proyecto full stack de lista de tareas con frontend en React, API en Node/Express y persistencia en MongoDB.

## Indice

- [Contexto](#contexto)
- [Arquitectura](#arquitectura)
- [Servicios](#servicios)
- [Flujo de datos](#flujo-de-datos)
- [Estructura de carpetas principal](#estructura-de-carpetas-principal)
- [Variables de entorno](#variables-de-entorno)
- [Modo de ejecucion: development vs production](#modo-de-ejecucion-development-vs-production)
- [Como ejecutarlo](#como-ejecutarlo)
- [1) Requisitos](#1-requisitos)
- [2) Preparar entorno](#2-preparar-entorno)
- [3) Build + arranque](#3-build--arranque)
- [4) Verificar estado](#4-verificar-estado)
- [5) Apagar entorno](#5-apagar-entorno)
- [Endpoints utiles](#endpoints-utiles)
- [Troubleshooting](#troubleshooting)
- [Seguridad y mantenimiento](#seguridad-y-mantenimiento)

## Contexto

Este repositorio forma parte de un trabajo academico y muestra una arquitectura distribuida en multiples servicios:

- Frontend React para gestion de tareas.
- Backend Express para CRUD de todos.
- Servicio DB intermedio para exponer logica de conexion.
- Servicio de configuracion central para resolver puertos, URLs y parametros.
- MongoDB como base de datos.

El objetivo principal es separar configuracion de codigo y poder ejecutar todo el entorno con Docker Compose.

## Arquitectura

### Servicios

- `front`: cliente React (puerto host `PORT_FRONT`, por defecto `3013`).
- `back`: API REST de todos (puerto host `PORT_SERVER`, por defecto `3010`).
- `db`: servicio auxiliar de conexion (puerto host `PORT_DB`, por defecto `3012`).
- `config`: servicio central de configuracion (puerto host `PORT_CONFIG`, por defecto `3011`).
- `mongo`: base de datos MongoDB (puerto host `MONGO_PORT`, por defecto `27017`).

### Flujo de datos

1. El frontend consulta `config` para conocer URLs activas.
2. El frontend consume `back` para leer/escribir tareas.
3. El backend consulta `db` para obtener la funcion de conexion.
4. El backend usa `DB_URL` para conectarse a MongoDB.

### Estructura de carpetas principal

- `front/`: aplicacion React.
- `back/`: API y modelo de tareas.
- `db/`: modulo de conexion y servidor auxiliar.
- `config/`: servidor de configuracion.
- `docker-compose.yml`: orquestacion de todos los servicios.
- `docker.env`: variables privadas/locales de ejecucion.
- `docker.env.example`: plantilla limpia para compartir.

## Variables de entorno

Toda la configuracion operativa esta centralizada en `docker.env`.

Variables relevantes:

- `APP_MODE`: modo global de ejecucion (`development` o `production`).
- `NODE_BASE_IMAGE`: imagen base Linux para construir servicios Node.
- `MONGO_IMAGE`, `CONFIG_IMAGE`, `DB_IMAGE`, `BACK_IMAGE`, `FRONT_IMAGE`: nombres/tags de imagen.
- `PORT_CONFIG`, `PORT_SERVER`, `PORT_DB`, `PORT_FRONT`, `MONGO_PORT`: puertos expuestos.
- `DB_URL`: cadena de conexion Mongo.
- `SERVER_CONFIG_URL_DOCKER`: URL interna del servicio de config.
- `REACT_APP_SERVER_CONFIG_URL`: URL que usa el navegador para llegar a config.

## Modo de ejecucion: development vs production

El parametro principal es `APP_MODE`.

- `APP_MODE=development`
	- Frontend corre en modo dev (`npm run dev`).
	- Hot reload y herramientas de desarrollo.

- `APP_MODE=production`
	- Frontend compila (`npm run build`) y sirve estatico.
	- Servicios Node reciben `NODE_ENV=production`.

Nota: para backend y servicios Node, el comando de arranque es el mismo, pero cambia el entorno (`NODE_ENV`).

## Como ejecutarlo

### 1) Requisitos

- Docker Desktop o Docker Engine con Compose v2.

### 2) Preparar entorno

Crear archivo local de entorno desde plantilla:

```powershell
Copy-Item .\docker.env.example .\docker.env
```

Editar valores segun necesidad:

- Puertos.
- Tags de imagen.
- `DB_URL` (local o remota).
- `APP_MODE` (`development`/`production`).

### 3) Build + arranque

```powershell
docker compose --env-file docker.env up -d --build
```

### 4) Verificar estado

```powershell
docker compose --env-file docker.env ps
docker compose --env-file docker.env logs --tail 120
```

### 5) Apagar entorno

```powershell
docker compose --env-file docker.env down
```

## Endpoints utiles

- Config: `http://localhost:3011/config`
- API todos: `http://localhost:3010/todos`
- Frontend: `http://localhost:3013`

## Troubleshooting

- Si falla un build por cache:

```powershell
docker compose --env-file docker.env build --no-cache
docker compose --env-file docker.env up -d
```

- Si hay puertos ocupados, cambia `PORT_*` en `docker.env`.

- Si `front` no inicia en `production`, revisar logs de build:

```powershell
docker compose --env-file docker.env logs --tail 200 front
```

## Seguridad y mantenimiento

- No subir secretos reales a control de versiones.
- Compartir siempre `docker.env.example` en lugar de `docker.env`.
- Rotar credenciales si se filtra una URI de base de datos.
