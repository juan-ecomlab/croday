const $ = id => document.getElementById(id);
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const agregarEmail = async (email, client) => {
    const item = {
        email,
        client,
    }

    const urlLambda = "https://u57njg43jj.execute-api.sa-east-1.amazonaws.com/"

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
        };
        fetch(urlLambda, options)
        .then(data => {
            if(!data.ok) {
                throw Error(data.status)
            }
            return data.json()
        }).then(email => {
            console.log(email)
        }).catch(e => {
            console.log(e);
            });
}

let fecha = new Date(2024, 11, 10, 12);
let msFecha = fecha.getTime();

let parrafoDias = $("dias")
let parrafoHoras = $("horas")
let parrafoMinutos = $("minutos")
let parrafoSegundos = $("segundos")
let countdown = $("countdown")

let intervalo = setInterval(() => {
    
    let hoy = new Date().getTime();
    let distancia = msFecha - hoy;
    let msPorDia = 1000 * 60 * 60 * 24;
    let msPorHora = 1000 * 60 * 60;
    let msPorMinuto = 1000 * 60;
    let msPorSegundo = 1000;

    let dias = Math.floor(distancia / msPorDia);
    let horas = Math.floor((distancia % msPorDia) / msPorHora);
    let minutos = Math.floor((distancia % msPorHora) / msPorMinuto);
    let segundos = Math.floor((distancia % msPorMinuto) / msPorSegundo);

    parrafoDias.innerText = dias < 10 ? "0" + dias : dias;
    parrafoHoras.innerText = horas < 10 ? "0" + horas : horas
    parrafoMinutos.innerText = minutos < 10 ? "0" + minutos : minutos;
    parrafoSegundos.innerText = segundos < 10 ? "0" + segundos : segundos;

    if(distancia < 0) {
        clearInterval(intervalo);

        countdown.innerHTML = ""
    }

}, 1000);

window.addEventListener('load', () => {
    $('email').addEventListener('focus', () => {
        $('error').innerText = ""
    })

    $('email').addEventListener('keydown', () => {
        $('error').innerText = ""
    })

    $("form").addEventListener("submit", event => {
        event.preventDefault()
        let error = false
        let form = $('form');

        if(!emailRegex.test($('email').value)){
            error = true
            $('error').innerText = "*Debes ingresar un email válido"
            $("form").elements[2].value = ""
        }

        if(!error) {
            agregarEmail(form.elements[0].value, "croday")
            Swal.fire({
                title: "Correo enviado con éxito a <b>" + form.elements[0].value + "</b><br> Por favor, revisá tu casilla",
                icon: "success",
                showConfirmButton: true,
                showCloseButton: true,
                timer: 2500,
                timerProgressBar: true,
                customClass: {
                    title: "title",
                    confirmButton: "botonAlert"
                  }
              });
            $("form").elements[0].value = ""
            $("form").elements[1].value = ""
            $("form").elements[2].value = ""
        }
    })

    $('hamburgIcon').addEventListener('click', () => {
        $("hamburgMostrar").classList.toggle("mostrar")
        $("hamburgMostrar").classList.toggle("oculto")
        $("seccionForm").classList.toggle("abajo")
        $("seccionOradores").classList.toggle("abajo")
        $("seccionFAQ").classList.toggle("abajo")
    })

    $('q1').addEventListener('click', () => {
        $("iconMas1").classList.toggle("oculto")
        $("iconMenos1").classList.toggle("oculto")
        $("mostrar1").classList.toggle("oculto")
    })

    $('q2').addEventListener('click', () => {
        $("iconMas2").classList.toggle("oculto")
        $("iconMenos2").classList.toggle("oculto")
        $("mostrar2").classList.toggle("oculto")
    })

    $('q3').addEventListener('click', () => {
        $("iconMas3").classList.toggle("oculto")
        $("iconMenos3").classList.toggle("oculto")
        $("mostrar3").classList.toggle("oculto")
    })

    $('q4').addEventListener('click', () => {
        $("iconMas4").classList.toggle("oculto")
        $("iconMenos4").classList.toggle("oculto")
        $("mostrar4").classList.toggle("oculto")
    })

    
})