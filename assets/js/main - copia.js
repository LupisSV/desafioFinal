class Producto{
    constructor(nombre, existencia, costo){
        this.nombre = nombre
        this.existencia = parseInt(existencia) 
        this.costo = parseFloat(costo)
    }

    // Muestra los valores de un producto
    get imprimeDatos() {
        return this.datosProducto()
    }

    datosProducto() {
        return 'Se ingresó el producto: "' +this.nombre+ '" con una existencia de: "' +this.existencia + '" unidades.'
    }
}

let formulario = document.getElementById("formulario-productos")
formulario.onsubmit = (e) => {registraProducto(e)}

let catalogoProductos = [                                
                        new Producto('Cama para perro grande', 350, 10),   
                        new Producto('Cama para gato grande', 250, 10 ),  
                        new Producto('Carnaza pollo', 5, 5)
                        ]

$('#ordenarAsc').on('click', ()=>{
    desplegarTabla()
    ordenarExistenciaAscendente()
}) 

$('#ordenarDes').on('click', ()=>{
    desplegarTabla()
    ordenarExistenciaDescendente()
}) 

$('#ordenarCMay').on('click', ()=>{
    desplegarTabla()
    ordenarCostoMayor()
}) 

$('#ordenarCMen').on('click', ()=>{
    desplegarTabla()
    ordenarCostoMenor()
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
    for(let i = 0; i < catalogoProductos.length; i++){
        const filaN = document.createElement('tr')
        tbody.appendChild(filaN)
        const campo1 = document.createElement('td')
        campo1.innerText = catalogoProductos[i].nombre
        filaN.appendChild(campo1)
        const campo2 = document.createElement('td')
        campo2.innerText = catalogoProductos[i].existencia
        filaN.appendChild(campo2)
        const campo3 = document.createElement('td')
        campo3.innerText = catalogoProductos[i].costo
        filaN.appendChild(campo3)
    }
}

function registraProducto(e){
    e.preventDefault()
    // variables del formulario
    let nombreIngresado = document.getElementById("nombre").value
    let existenciaIngresada = document.getElementById("existencia").value 
    let costoIngresado = document.getElementById("costoUnitario").value     

    localStorage.setItem("Nombre_Producto",nombreIngresado)
    localStorage.setItem("Existencia",existenciaIngresada)
    localStorage.setItem("Costo",costoIngresado)

    // variables para controlar mensajes de error
    let muestraError = document.getElementById("mensaje_error")  
    let muestraCorrecto = document.getElementById("mensaje_correcto")       
    let mensajeError = ''
    

    // Comprobamos que los valores sean con el formato que deseamos
    if(nombreIngresado === '')
        mensajeError = 'Ingrese un nombre de producto. <br>'
    if(existenciaIngresada === '' || existenciaIngresada < 1)
        mensajeError = mensajeError+'Ingrese una existencia con formato válido. <br>'

    // Comprobamos que no exista mensaje de error, si existe, entonces lo mostramos en la página, si no, ejecutamos el guardado
    if(mensajeError !== ''){ 
        // Imprimimos mensaje de error en el formulario             
        muestraError.innerHTML = mensajeError
        muestraError.style.display = 'block'
        muestraCorrecto.style.display = 'none'
    }
    else{
        // Hace la instancia del objeto y manda los valores del formulario al constructor
        let objProducto = new Producto(nombreIngresado, existenciaIngresada, costoIngresado)     
        // Imprimimos mensaje de realizado en el formulario             
        muestraCorrecto.innerHTML = objProducto.imprimeDatos
        muestraCorrecto.style.display = 'block'
        muestraError.style.display = 'none'

        // Limpiamos el formulario
        document.getElementById('formulario-productos').reset()

        // Guarda en nuestro arreglo de objetos
        catalogoProductos.push(objProducto)
        
    }    
    console.log(catalogoProductos)     
    imprimirTabla()  
}

//Función que ordena productos por total de costo 
function ordenarCostoMayor(){
    desplegarTabla()
    catalogoProductos.sort( (a,b) => b.costo - a.costo)
    alert("Se ordenaron los productos de mayor a menor precio y se visualiza en consola")
    console.log(catalogoProductos)
    imprimirTabla()  
    
}

function ordenarCostoMenor(){
    catalogoProductos.sort( (a,b) => a.costo - b.costo)
    alert("Se ordenaron los productos de menor a mayor precio y se visualiza en consola")
    console.log(catalogoProductos)
    imprimirTabla()  
}

//Función que orden productos por existencia
function ordenarExistenciaAscendente(){

    let respuesta = confirm("¿Estás seguro quieres ordenar de forma ascendente?")
    if (respuesta===true){
        catalogoProductos.sort( (a,b) => a.existencia - b.existencia)
        alert("Se ordenaron los productos de mayor a menor existencia y se visualiza en consola")
        console.log(catalogoProductos)
    }
    imprimirTabla()  
}

//Función que orden productos por existencia
function ordenarExistenciaDescendente(){
    catalogoProductos.sort( (a,b) => b.existencia - a.existencia)
    alert("Se ordenaron los productos de mayor a menor existencia y se visualiza en consola")
    console.log(catalogoProductos)
    imprimirTabla()  
}

function desplegarTabla(){
    $(document).ready(function(){
        $('button').click(function(){
            $('table').animate({
                height: 'toggle'
            });
        });
    });
     
}