const botonHome = document.getElementById("home");
botonHome.addEventListener("click", function () {

    console.log("Apretaste Home");
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

//info en tiempo real
setInterval(actualizar_estados, 1000);
function actualizar_estados(){
    fetch("/estados")
    .then(respuesta => respuesta.json())
    .then(datos => {
        hotend.textContent = parseInt(datos.result.status.extruder.temperature);
        cama.textContent = parseInt(datos.result.status.heater_bed.temperature);
        progreso.textContent = datos.status.virtual_sdcard.progress;
    });
}