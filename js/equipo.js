const url = "https://retounab.herokuapp.com/equipo/"
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalequipos = new bootstrap.Modal(document.getElementById('modalEquipo'))
const formEquipos = document.querySelector('form')
const nombreEquipo = document.getElementById('nombre')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombreEquipo.value = ''
    modalequipos.show()
    opcion = 'crear'
})

//funcion para mostra resultados

const mostrar = (equipos) => {
    equipos.forEach(equipos => {
        resultados += `<tr>
                        <td width="10%">${equipos.id}</td>
                        <td width="70%">${equipos.nombre}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}

//procedimiento mostrar registros
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


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

    alertify.confirm("Desea eliminar el equipo",
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
    const nombreForm = fila.children[1].innerHTML

    nombre.value = nombreForm
    opcion = 'editar'
    modalequipos.show()
})

formEquipos.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value
            })
        })
        .then(response => response.json())
        .then(data=>{
            const nuevoEquipo =[]
            nuevoEquipo.push(data)
            mostrar(nuevoEquipo)
        })
    }
    if (opcion == 'editar') {

        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:idForm,
                nombre:nombre.value
            })
        })
        .then(response => location.reload())

    }
    modalequipos.hide()
})