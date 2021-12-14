// Obtenemos del local storage el inventario y lo decodificamos para seguir procesando
const catalogoProductos = JSON.parse(localStorage.getItem('inventario'))
// variables para controlar mensajes de error   
let muestraError = document.getElementById('mensaje_error')  
let muestraCorrecto = document.getElementById('mensaje_correcto') 
let mensajeError = ''

$('#ordenarAsc').on('click', ()=>{
    ordenarExistenciaAscendente()
}) 

$('#ordenarDes').on('click', ()=>{
    ordenarExistenciaDescendente()
}) 

$('#ordenarCMay').on('click', ()=>{
    ordenarCostoMayor()
}) 

$('#ordenarCMen').on('click', ()=>{
    ordenarCostoMenor()
})

//Función que ordena productos por total de costo 
function ordenarCostoMayor(){
    catalogoProductos.sort( (a,b) => b.costo - a.costo)
    muestraMensajeCorrecto('Se ordenaron los productos de mayor a menor precio')
    imprimirTabla()  
}

function ordenarCostoMenor(){
    catalogoProductos.sort( (a,b) => a.costo - b.costo)
    muestraMensajeCorrecto('Se ordenaron los productos de menor a mayor precio')
    imprimirTabla()  
}

//Función que orden productos por existencia
function ordenarExistenciaAscendente(){

    let respuesta = confirm('¿Estás seguro quieres ordenar de forma ascendente?')
    if (respuesta===true){
        catalogoProductos.sort( (a,b) => a.existencia - b.existencia)
        muestraMensajeCorrecto('Se ordenaron los productos de menor a mayor existencia')
    }
    imprimirTabla()  
}

//Función que orden productos por existencia
function ordenarExistenciaDescendente(){
    catalogoProductos.sort( (a,b) => b.existencia - a.existencia)
    muestraMensajeCorrecto('Se ordenaron los productos de mayor a menor existencia')
    imprimirTabla()  
}

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
    for(let i = 0; i < catalogoProductos.length; i++){
        const filaN = document.createElement('tr')
        tbody.appendChild(filaN)
        const campo1 = document.createElement('td')
        campo1.innerText = catalogoProductos[i].nombre
        filaN.appendChild(campo1)
        const campo2 = document.createElement('td')
        campo2.innerText = catalogoProductos[i].existencia+' piezas'
        filaN.appendChild(campo2)
        const campo3 = document.createElement('td')
        campo3.innerText = '$ '+catalogoProductos[i].costo+' MXN.'
        filaN.appendChild(campo3)
    }
}

function muestraMensajeError(mensaje){
    // Imprimimos mensaje de error en el formulario             
    muestraError.innerHTML = mensaje
    muestraError.style.display = 'block'
    muestraCorrecto.style.display = 'none'
}

function muestraMensajeCorrecto(mensaje){
    // Imprimimos mensaje de realizado en el formulario             
    muestraCorrecto.innerHTML = mensaje
    muestraCorrecto.style.display = 'block'
    muestraError.style.display = 'none'
}

imprimirTabla()