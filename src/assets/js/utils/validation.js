// utilidad para realizar validación js

export function validateForm(fieldConfigurations) {
    let isValid = true;

    fieldConfigurations.forEach((fieldConfig) => {

        fieldConfig.validations.forEach((validationConfig) => {

            const currentFieldIsValid = validateField(fieldConfig.input, validationConfig);
            isValid = isValid && currentFieldIsValid;

        });

    });

    return isValid;

}


function validateField(input, validationConfig) {
    const { errorId, errorMessage, validationFunction } = validationConfig;
    const fieldIsValid = validationFunction(input.value);
    if (!fieldIsValid) {
        input.classList.add('is-invalid');
        const errorMessageElement = createErrorMEssageElement(errorId, errorMessage);
        input.insertAdjacentElement('afterend', errorMessageElement);
    } else {
            input.classList.add('is-valid');
        }
        return fieldIsValid;
    }


/**
 * crea un elemento de mensaje de error para ser insertado después de que un campo no es valido
 * @private
 * @param {string} errorId - El ID del elemento de mensaje de error
 * @param {string} errorMessage - El mensaje de error que se muestra al usuario
 * @returns {HTMLDivElement} - Retorna el elemento que contiene el mensaje de error
 */
function createErrorMEssageElement(errorId, errorMessage) {

    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('invalid-feedback');
    errorMessageElement.setAttribute('id', errorId);
    errorMessageElement.textContent = errorMessage;
    return errorMessageElement;

}

function removeErrorMessageElements() {

}

function removeInputErrorMessage(input) {

}