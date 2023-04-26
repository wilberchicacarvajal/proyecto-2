// encargado de la interacción y configuración del formulario
/**
 * este objeto contiene las referencias a los elementos claves del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate'),
    }
};

/**
 * Array de objetos que contienen información para las validaciones
 * cada objeto contiene una referencia  a cada campo, un array de objetos
 * de validación que tendrá, el ID del error, el mensaje y la función de validación
 */
export const fieldsConfigurations = [
    {
        input: formElements.fields.name,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`, // comillas template literals
                errorMessage: 'El nombre es obligatorio.',
                // las validaciones retornaran un false cuando debe mostrar el mensaje de error 
                // y un true cunado no debe mostrarlo
                validationFunction: (Value) => {    // value es valor del espacio
                    return Value.trim() !== '';


                }
            }

        ]
    },

    {
        input: formElements.fields.description,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`, // comillas template literals
                errorMessage: 'La descripción es obligatorio.',
                // las validaciones retornaran un false cuando debe mostrar el mensaje de error 
                // y un true cunado no debe mostrarlo
                validationFunction: (Value) => {    // value es valor del espacio
                    return Value.trim() !== '';


                }
            }

        ]
    },


    {
        input: formElements.fields.email,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`, // comillas template literals
                errorMessage: 'el email es obligatorio.',
                // las validaciones retornaran un false cuando debe mostrar el mensaje de error 
                // y un true cunado no debe mostrarlo
                validationFunction: (Value) => {    // value es valor del espacio
                    return Value.trim() !== '';


                }
            }

        ]
    },

    {
        input: formElements.fields.birthDate,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`, // comillas template literals
                errorMessage: 'La fecha es obligatorio.',
                // las validaciones retornaran un false cuando debe mostrar el mensaje de error 
                // y un true cunado no debe mostrarlo
                validationFunction: (Value) => {    // value es valor del espacio
                    return Value.trim() !== '';


                }
            }

        ]
    }
]


export function getFormData() {
    /**
     * const formData = new FormData(formElements.form);
     * return Object.fromEntries(formData.entries());
     */

    const teacher = {
        id: new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();
}