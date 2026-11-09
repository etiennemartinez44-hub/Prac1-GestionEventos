# Práctica 1: Gestión de eventos

API REST desarrollada con Node.js, Express y Mongoose para gestionar recintos, eventos y sus entradas. Desplegada en Render y conectada a MongoDB Atlas.

## Enlaces de entrega

- [Repositorio en GitHub](https://github.com/etiennemartinez44-hub/Prac1-GestionEventos)
- [Aplicación en Render](https://prac1-gestioneventos.onrender.com)

## Ejecución local

1. Instalar las dependencias:

   ```sh
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto con la conexión propia a MongoDB:

   ```dotenv
   URL_BD=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/eventos
   PORT=3001
   ```

3. Arrancar el servidor:

   ```sh
   npm start
   ```

## Datos de prueba

Con la conexión configurada, ejecutar:

```sh
node db_seed.js
```

Este comando borra los eventos y recintos existentes e inserta tres recintos y tres eventos de ejemplo.

## Endpoints

| Método | Ruta |
|---|---|
| GET | `/recintos` |
| GET | `/recintos/:id` |
| GET | `/recintos/localidad/:nombre` |
| POST | `/recintos` |
| DELETE | `/recintos/:id` |
| GET | `/eventos` |
| GET | `/eventos/:id` |
| GET | `/eventos/localidad/:nombre` |
| POST | `/eventos` |
| PUT | `/eventos/:id` |
| DELETE | `/eventos/:id` |
| GET | `/eventos/entradas/:idEvento/:tipoEntrada` |
| PUT | `/eventos/entradas/:idEvento/:tipoEntrada/:cantidad` |

Las peticiones con cuerpo JSON deben usar `Content-Type: application/json`.
La ruta principal `/` no tiene un endpoint definido.

El paquete de entrega excluye `node_modules`, `.git` y `.env`.
