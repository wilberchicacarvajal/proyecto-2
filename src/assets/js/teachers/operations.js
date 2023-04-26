// encargado de toda la interacción de js con html
// Third libraries
import alertify from 'alertifyjs';

//own libraries
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields } from './../utils/validation';
import { createEmptyRow, createActionButton } from './../utils/table';

//Module libraries
import { formElements, fieldsConfigurations, getFormData, resetForm } from './form';
import { createTeacher, readTeachers } from './repository';

export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listeFormFIeldsChangeEvent();
        listenFormResetEvent();  //felipe
    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();
        if (validateForm(fieldsConfigurations)) {
            createTeacher(getFormData());
            resetForm();
            removeErrorClassNameFields('is-valid');
            alertify.success('profesor guardado correctamente');
            listTeachers();
        } else {
            alertify.error('verificar los datos del formulario');
        }

    });
}

function listTeachers() { // esto es para listar a los profesores
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';
    if (arrayTeachers.length > 0) {


        arrayTeachers.forEach((teacher, index) => {  //foreach me retorna o recorre cada posición del objeto y su posición

            const { id, name, description, email, birthDate } = teacher; // esto se llama desestructuración permite desempacar valores o arreglos o propiedades de objetos de distintas variables


            // creo la fila 
            const row = document.createElement('tr');
            row.classList.add('align-middle');

            // creo las columnas 
            const colId = document.createElement('td');
            colId.textContent = id;
            colId.classList.add('text-center');

            const colName = document.createElement('td');
            colName.textContent = name;

            const colDescription = document.createElement('td');
            colDescription.textContent = description;

            const colEmail = document.createElement('td');
            colEmail.textContent = email;

            const colBirthDate = document.createElement('td');
            colBirthDate.textContent = birthDate;

            const colButtons = document.createElement('td');
            colButtons.classList.add('text-center');

            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
            editButton.dataset.id = id;
            editButton.setAttribute('title', 'Editar');
            editButton.setAttribute('type', 'button')

            const editIcon = document.createElement('em');
            editIcon.classList.add('fa', 'fa-pencil');
            editButton.appendChild(editIcon);

            colButtons.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
            deleteButton.dataset.id = id;
            deleteButton.setAttribute('title', 'Eliminar');
            deleteButton.setAttribute('type', 'button');

            const deleteIcon = document.createElement('em');
            deleteIcon.classList.add('fa', 'fa-trash',);
            deleteButton.appendChild(deleteIcon);

            colButtons.appendChild(deleteButton);


            //agrego las columnas a la fila
            row.appendChild(colId);
            row.appendChild(colName);
            row.appendChild(colDescription);
            row.appendChild(colEmail);
            row.appendChild(colBirthDate);
            row.appendChild(colButtons);

            //agrego la fila al tbody
            tbody.appendChild(row);

        });

    } else {
        const rowEmpty = document.createElement('tr');
        const colEmpty = document.createElement('td');
        colEmpty.setAttribute('colspan', '6');
        colEmpty.textContent = "no se encuentran registros disponibles";
        colEmpty.classList.add('text-center');
        rowEmpty.appendChild(colEmpty);

        tbody.appendChild(rowEmpty);
    }

}

function listeFormFIeldsChangeEvent() {
    fieldsConfigurations.forEach(({ input, validations }) => {
        input.addEventListener('change', () => {
            removeInputErrorMessage(input);
            validations.forEach((validationConfig) => {
                validateField(input, validationConfig);
            })
        })
    });
}

function listenFormResetEvent(){ //felipe
    formElements.form.addEventListener('reset', () => {
        removeErrorMessage();
        removeErrorClassNameFields();
        resetForm();
        alertify.dismissAll();
    });
}