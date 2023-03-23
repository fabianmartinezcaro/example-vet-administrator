// --- VARIABLES ----
// FORMULARIO
const formulario = document.querySelector('#nueva-cita')

// COLECCIÓN CITAS
const contenedorCitas = document.querySelector('#citas')

// DATOS
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// --- CLASES ---
class Citas{
    constructor(){
        this.citas = [];
    }

    nuevaCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas)
    }
}

class UI{

    mostrarAlerta(contenedor, mensaje, tipo){

        const divAlerta = document.createElement('DIV');
        divAlerta.textContent = mensaje;
        let condicionCumplida = false;

        if(tipo === 'error'){
            divAlerta.classList.add('alert', 'alert-danger');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }else if(tipo === 'correcto'){
            divAlerta.classList.add('alert', 'alert-success');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }

        if(condicionCumplida){
            setTimeout(() => {
                divAlerta.remove();
            }, 3000);
        }

    }

}

// INSTANCIAS
const ui = new UI()
const administrarCitas = new Citas();

// // --- ADD EVENT LISTENERS ----
cargarAddEventListeners();
function cargarAddEventListeners(){

    mascotaInput.addEventListener('input', datosCita)
    propietarioInput.addEventListener('input', datosCita)
    telefonoInput.addEventListener('input', datosCita)
    fechaInput.addEventListener('input', datosCita)
    horaInput.addEventListener('input', datosCita)
    sintomasInput.addEventListener('input', datosCita)

    formulario.addEventListener('submit', agregarCita);

}

// Objeto cita
const objetoCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// FUNCIONES

// Leemos los datos del input
function datosCita(evento){
    objetoCita[evento.target.name] = evento.target.value;
    console.log(objetoCita);
}

// Valida y agrega una nueva cita
function agregarCita(evento){
    evento.preventDefault();

    // Extraemos los datos del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = objetoCita;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta(formulario, 'Este es un error', 'error');
    }else{
        ui.mostrarAlerta(formulario, 'Cita agregada correctamente', 'correcto');
        administrarCitas.nuevaCita(objetoCita);
    }


}

// Elimina una cita
function eliminarCita(){

}






