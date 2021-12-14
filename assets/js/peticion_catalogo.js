var catalogoProductos = []

$.get('https://jsonplaceholder.typicode.com/posts', (response) => {
    catalogoProductos = response
    imprimirTabla()
})

function imprimirTabla(){
    const impresion = document.getElementById('impresion')
    // Verificamos que exista
    if (document.getElementById('tablaImp') !== null) {
        const posibleTabla = document.getElementById('tablaImp')
        impresion.removeChild(posibleTabla);
    }
    // Inicia creación de tabla
    const tabla = document.createElement('table')
    tabla.id = "tablaImp"
    tabla.className = "table table-hover jsmartable"
    impresion.appendChild(tabla)
    const thead = document.createElement('thead')
    tabla.appendChild(thead)
    const columnas = document.createElement('tr')
    thead.appendChild(columnas)
    const col1 = document.createElement('th')
    col1.innerText = "Producto"
    columnas.appendChild(col1)
    const col2 = document.createElement('th')
    col2.innerText = "Existencia"
    columnas.appendChild(col2)
    const col3 = document.createElement('th')
    col3.innerText = "Costo"
    columnas.appendChild(col3)
    const tbody = document.createElement('tbody')
    tabla.appendChild(tbody)
    catalogoProductos. forEach ((post) => {
        const filaN = document.createElement('tr')
        tbody.appendChild(filaN)
        const campo1 = document.createElement('td')
        campo1.innerText = post.title
        filaN.appendChild(campo1)
        const campo2 = document.createElement('td')
        campo2.innerText = post.userId+' piezas'
        filaN.appendChild(campo2)
        const campo3 = document.createElement('td')
        campo3.innerText = '$ '+post.id+' MXN.'
        filaN.appendChild(campo3)
        console.log('hola')
    })
}