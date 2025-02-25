# Pagina demo de Hospital Nacional

## Contexto

En este proyecto, los estudiantes deberán implementar el consumo de una API para obtener y mostrar datos del sistema del hospital, como la información de doctores o servicios médicos.
Utilizando useEffect y useState, se espera que realicen peticiones asíncronas, gestionen el estado y manejen los errores de manera eficiente. Podrán utilizar Fetch API o Axios según su preferencia.

Trabajo práctico para desarrollar una página web de hospital que debe contener las siguientes páginas:

1. Vista Principal Home
2. Vista del About
3. Vista de Contact

## Cómo correr el proyecto:

1. Descargar el contenido de este repositorio en el computador. Puede ser clonando el repositorio o descargando el .zip:

   - **Clonar el repositorio**: Puede hacerlo con cualquier gestor de repositorios. Si tiene git instalado, puede abrir una terminal en algun diretorio y ejecutar:

   ```bash
   git clone url_de_este_repo
   ```

   - Si no tiene git instalado puede presionar el botón verde `<> Code` que está en esta página y seleccionar la opción `Download ZIP`.
     1. Descargue el archivo .zip en algun directorio conocido _(ej: Escritorio, Documentos, etc.)_.
     2. Descomprima el archivo .zip

2. Abrir una terminal denntro de la carpeta.
3. Para que pueda ser ejecutado primero se debe hacer la build de la aplicaicón y despues el despliegue:

   1. Ejecutar en la terminal `yarn build`
   2. Ejecutar en la terminal `yarn preview`

   OPCIONAL: Se puede ejecutar `yarn buildpreview` para ejecutar los 2 scipts.

4. Despues de ejecutar el **preview** se mostrará una dirección en la terminal para ver la applicación.

## TO-DO (Rúbrica):

1. Creación del Manifiesto (1.5 puntos)

   - [x] Crea un archivo de manifiesto para la aplicación web del hospital que incluya los siguientes elementos:
     - [x] Nombre de la aplicación.
     - [x] Iconos en varias resoluciones para diferentes dispositivos.
     - [x] Color de fondo y color del tema.
     - [x] Modo de pantalla (fullscreen o standalone).

   _El archivo de manifiesto es creado por VitePWA al momento de hacer la build de la aplicación, con los datos entregados en el archivo
   **vite.config.ts**. Este se puede ver en **/dist/manifest.webmanifest**_

   ***

2. Registro de un Service Worker Básico (2 puntos)

   - [x] Registra un Service Worker para la aplicación del hospital, segurando que:
   - [x] Esté registrado y activado correctamente.
   - [x] Se realice precaching de los archivos principales (HTML, CSS, JavaScript).
   - [x] La aplicación pueda funcionar en modo offline gracias al Service Worker.

   _El serviceworker está ubicado en **/src/sw.ts**. Para crear un serviceworker correctamente y pueda ser transpilado hay que indicar en el **vite.config.ts** que se usará un serviceWorker custom, la ubicación y el nombre del archivo_

   ***

```ts
 export default defineConfig({
    plugins: [
       react(),
       VitePWA({
          srcDir: 'src', // Localización del archivo
          filename: 'sw.ts', // Nombre del archivo
          strategies: 'injectManifest', // "injectManifest" indica que se usara un SW custom
          ...
       }),
    ],
 });
```

3. Implementación de Estrategias de Almacenamiento en Caché (2
   puntos)

   - [x] Implementa al menos una estrategia de almacenamiento en caché adecuada para la aplicación:
     - [x] Stale-While-Revalidate: Sirve el contenido desde la caché, pero actualiza en segundo plano.

   _Se implemento en el archivo **/src/sw.ts**_

   ***

4. Pruebas de Funcionamiento Offline y Validación con Lighthouse
   (1.5 puntos)

   - [ ] Verifica que la aplicación funcione en modo offline utilizando Lighthouse para evaluar el rendimiento de la PWA:
     - [ ] Ejecuta Lighthouse para generar un informe que evalúe si la aplicación cumple con los criterios de PWA (instalabilidad, funcionamiento offline y rendimiento).
     - [ ] Asegúrate de que el informe refleje una implementación básica funcional de PWA.
