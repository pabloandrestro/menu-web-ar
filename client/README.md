# Menu Web Ar - Frontend

## 🚀 ¿Como instalar proyecto?

Para el correcto funcionamiento de la app en primera instancia debes configurar las variables de entorno necesarias para el funcionamiento de la web.

Puedes utilizar el archivo `.env.example` que se encuentra dentro de la carpeta `client/`.

```bash
# Necesario para desplegar servidor http del cliente por separado (ej: Vercel)
VITE_API_URL=http://localhost:3001/api # opcional en desarrollo

# Cloudinary (frontend upload)
VITE_CLOUDINARY_CLOUD_NAME=""
VITE_CLOUDINARY_UPLOAD_PRESET=""
VITE_CLOUDINARY_UPLOAD_FOLDER=""
```

### Variables de entorno

|nombre|descripción|
|------|-----------|
|VITE_API_URL|URL correspondiente a tu backend desplegado con dominio o ip, ej: `https://tudominio.com/api` o `http://192.168.1.10:3000/api`|
|VITE_CLOUDINARY_CLOUD_NAME|Para obtener este valor debes iniciar sesión en [Cloudinary](https://cloudinary.com) y acceder a las configuraciones, ingresar al apartado llamado `Product Environments` y obtener el valor que tengas en `Display Name`.|
|VITE_CLOUDINARY_UPLOAD_PRESET|Para obtener este valor debes iniciar sesión en [Cloudinary](https://cloudinary.com) y acceder a las configuraciones, ingresar al apartado llamado `Upload` y crear un nuevo preset, en `Signed mode` usar `Unsigned` y finalmente copiar el `Name`.|
|VITE_CLOUDINARY_UPLOAD_FOLDER|Corresponde a la carpeta que quieras asignar para guardar las imágenes y modelos 3d en [Cloudinary](https://cloudinary.com), para ello puedes ingresar a `Assets` > `Folders` y crear una nueva carpeta o usar una ya existente, con esto **usaremos el nombre de esa carpeta**.|

> [!note]
> Recuerda cambiar la variable de entorno `VITE_API_URL` por la **URL** correspondiente donde tengas tu backend desplegado.

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

Crear build del proyecto
```bash
npm run build
```

Iniciar build del proyecto.

```bash
npm run start # Utiliza dependencia serve.
# o
npm run preview # Utiliza dependencia vite.
```

### 🔵 Iniciar proyecto con Docker

También existe la posibilidad de levantar el proyecto mediante docker con el archivo `Dockerfile`, así podremos crear una imagen de nuestro proyecto el cual nos permitirá desplegarlo en diversas plataformas que nos permita usar docker.

Construir imagen.

```bash
docker build -t menu-client \
  --build-arg VITE_API_URL=http://localhost:3000/api \
  --build-arg VITE_CLOUDINARY_CLOUD_NAME="" \
  --build-arg VITE_CLOUDINARY_UPLOAD_PRESET="" \
  --build-arg VITE_CLOUDINARY_UPLOAD_FOLDER="" \
  .
```

Verificar imagen de docker creada.

```bash
docker images
```

Crear contenedor basado en la imagen previamente creada.

```bash
docker run -p 3000:3000 menu-client
```


## 📁 Estructura actual del Cliente (frontend)

```
├── public
│   └── assets
│       ├── IMG
│       └── references
├── src
│   ├── admin
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminUploader.jsx
│   │   ├── admin.module.css
│   │   └── api.jsx
│   ├── components
│   │   ├── CategoryTabs.jsx
│   │   ├── CategoryTabs.module.css
│   │   ├── DirectARViewer.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── MenuCard.jsx
│   │   ├── MenuCard.module.css
│   │   ├── MenuCardSkeleton.jsx
│   │   ├── MenuCardSkeleton.module.css
│   │   ├── MenuSection.jsx
│   │   ├── MenuSection.module.css
│   │   ├── ReservationSection.jsx
│   │   └── ReservationSection.module.css
│   ├── config
│   │   ├── consts.js
│   │   └── restaurant.js
│   ├── test
│   │   ├── CategoryTabs.test.jsx
│   │   ├── ErrorBoundary.test.jsx
│   │   ├── restaurant.config.test.js
│   │   └── setup.js
│   ├── App.jsx
│   ├── App.module.css
│   ├── globals.css
│   └── main.jsx
├── .dockerignore
├── .env.example
├── Dockerfile
├── README.md
├── index.html
├── package.json
├── vite.config.js
└── vitest.config.js
```
