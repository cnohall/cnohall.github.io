const red = 'rgb(189, 87, 87';
const originalColor = 'rgb(87, 189, 130)';

function animatedForm(){
    const arrows = document.querySelectorAll('.fa-arrow-down');

    arrows.forEach(arrow => {
        arrow.addEventListener('click', () =>{
            const input = arrow.previousElementSibling;
            const parent = arrow.parentElement;
            const nextForm = parent.nextElementSibling;
        
            if (input.type === "text" && validateUser(input)){
                nextSlide(parent, nextForm);
            } else if (input.type ==="email" && validateEmail(input)){
                nextSlide(parent, nextForm);
            } else if (input.type ==="password" && validateUser(input)){
                nextSlide(parent, nextForm);
            } else {
                parent.style.animation = "shake 0.5s ease";
            }
            parent.addEventListener('animationend', () => {
                parent.style.animation = '';
            })
        });
    });
}

function validateUser(user){
    if(user.value.length < 6){
        changeBackgroundColor(red);
    } else{
        changeBackgroundColor(originalColor);
        return true;
    }
}

function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value).toLowerCase())){
        changeBackgroundColor(originalColor);
        return true;
    } else {
        changeBackgroundColor(red);
    }

}

function nextSlide(parent, nextForm){
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
}

function changeBackgroundColor(color){
    document.body.style.backgroundColor = color;
}

animatedForm();