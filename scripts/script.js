const validateForm = () => {
    
    const lastName = document.getElementById('txtLastName');
    const firstName = document.getElementById('txtFirstName');
    const email = document.getElementById('email');
    const comment = document.getElementById('txtMessage');
    
    const lastNameValue = lastName.value.trim();
    const firstNameValue = firstName.value.trim();
    const emailValue = email.value.trim();
    const commentValue = comment.value.trim();

    let noError = true;

    if (lastNameValue === '') {
        setError(lastName, "Nom de famille ne peut être vide");
        noError = false;
    } else {
        setSuccess(lastName);
    }

    if (firstNameValue === '') {
        setError(firstName, "Prénom ne peut être vide");
        noError = false;
    } else {
        setSuccess(firstName);
    }

    if (emailValue === '') {
        setError(email, 'Courriel ne peut être vide');
        noError = false;
    } else if (!validateEmail(emailValue)) {
        setError(email, 'Format de courriel incorrect');
        noError = false;
    } else {
        setSuccess(email);
    }

    if (commentValue === '') {
        setError(comment, "Le message ne peut être vide");
        noError = false;
    } else {
        setSuccess(comment);
    }

    return noError;
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}