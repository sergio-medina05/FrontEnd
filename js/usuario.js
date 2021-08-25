const url = "https://retounab.herokuapp.com/usuario/"
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalusuarios = new bootstrap.Modal(document.getElementById('modalUsuario'))
const formusuarios = document.querySelector('form')
const nombreusuario = document.getElementById('nombre')
const correousuario = document.getElementById('correo')
const usernameusuario = document.getElementById('username')
const passwordusuario = document.getElementById('password')
const confirmarusuario = document.getElementById('confirmar')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombreusuario.value = ''
    correousuario.value = ''
    usernameusuario.value = ''
    passwordusuario.value = ''
    confirmarusuario.value = ''
    modalusuarios.show()
    opcion = 'crear'
})

//funcion para mostra resultados

const mostrar = (usuarios) => {
    usuarios.forEach(usuario => {
        resultados += `<tr>
                        <td width="10%">${usuario.id}</td>
                        <td width="20%">${usuario.nombre}</td>
                        <td width="20%">${usuario.correo}</td>
                        <td width="20%">${usuario.username}</td>
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

    alertify.confirm("Desea eliminar el usuario",
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
    const correoForm = fila.children[2].innerHTML
    const usernameForm = fila.children[3].innerHTML

    nombre.value = nombreForm
    correo.value = correoForm
    username.value = usernameForm
    opcion = 'editar'
    modalusuarios.show()
})

formusuarios.addEventListener('submit', (e) => {
    e.preventDefault()

    if ((password.value != confirmar.value) || password.value =='' || confirmar.value=='') {
        alertify
            .alert("No coindice la confirmación del password", function () {
                alertify.message('OK');
            });
    }
    else {
        if (opcion == 'crear') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre.value,
                    correo: correo.value,
                    username: username.value,
                    password: password.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevousuario = []
                    nuevousuario.push(data)
                    mostrar(nuevousuario)
                })
        }
        if (opcion == 'editar') {

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idForm,
                    nombre: nombre.value,
                    correo: correo.value,
                    username: username.value,
                    password: password.value
                })
            })
                .then(response => location.reload())

        }
        modalusuarios.hide()
    }
})