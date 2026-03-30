# Annotator

Herramienta web para anotar imágenes con bounding boxes y generar datasets en formato YOLO listos para entrenar modelos de reconocimiento de imagen con darknet.

## Características

- Carga múltiples imágenes (PNG, JPG, etc.)
- Dibuja bounding boxes por clase con colores distintos
- Clases predeterminadas: `monto`, `fecha`, `firma`, `cuenta`
- Exporta el dataset como `.zip` con estructura YOLO:
  ```
  dataset_yolo.zip
  ├── images/        # imágenes anotadas
  ├── labels/        # archivos .txt con coordenadas normalizadas
  ├── obj.names      # lista de clases
  ├── obj.data       # configuración del dataset
  └── train.txt      # rutas de entrenamiento
  ```

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm, yarn o pnpm

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd annotator

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev
```

Abre el navegador en `http://localhost:5173`.

### Compilar para producción

```bash
npm run build
npm run preview
```

## Flujo de trabajo

1. **Upload** — arrastra o selecciona las imágenes a anotar
2. **Annotate** — dibuja bounding boxes sobre cada imagen y asigna la clase correspondiente
3. **Export** — descarga el `.zip` listo para usar con darknet/YOLO

## Tecnologías

- React 19 + TypeScript
- Vite
- JSZip (generación del archivo de exportación)
