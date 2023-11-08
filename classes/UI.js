class UI extends Sistema {

    static imprimirAlerta(mensaje, tipo, idDiv) {

        const parrafo = document.createElement('P');
        parrafo.classList.add('alerta');
        parrafo.innerHTML = mensaje;

        if (tipo === 'error') {
            parrafo.classList.add('error')
        } else {
            parrafo.classList.add('exito');
        }
        
        document.querySelector(`#${idDiv}`).appendChild(parrafo);
        
        // setTimeout(() => {
        //     parrafo.remove();
        // }, 2000);
    }

    static limpiarHTML() {
        
        const nodeList = document.querySelectorAll('.resultado');

        for(let div of nodeList) {

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }
    }

    static limpiarBienvenida() {

        const div = document.querySelector('#bienvenido');

        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

    static limpiarUsuariosAprobados() {

        const div = document.querySelector('#resultadoListadoUsuariosAprobados');

        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }
}