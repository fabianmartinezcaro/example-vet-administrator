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

    borrarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
        console.log(this.citas)
    }
}

class UI{

    mostrarCitas(citas){

        citas.forEach(cita => {

            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            // Informacion
            const divCita = document.createElement('DIV');
            divCita.classList.add('lista-citas','cita');
            divCita.innerHTML = `
                <p class=""><span class="fw-bold text-uppercase fs-2">${mascota}</span></p>
                <p class="badge bg-info text-white">${id}</p>
                <p class=""><span class="fw-bolder">Nombre dueño: </span>${propietario}</p>
                <p class=""><span class="fw-bolder">Teléfono: </span>${telefono}</p>
                <p class=""><span class="fw-bolder">Fecha: </span>${fecha}</p>
                <p class=""><span class="fw-bolder">Hora atención: </span>${hora}</p>
                <p class=""><span class="fw-bolder">Síntomas: </span>${sintomas}</p>

            `
            // Boton eliminar
            const botonEditar = document.createElement('button');
            botonEditar.classList.add('btn', 'btn-secondary',);
            botonEditar.textContent = 'Editar';
            divCita.appendChild(botonEditar);

            // Boton eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn', 'btn-danger');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick =  () => {
                eliminarCita(id);
            }
            divCita.appendChild(botonEliminar);


            contenedorCitas.appendChild(divCita);

            
        });
    }

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

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
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
    sintomas: '',
    id: Date.now()
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
        ui.mostrarAlerta(formulario, 'Todos los campos son obligatorios', 'error');
        return;
    }else{
        ui.mostrarAlerta(formulario, 'Cita agregada correctamente', 'correcto');
    }

    // Limpiamos el html duplicado
    ui.limpiarHTML();

    // Agregamos una cita al objeto
    administrarCitas.nuevaCita(objetoCita);

    const {citas} = administrarCitas;
    
    // Insertamos la cita en el html
    ui.mostrarCitas(citas);

}

// Elimina una cita
function eliminarCita(id){

    const {citas} = administrarCitas;

    ui.limpiarHTML();
    administrarCitas.borrarCita(id);
    ui.mostrarCitas(citas);

}






