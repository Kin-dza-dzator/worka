/**
 * Created by tikhonov3 on 08.02.2017.
 */
//показать ошибку
function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    insertAfter(msgElem, container );
}
//убрать ошибку
function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
    }
}
//вставить элемент ПОСЛЕ элемента
function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
//проверяет форму, вернет false если некорректно чето введено
function isFormValid(form) {
    var elems = form.elements;
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

    resetError(elems.email.parentNode);
    if (!elems.email.value && !emailExp.test(elems.email.value)) {
        showError(elems.email, 'Error. Email is incorrect.');
        return false;
    }else{
        return true;
    }
}


$('#bodyElement form input[name=submit]').click(function(eventObject){
    var input = this;
    var form = input.form;
    //debugger;
    //по умолчанию сабмит кнопка скажет форме отправить запрос на сервер
    if(!isFormValid(form)) {
       //но если форма не валиднеа, то отменить действие по-умолчанию
        eventObject.preventDefault();
    }

});
