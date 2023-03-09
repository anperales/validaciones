export function valida(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email:{
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "La información en este campo no es válida",
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento:{
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "El campo número telefónico no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 dígitos",
    },
    direccion:{
        valueMissing: "El campo domicilio no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres",
    },
    ciudad:{
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },
    estado:{
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres",
    },
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje ="";
    tipoError.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error]);
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
