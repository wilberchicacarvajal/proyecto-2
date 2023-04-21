// encargado de toda la interacción de js con html
import { formElements, getFormData } from './form';
import { createTeacher, readTeachers} from './repository';

export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
        listTeachers();
    });
}

function listTeachers() { // esto es para listar a los profesores
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';

    arrayTeachers.forEach( (teacher, index) => {  //foreach me retorna o recorre cada posición del objeto y su posición

        const {name, description, email, birthDate} = teacher; // esto se llama desestructuración permite desempacar valores o arreglos o propiedades de objetos de distintas variables
        

        // creo la fila 
        const row = document.createElement('tr');
        row.classList.add('align-middle');

        // creo las columnas 
        const colId = document.createElement('td');
        colId.textContent = index;
        colId.classList.add('text-center');

        const colName = document.createElement('td');
        colName.textContent = name;

        const colDescription = document.createElement('td');
        colDescription.textContent= description;

        const colEmail = document.createElement('td');
        colEmail.textContent = email;

        const colBirthDate = document.createElement('td');
        colBirthDate.textContent = birthDate;

        const colButtons = document.createElement('td');
        colButtons.classList.add('text-center');

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
        editButton.dataset.id = index;
        editButton.setAttribute('title', 'Editar');
        editButton.setAttribute('type', 'button')

        const editIcon = document.createElement('em');
        editIcon.classList.add('fa', 'fa-pencil');
        editButton.appendChild(editIcon);

        colButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
        deleteButton.dataset.id = index;
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
}