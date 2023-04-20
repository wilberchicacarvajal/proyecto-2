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
        // creo la fila 
        const row = document.createElement('tr');

        // creo las columnas
        const colId = document.createElement('td');
        colId.textContent = index;

        const colName = document.createElement('td');
        colName.textContent = teacher.name;

        const colDescription = document.createElement('td');
        colDescription.textContent= teacher.description;

        const colEmail = document.createElement('td');
        colEmail.textContent = teacher.email;

        const colBirthDate = document.createElement('td');
        colBirthDate.textContent = teacher.birthDate;

        const colButtons = document.createElement('td');
        

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