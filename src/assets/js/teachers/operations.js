// encargado de toda la interacción de js con html
// Third libraries
import alertify from 'alertifyjs';
import Swal from 'sweetalert2';

//own libraries
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements } from './../utils/validation';
import { createEmptyRow, createActionButton } from './../utils/table';

//Module libraries
import { formElements, fieldsConfigurations, getFormData, resetForm, setFormData } from './form';
import { createTeacher, readTeachers, findTeacherById } from './repository';

export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listeFormFIeldsChangeEvent();
        listenFormResetEvent();
        listenTableClickEvent();
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

            const editButton = createActionButton({
                buttonClass: 'btn-primary',
                buttonClassIdentifier: 'btn-edit',
                title: 'Editar',
                icon: 'fa-pencil',
                dataId: id
            });
            colButtons.appendChild(editButton);

            const deleteButton = createActionButton({
                buttonClass: 'btn-danger',
                buttonClassIdentifier: 'btn-delete',
                title: 'Eliminar',
                icon: 'fa-trash',
                dataId: id
            });
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

function listenFormResetEvent() {
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorClassNameFields('is-valid');
        resetForm();
        alertify.dismissAll();
    });
}

function listenTableClickEvent() {
    const table = document.getElementById('tblTeachers');
    table.addEventListener('click', ({ target }) => {
        const idTeacher = target.getAttribute('data-id');
        if (target.classList.contains('btn-edit') || target.classList.contains('fa-pencil')) {
            editTeacher(idTeacher);
        } else if (target.classList.contains('btn-delete') || target.classList.contains('fa-trash')) {
            Swal.fire({
                title: '¿Estas seguro de que quieres eliminar el profesor: ?',
                text: 'No podrás deshacer esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#b2b2b2',
                confirmButtonText: 'si, Eliminar',
                cancelButtonText: 'Cerrar'
            }).then((resultConfirm) => {
                if (resultConfirm.isConfirmed) {
                    console.log('confirmar que elimina');
                } else {
                    alertify.dismissAll();
                    alertify.message('Acción cancelada');
                }
            });
        }
    });
}

function editTeacher(idTeacher) {
    const teacher = findTeacherById(idTeacher);
    if (teacher) {
        setFormData(teacher);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        alertify.error('profesor que seleccionaste no existe, verifique la información')
    }
}