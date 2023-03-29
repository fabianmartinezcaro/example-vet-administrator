// --- VARIABLES ----
const contenido = document.querySelector('#contenido');

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

let editando;


// --- CLASES ---
class Citas{
    constructor(){
        this.citas = [];
    }

    nuevaCita(cita){
        this.citas = [...this.citas, cita];
    }

    borrarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}

class UI{

    mostrarCitas({citas}){

        console.log(citas)

        this.limpiarHTML();

        citas.forEach(cita => {

            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            // DIV información
            const divCita = document.createElement('DIV');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id; 

            // Información de la cita
            const parrafoMascota = document.createElement('h2');
            parrafoMascota.classList.add('card-title', 'font-weight-bolder');
            parrafoMascota.textContent = mascota;

            const parrafoPropietario = document.createElement('p');
            parrafoPropietario.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const parrafoTelefono = document.createElement('p');
            parrafoTelefono.innerHTML = `
                <span class="font-weight-bolder">Teléfono:</span> ${telefono}
            `;

            const parrafoFecha = document.createElement('p');
            parrafoFecha.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const parrafoHora = document.createElement('p');
            parrafoHora.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const parrafoSintomas = document.createElement('p');
            parrafoSintomas.innerHTML = `
                <span class="font-weight-bolder">Síntomas:</span> ${sintomas}
            `;


            // Boton editar
            const botonEditar = document.createElement('a');
            botonEditar.classList.add('btn', 'btn-secondary', 'm-2');
            botonEditar.textContent = 'Editar';
            divCita.appendChild(botonEditar);
            botonEditar.onclick = () => {
                cargarEdicion(cita); // EDITAR
            }

            // Boton eliminar
            const botonEliminar = document.createElement('a');
            botonEliminar.classList.add('btn', 'btn-danger', 'text-white', 'm-2');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick =  () => {
                eliminarCita(id); // ELIMINAR
            }

            // Incluímos la información en el div de la cita
            divCita.appendChild(parrafoMascota);
            divCita.appendChild(parrafoPropietario);
            divCita.appendChild(parrafoTelefono);
            divCita.appendChild(parrafoFecha);
            divCita.appendChild(parrafoHora);
            divCita.appendChild(parrafoSintomas);

            // Botones
            divCita.appendChild(botonEliminar);
            divCita.appendChild(botonEditar);

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
}

// FUNCIONES

// Leemos los datos del input
function datosCita(evento){
    objetoCita[evento.target.name] = evento.target.value;
}

// Valida y agrega una nueva cita
function agregarCita(evento){
    evento.preventDefault();
    // Extraemos los datos del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = objetoCita;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta(formulario, 'Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.mostrarAlerta(formulario, 'Editado correctamente', 'correcto')

        administrarCitas.editarCita({...objetoCita});

        // Regresa el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    }else{
        objetoCita.id = Date.now();

        // Agregamos una cita al objeto
        administrarCitas.nuevaCita({...objetoCita});
        ui.mostrarAlerta(formulario, 'Cita agregada correctamente', 'correcto')
    }

    ui.limpiarHTML();

    // Mostrar el html
    
    ui.mostrarCitas(administrarCitas);

    // Reiniciamos el objeto
    reiniciarObjeto();
    formulario.reset();

}


function eliminarCita(id){

    ui.limpiarHTML();

    administrarCitas.borrarCita(id);

    ui.mostrarCitas(administrarCitas);

}


function cargarEdicion(cita){
    console.log(cita)

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Colocamos los valores de la cita en los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenamos el objeto global
    objetoCita.mascota = mascota;
    objetoCita.propietario = propietario;
    objetoCita.telefono = telefono;
    objetoCita.fecha = fecha;
    objetoCita.hora = hora;
    objetoCita.sintomas = sintomas;
    objetoCita.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}


function reiniciarObjeto(){

    objetoCita.mascota = '';
    objetoCita.propietario = '';
    objetoCita.telefono = '';
    objetoCita.fecha = '';
    objetoCita.hora = '';
    objetoCita.sintomas = '';

}
