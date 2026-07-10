#python -m uvicorn main:app --reload
import requests
from fastapi import FastAPI 

from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

import funciones


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/")
def inicio(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
    )

@app.get("/home")
def home():
    funciones.enviar_gcode("G28")

@app.post("/enviar")
async def enviar(request: Request):
    datos = await request.json()
    comando = datos["comando"]
    funciones.enviar_gcode(comando)

@app.post("/pausa")
def pausa():
    funciones.emviar_gcode("PAUSE")

@app.post("/reanudar")
def reanudar():
    funciones.enviar_gcode("RESUME")

@app.post("/cancelar")
def cancelar():
    funciones.enviar_gcode("CANCEL_PRINT")

@app.get("/estados")
def estados():
    respuesta = requests.get(
        "http://192.168.0.149/printer/objects/query?extruder&heater_bed&virtual_sdcard"
    )
    datos = respuesta.json()
    return datos
