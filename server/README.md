# Menu Web Ar - Backend

## 🚀 ¿Como instalar proyecto?

Para el correcto funcionamiento de la app en primera instancia debes configurar las variables de entorno necesarias para el funcionamiento de la web.

Puedes utilizar el archivo `.env.example` que se encuentra dentro de la carpeta `server/`.

```bash
# ejemplo de configuración del server
PORT=3001

# JWT secret - esta clave se requiere para desplegar, contraseña random de 32 caracteres o más
# Genera una con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

JWT_SECRET=

# credenciales de admin (se usan solo si admin.json no existe aún)

ADMIN_DEFAULT_EMAIL=admin@hublab.com
ADMIN_DEFAULT_PASSWORD=

# Supabase (backend / API) - REQUERIDO para rutas de datos
# Usa la misma URL del proyecto y una service role key SOLO en servidor.
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

### Variables de entorno

| nombre                    | descripción                                                                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                      | Esta variable es **opcional**, sirve para indicarle en que puerto debe iniciarse el servidor, por defecto utiliza `3001`.                                                                                               |
| JWT_SECRET                | Es una variable **REQUERIDA** en producción y nos sirve para firmar y validar los tokens de autenticación.                                                                                                              |
| ADMIN_DEFAULT_EMAIL       | Es una variable **opcional** la cual nos permite en caso de no tener el archivo `admin.json` por primera vez se creara un usuario con el email que le dimos o por defecto con `admin@hublab.com`.                       |
| ADMIN_DEFAULT_PASSWORD    | Es una variable **REQUERIDA** por primera vez que iniciamos el servidor en caso de no tener el archivo `admin.json`                                                                                                     |
| SUPABASE_URL              | Es una variable **REQUERIDA**, la cual podemos obtener desde el dashboard de [supabase](https://supabase.com), podremos copiar el `Project URL`                                                                         |
| SUPABASE_SERVICE_ROLE_KEY | Es una variable **REQUERIDA**, la cual podemos obtener ingresando a [supabase](https://supabase.com) y luego a `Project Settings`, en este apartado debemos buscar en `API_KEYS` y crear y/o obtener una `Secret Keys`. |

> [!warning]
> En ambientes de producción debes configurar sus variables de entorno en la plataforma correspondiente antes de desplegarlo.

### 🧑🏽‍💻 Ambiente de desarrollo

Instalar dependencias

```bash
npm install
```

Iniciar ambiente de desarrollo

```bash
npm run dev
```

Iniciar el proyecto.

```bash
npm run start
```

### 🔵 Iniciar proyecto con Docker

También existe la posibilidad de levantar el proyecto mediante docker con el archivo `Dockerfile`, así podremos crear una imagen de nuestro proyecto el cual nos permitirá desplegarlo en diversas plataformas que nos permita usar docker.

Construir imagen.

```bash
docker build -t menu-backend .
```

Verificar imagen de docker creada.

```bash
docker images
```

Crear contenedor basado en la imagen previamente creada.

```bash
docker run -p 3001:3001 \
 -e PORT=3001 \
 -e ADMIN_DEFAULT_EMAIL=test@test.com \
 -e ADMIN_DEFAULT_PASSWORD=test1234 \
 -e SUPABASE_URL=https://your_project.supabase.co \
 -e SUPABASE_SERVICE_ROLE_KEY=your_secret_key \
 menu-backend
```

## 📁 Estructura actual del servidor (backend)

```
├── public
│   └── assets
│       └── IMG
├── src
│   ├── __tests__
│   │   └── server.test.js
│   ├── data
│   │   ├── admin.json
│   │   ├── menu.json
│   │   └── supabase-schema.sql
│   ├── server.js
│   └── supabaseStore.js
├── .dockerignore
├── .env.example
├── Dockerfile
├── README.md
├── package.json
└── vitest.config.js
```

## 💼 Endpoints de la API

### Public

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/health`     | Health check    |
| GET    | `/api/menu`       | Full menu data  |
| GET    | `/api/categories` | Categories list |
| GET    | `/api/menu-items` | All menu items  |

### Authentication

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/auth/login`  | Login (rate-limited) |
| GET    | `/api/auth/verify` | Verify JWT token     |

### Admin (requires Bearer token)

| Method | Endpoint                    | Description     |
| ------ | --------------------------- | --------------- |
| GET    | `/api/admin/categories`     | List categories |
| POST   | `/api/admin/categories`     | Create category |
| PUT    | `/api/admin/categories/:id` | Update category |
| DELETE | `/api/admin/categories/:id` | Delete category |
| GET    | `/api/admin/items`          | List items      |
| POST   | `/api/admin/items`          | Create item     |
| PUT    | `/api/admin/items/:id`      | Update item     |
| DELETE | `/api/admin/items/:id`      | Delete item     |
| PUT    | `/api/admin/password`       | Change password |
