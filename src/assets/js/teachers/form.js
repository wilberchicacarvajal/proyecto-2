// encargado de la interacción y configuración del formulario
/**
 * este objeto contiene las referencias a los elementos claves del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    containerId: document.getElementById('containerId'),
    fields: {
        id: document.getElementById('txtId'),
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate'),
    },
    buttons: {
        btnSubmit: document.getElementById('btnSubmit'),
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
                erroId: `${formElements.fields.name.id}Required`,
                errorMessage: 'La descripción es obligatorio.',
                validationFunction: (Value) => {
                    return Value.trim() !== '';
                }
            }
        ]
    },

    {
        input: formElements.fields.email,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`,
                errorMessage: 'el email es obligatorio.',
                validationFunction: (Value) => {
                    return Value.trim() !== '';

                }
            },
            {
                erroId: `${formElements.fields.email.id}Pattern`,
                errorMessage: "el correo electrónico no cumple con el formato correcto.",
                validationFunction: (value) => {
                    return /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(value);
                }
            }

        ]
    },

    {
        input: formElements.fields.birthDate,
        validations: [
            {
                erroId: `${formElements.fields.name.id}Required`,
                errorMessage: 'La fecha es obligatorio.',
                validationFunction: (Value) => {
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
        id: formElements.fields.id.value.trim() ? parseInt (formElements.fields.id.value.trim() ) : new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();
    hideIdAndChangeElementForNew()
}

export function setFormData(teacher) {
    const { id, name, description, email, birthDate } = teacher;
    formElements.fields.id.value = id;
    formElements.fields.name.value = name;
    formElements.fields.description.value = description;
    formElements.fields.email.value = email;
    formElements.fields.birthDate.value = birthDate;
    showIdAndChangeElementForEdit()
}

function showIdAndChangeElementForEdit() {
    formElements.containerId.classList.replace('d-none', 'd-block');
    formElements.buttons.btnSubmit.classList.replace('btn-success', 'btn-primary');
    formElements.buttons.btnSubmit.textContent = 'Modificar';
}

function hideIdAndChangeElementForNew() {
    formElements.containerId.classList.replace('d-block', 'd-none');
    formElements.buttons.btnSubmit.classList.replace('btn-primary', 'btn-success');
    formElements.buttons.btnSubmit.textContent = 'enviar';
}