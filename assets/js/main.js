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

let catalogoProductos
let formulario = document.getElementById("formulario-productos") 
formulario.onsubmit = (e) => {registraProducto(e)}
// variables para controlar mensajes de error   
let muestraError = document.getElementById("mensaje_error")  
let muestraCorrecto = document.getElementById("mensaje_correcto") 
let mensajeError = ''

// Para crear el catálogo de productos, verificamos si existe ya en localStorage algo, si no, creamos uno con 3 productos de manera inicial
if(localStorage.getItem('inventario') === null){
    catalogoProductos = [                                
                        new Producto('Cama para perro grande', 350, 10),   
                        new Producto('Cama para gato grande', 250, 10 ),  
                        new Producto('Carnaza pollo', 5, 5)
                        ]
} else{    
    catalogoProductos = JSON.parse(localStorage.getItem('inventario'))
}

function registraProducto(e){
    e.preventDefault()
    // variables del formulario
    let nombreIngresado = document.getElementById("nombre").value
    let existenciaIngresada = document.getElementById("existencia").value 
    let costoIngresado = document.getElementById("costoUnitario").value     

    let verificaDatos = verificaDatosIngresados(nombreIngresado, existenciaIngresada, costoIngresado)

    if(verificaDatos !== ''){
        muestraMensajeError(verificaDatos)
    } else{
        // Verificamos que el producto no exista
        let existeProducto = verificaProductoExistente(nombreIngresado)
        
        if(existeProducto === true){
            muestraMensajeError('El producto que intenta ingresar ya existe')
        } else{
            // Hace la instancia del objeto y manda los valores del formulario al constructor
            let objProducto = new Producto(nombreIngresado, existenciaIngresada, costoIngresado)     
            muestraMensajeCorrecto(objProducto.imprimeDatos)
            // Guarda en nuestro arreglo de objetos
            catalogoProductos.push(objProducto)
            // Actualizamos el localStorage
            codificaInventario()

            // Limpiamos el formulario
            document.getElementById('formulario-productos').reset()        
        } 
    }
}

function verificaDatosIngresados(nombreIngresado, existenciaIngresada, costoIngresado){
    if(nombreIngresado === ''){
        return 'El formato de nombre de producto no es válido'
    } else if(existenciaIngresada === '' || existenciaIngresada < 1){
        return 'El formato de existencia no es válido'
    } else if(costoIngresado === '' || costoIngresado < 1){
        return 'El formato de costo ingresado no es válido'
    } else{
        return ''
    }
}

function verificaProductoExistente(nombreProducto){
    for(let i = 0; i < catalogoProductos.length; i++){
        if(catalogoProductos[i].nombre.toLowerCase() === nombreProducto.toLowerCase()){
            return true;
        }
    }
    return false;
}

function codificaInventario(){
    localStorage.setItem('inventario', JSON.stringify(catalogoProductos))
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

codificaInventario()