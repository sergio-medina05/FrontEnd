const url = "https://retounab.herokuapp.com/partido/"
const urlu = "https://retounab.herokuapp.com/usuario/"
const urle = "https://retounab.herokuapp.com/equipo/"
const contenedor = document.querySelector('tbody')
const tabla = document.getElementById('partidos')

let resultados = ''
let equipolocal = ''
let equipoVisitante = ''
let usuarioL = ''

const modalpartidos = new bootstrap.Modal(document.getElementById('modalPartido'))
const usuarioPartido = document.getElementById('usuario')
const equipolPartido = document.getElementById('elocal')
const equipoVPartido = document.getElementById('evisitante')
const formpartidos = document.querySelector('form')
const golesLpartido = document.getElementById('golesL')
const golesVpartido = document.getElementById('golesV')

let opcion = ''

btnCrear.addEventListener('click', () => {
    golesLpartido.value = ''
    golesVpartido.value = ''
    modalpartidos.show()
    opcion = 'crear'
})

//funcion para mostra resultados

const mostrar = (partidos) => {

    partidos.forEach(partido => {

        resultados += `<tr>
                        <td width="5%">${partido.id}</td>
                        <td width="20%">${partido.usuario}</td>
                        <td width="20%">${partido.local}</td>
                        <td width="7%">${partido.golLocal}</td>
                        <td width="7%">${partido.golVisitante}</td>
                        <td width="20%">${partido.visitante}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`

    })

    contenedor.innerHTML = resultados


}

const mostrarU = (usuarios) => {
    usuarios.forEach(usuario => {
        usuarioL += `<option value="${usuario.id}">${usuario.nombre}</option>`
    })
    usuarioPartido.innerHTML = usuarioL
}

const mostrarEL = (equipos) => {
    equipos.forEach(equipo => {
        equipolocal += `<option value="${equipo.id}">${equipo.nombre}</option>`
    })
    equipolPartido.innerHTML = equipolocal
}
const mostrarEV = (equipos) => {
    equipos.forEach(equipo => {
        equipoVisitante += `<option value="${equipo.id}">${equipo.nombre}</option>`
    })
    equipoVPartido.innerHTML = equipolocal
    actualizar()
}

fetch(urlu)
    .then(response => response.json())
    .then(data => mostrarU(data))
    .catch(error => console.log(error))

fetch(urle)
    .then(response => response.json())
    .then(data => mostrarEL(data))
    .catch(error => console.log(error))

fetch(urle)
    .then(response => response.json())
    .then(data => mostrarEV(data))
    .catch(error => console.log(error))

//procedimiento mostrar registros
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


function actualizar() {

    let filas = contenedor.children.length

    for (var i = 0; i < filas; i++) {
        valor = contenedor.children[i].children[1].innerHTML

        US = document.getElementById('usuario')
        for (var j = 0; j < US.children.length; j++) {

            if (valor == US.children[j].value) {
                contenedor.children[i].children[1].innerHTML = US.children[j].innerHTML
            }

        }

        valor = contenedor.children[i].children[2].innerHTML

        EL = document.getElementById('elocal')
        for (var j = 0; j < EL.children.length; j++) {

            if (valor == EL.children[j].value) {
                contenedor.children[i].children[2].innerHTML = EL.children[j].innerHTML
            }

        }

        valor = contenedor.children[i].children[5].innerHTML

        EV = document.getElementById('elocal')
        for (var j = 0; j < EV.children.length; j++) {

            if (valor == EV.children[j].value) {
                contenedor.children[i].children[5].innerHTML = EV.children[j].innerHTML
            }

        }

    }

}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar el partido",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})

let idForm = 0
on(document, 'click', '.btnEditar', e => {

    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const usuarioForm = fila.children[1].innerHTML
    const elocalForm = fila.children[2].innerHTML
    const golesLForm = fila.children[3].innerHTML
    const golesVForm = fila.children[4].innerHTML
    const elocavForm = fila.children[5].innerHTML

    for (i = 0; i < usuario.children.length; i++) {
        if (usuario.children[i].innerHTML == usuarioForm) {
            usuario.children[i].defaultSelected=true
        }
    }
    for (i = 0; i < elocal.children.length; i++) {
        if (elocal.children[i].innerHTML == elocalForm) {
            elocal.children[i].defaultSelected=true
        }
    }

    for (i = 0; i < evisitante.children.length; i++) {
        if (evisitante.children[i].innerHTML == elocavForm) {
            evisitante.children[i].defaultSelected=true
        }
    }

    usuario.select = usuarioForm
    golesL.value = golesLForm
    golesV.value = golesVForm
    opcion = 'editar'
    modalpartidos.show()
})

formpartidos.addEventListener('submit', (e) => {
    e.preventDefault()


    {
        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario.value,
                    local: elocal.value,
                    visitante: evisitante.value,
                    fecha: new Date(),
                    golLocal: golesL.value,
                    golVisitante: golesV.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevopartido = []
                    nuevopartido.push(data)
                    mostrar(nuevopartido)
                })
                .then(response => location.reload())
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idForm,
                    usuario: usuario.value,
                    local: elocal.value,
                    visitante: evisitante.value,
                    fecha: new Date(),
                    golLocal: golesL.value,
                    golVisitante: golesV.value
                })
            })
                .then(response => location.reload())

        }

    }


})