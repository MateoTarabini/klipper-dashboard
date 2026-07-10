## descripcion

web desarrollada con Python, FastAPI, HTML, CSS y JavaScript que permite controlar una impresora 3D con Klipper a través de la API de Moonraker.

## Tecnologías

- Python
- FastAPI
- HTML
- CSS
- JavaScript
- Moonraker API

## Funciones actuales

- Control Home
- Pausar impresión
- Reanudar impresión
- Cancelar impresión
- Envío de comandos G-Code
- Visualización de la temperatura del hotend
- Visualización de la temperatura de la cama
- Actualización automática del estado de la impresora

## Instalación

Crear un entorno virtual:

```
python -m venv .venv
```

Activarlo e instalar las dependencias:

```
pip install -r requirements.txt
```

Ejecutar el servidor:

```
python -m uvicorn main:app --reload
```

Abrir el navegador en:

```
http://127.0.0.1:8000
```

## Estado del proyecto

En desarrollo.