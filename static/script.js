const botonHome = document.getElementById("home");
botonHome.addEventListener("click", function () {
    fetch("/home");
});

const input = document.getElementById("gcode");

const botonEnviar = document.getElementById("enviar");
botonEnviar.addEventListener("click", function () {

    fetch("/enviar", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            comando: input.value
        })
    });

    const consola = document.getElementById("consola");
    consola.value += input.value + "\n";

});

const valorX = document.getElementById("x");
const valorZ = document.getElementById("z");
const valorY = document.getElementById("y");

const botonMover = document.getElementById("mover");
botonMover.addEventListener("click", function(){

    const x = parseFloat(valorX.value);
    const y = parseFloat(valorY.value);
    const z = parseFloat(valorZ.value);

    fetch("/mover",{
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            x: x,
            y: y,
            z: z
        })
    });
});

const botonPause = document.getElementById("pausa");
botonPause.addEventListener("click", function(){
    fetch("/pausa");
});

const botonReanudar = document.getElementById("reanudar")
botonEnviar.addEventListener("click", function(){
    fetch("/reanudar");
})

const botonCancelar = document.getElementById("cancelar")
botonCancelar.addEventListener("click", function(){
    fetch("/cancelar");
})

const conect = document.getElementById("conect");

//info en tiempo real
setInterval(actualizar_estados, 1000);
function actualizar_estados() {
    fetch("/estados")
        .then(respuesta => respuesta.json())
        .then(datos => {
            hotend.textContent = parseInt(datos.result.status.extruder.temperature) || "N/A";
            cama.textContent = parseInt(datos.result.status.heater_bed.temperature) || "N/A";
            progreso.textContent = datos.result.status.virtual_sdcard.progress || "N/A";
            conect.textContent = "Conectado";
        })
        .catch(error => {
            console.error("Error al obtener los estados:", error);
            // Aquí puedes agregar las acciones necesarias cuando no se reciben datos
            conect.textContent = "Desconectado";
        });
}

function actualizarPosicion() {
    fetch("/position")
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log("Datos recibidos:", datos);
            valorX.value = parseFloat(datos.result.status.toolhead.position[0]) || 0;
            valorY.value = parseFloat(datos.result.status.toolhead.position[1]) || 0;
            valorZ.value = parseFloat(datos.result.status.toolhead.position[2]) || 0;
        })
        .catch(error => console.error("Error al obtener posición:", error));
}

setInterval(actualizarPosicion, 1000);
