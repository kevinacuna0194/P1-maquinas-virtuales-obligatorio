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
        
        setTimeout(() => {
            parrafo.remove();
        }, 3000);
    }

    static limpiarHTML() {
        
        const nodeList = document.querySelectorAll('.resultado');

        for(let div of nodeList) {

            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
        }

    }
}