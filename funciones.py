import requests

def enviar_gcode(comando):

    requests.post(
        "http://192.168.0.149/printer/gcode/script",
        json={
            "script": comando
        }
    )