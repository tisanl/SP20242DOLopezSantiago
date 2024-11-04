function validarNombre(nombre){
    if(nombre != "") return capitalizar_nombre(nombre)
    else return false
}// Fin de la Funcion

function validarTodoNumeros(string){
    string = String(string)
    regex_string = /^[0-9]+$/
    retorno = false
    string = string.trim().replace("\n","")
    string = string.replaceAll(/[^0-9]/g,"")
    if(regex_string.test(string)) retorno = string
    else retorno = false
    return retorno
}// Fin de la Funcion

function validarNumeroMinMax(numero,min,max){
    retorno = false
    numero = parseInt(numero)
    if(numero != NaN){
        if(numero >= min && numero <= max) retorno = numero
        else retorno = -2
    } else retorno = -1
    return retorno
}

function validarNumeroMin(numero,min){
    retorno = false
    numero = parseInt(numero)
    if(numero != NaN){
        if(numero >= min) retorno = numero
        else retorno = -2
    } else retorno = -1
    return retorno
}

function validarEdad(string){
    edad = validarTodoNumeros(string)
    retorno = false
    if(edad){
        edad = parseInt(edad)
        if(edad > 0 && edad < 130) retorno = string
        else retorno = -2
    }  else retorno = -1
    return retorno
}// Fin de la Funcion

function validarTelefono(telefono){
    telefono = String(telefono)
    regex_telefono = /^[0-9]{10}$/
    retorno = false

    telefono = telefono.trim().replace("\n","")
    telefono = telefono.replaceAll(/[^0-9]/g,"")
    if(regex_telefono.test(telefono)) retorno = telefono
    else retorno = false
    return retorno
}// Fin de la Funcion

function validarNoVacio(string){
    if(string != "") return string
    else return false
}// Fin de la Funcion

// Funcion para capitalizar un nombre
function capitalizar_nombre(texto){
    retorno = ""
    lista_palabras = texto.trim().replace("\n","").toLowerCase().split(" ")
    for(var i = 0; i < lista_palabras.length; i++){
        if(lista_palabras[i] != " " && lista_palabras[i] != "")
            lista_palabras[i] = lista_palabras[i][0].toUpperCase() + lista_palabras[i].substr(1)
            retorno += lista_palabras[i]
        if(i < lista_palabras.length -1)
            retorno += " "
    }
    return retorno
}// Fin de la Funcion