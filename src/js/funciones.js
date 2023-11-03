function ocultarTodo() {
    document.querySelector('#divLogin').style.display = 'none';
    document.querySelector('#divRegistrarse').style.display = 'none';
    document.querySelector('#divAlquilerMaquina').style.display = 'none';
    document.querySelector('#divListadoMaquinas').style.display = 'none';
    document.querySelector('#divListadoTotales').style.display = 'none';
}

function cargarNavegacion() {

    let enlaceNavegacion = document.querySelectorAll(`.enlaceNavegacion`);

    /** console.log(enlaceNavegacion);  NodeList [ a.enlaceNavegacion, a.enlaceNavegacion ] */

    for (let enlace of enlaceNavegacion) {

        enlace.addEventListener('click', mostrarSeccion); /** Asignar evento a cada enlace */
    }
}

/** Evento asociado a cada enlace de navegación */
function mostrarSeccion() {

    ocultarTodo();

    let seccion = this.getAttribute("data-id"); /** Login. Registrarse */

    if (seccion === 'Registrarse') {
        document.querySelector(`#div${seccion}`).style.display = 'block';
        return;
    }

    if (sistema.logueado !== null) {
        // limpiarInformacionAnterior();

        document.querySelector(`#div${seccion}`).style.display = 'block';

    } else {
        document.querySelector('#divLogin').style.display = 'block';
    }
}

function mostrarSecciones(clase) {

    let nodeList = document.querySelectorAll(`.${clase}`);

    for (let div of nodeList) {

        div.style.display = 'block';
    }
}

function bienvenido() {

    const { nombre, apellido, id } = sistema.logueado;

    const p = document.createElement('P');
    p.innerHTML = `<span class="spanBienvenido">Bienvenido:</span> ${nombre} ${apellido} <span class="spanBienvenido">ID:</span> ${id}`;

    document.querySelector('#bienvenido').appendChild(p);
}