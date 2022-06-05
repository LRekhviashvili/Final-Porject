let navigation = document.getElementById('navbarlinks');
let toggleButton = document.getElementById('toggleBurger');
let topChild = document.getElementById('top-bar');
let middleChild = document.getElementById('middle-bar');
let bottomChild = document.getElementById('bottom-bar');

toggleButton.addEventListener('click', function() {
    navigation.classList.toggle('active');
    topChild.classList.toggle('top');
    middleChild.classList.toggle('middle');
    bottomChild.classList.toggle('bottom');
})
//accordion

let accordion = document.querySelectorAll('.container');

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active');
    })
}


// form
document.getElementById('mainForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let errors = {};
    let form = event.target;


    let companyTitle = document.getElementById('companyTitle').value;
    if(companyTitle.length>10 || companyTitle== ''){
        errors.companyTitle = 'Name can not be empty and cannot be more than 10 symbols';
    } 



    let companyDescription = document.getElementById('companyDescription').value;
    if(companyDescription.length>200 || companyDescription== ''){
        errors.companyDescription = 'Description can not be empty and cannot be more than 200 symbols';
    }

    

    let email = document.getElementById('email').value;
    if(email== ''){
        errors.email = 'Email is required';
    }


    let error = false;
    let checkBoxDiv = document.getElementById('checkboxDiv');
    checkBoxDiv.querySelectorAll('input[type="checkbox"]').forEach(element => {
        if(element.checked){
            error =true;
        }
    });
    if (error == false) {
        errors.quality = 'Please select'        
    }


    
    let socialMedia = false;

    form.querySelectorAll('[name="social"]').forEach(element => {
        if(element.checked){
            socialMedia =true;
        }
    });
        if(socialMedia == false){
            errors.social = 'Please select'
        }
        

    form.querySelectorAll('.error-text').forEach(item => {
        item.innerHTML = '';
    });

    let password = document.querySelector('[name="password"]').value;
    let password1 = document.querySelector('[name="password1"]').value;

    if (password!=='' && password!==password1){
        errors.password1 = 'Your Password do not match';
        errors.password = 'Your Password do not match';
    }
    if(password==''){
        errors.password1 = 'Password can not be empty';
        errors.password = 'Password can not be empty';
}
    for(let item in errors){
        let errorSpan = document.getElementById('error_' + item);
        if (errorSpan) {
            errorSpan.textContent = errors[item];
            
        }
    }

    if (Object.keys(errors).length == 0) {
        form.submit();
    }
});

// ვალიდაცია პაროლებზე
let passwordShow = document.getElementById('password');
let toggleIcon = document.getElementById('toggleIcon');

function showHidePassword() {
    if(passwordShow.type == "password"){
        passwordShow.setAttribute('type', 'text');
        toggleIcon.classList.add('fa-eye-slash');
    }else{
        passwordShow.setAttribute('type', 'password');
        toggleIcon.classList.remove('fa-eye-slash');
    }   
}

toggleIcon.addEventListener('click', showHidePassword);

// იმეილის ვალიდაცია

function validation() {
    let emailText = document.getElementById('email').value;
    let spanText = document.getElementById('error_email'); 
    let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailText.match(emailStructure)){
        spanText.innerHTML = 'Your email is valid';
        spanText.style.color = 'chartreuse';
    }else{
        spanText.innerHTML = 'Your email is not valid';
        spanText.style.color = 'red';
    }
}

// server
let currentPage = 1; 
let totalPages;

function getUsers(page) {
let request = new XMLHttpRequest();
 request.addEventListener ("load", render);
 request.addEventListener ("error", serverError);
 console.log (this.responseText);

 request.open("GET", 'https://reqres.in/api/users?page=' + page);
 request.send();

function render (){

    let fragment = document.createDocumentFragment();

    let response = this.responseText;
    let responseData = JSON.parse(response);

        responseData.data.forEach(element => {
        let li = document.createElement ("li");
        li.classList.add('li-item');

        let emailUser = document.createElement('p');
        emailUser.textContent = element.email;

        let imgUser = document.createElement('img');
        imgUser.src = element.avatar;
        imgUser.classList.add('li-image');

        li.appendChild(imgUser);
        li.appendChild(emailUser);


        fragment.appendChild(li);
    });

    document.getElementById('ul-list').innerHTML = ' ';
    document.getElementById('ul-list').appendChild (fragment);

    totalPages = responseData.total_pages; 
}

function serverError (){
    let newP = document.createElement ("p");
    newP.textContent = "Server Error"; 
    document.getElementById ("api-user-email").appendChild (newP);
}
}

document.getElementById ("Nextpage").addEventListener ("click", function(){
    if(currentPage == totalPages){
        return; 
    }
    currentPage+=1; 
    getUsers(currentPage);

})

document.getElementById ("Previouspage").addEventListener ("click", function(){
    if(currentPage==1){
        return;
    }
    currentPage-=1; 
    getUsers(currentPage);

})
getUsers(currentPage);

// slider

let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let linesList = document.getElementsByClassName('line');

let data=[
    {
        id:1,
        img: 'Images/Kakhi.jpg',
    },
    {
        id:2,
        img:'Images/1-20.jpg',
    },
    {
        id:3,
        img:'Images/zurikela1.jpg',
    },
    
];

let indexElement = 0;

function createDiv(item){
    sliderContent.style.backgroundImage = 'url('+ item.img +')';
    sliderContent.classList.add('imgdiv');
}

function createDots(){
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach( (element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id-1);

        dot.onclick = function(event) {
            let id = event.target.getAttribute('data-id');
            indexElement = id;
            slider();
        }
        dots.appendChild(dot);
    })

    return dots;
}
function slider(){
    sliderContent.innerHTML='';
    createDiv(data[indexElement]);
    let dots = createDots();
    sliderContent.appendChild(dots);
    currentDot();

}
function currentDot(){
    dotsList[indexElement].classList.add('active');
}

arrowLeft.addEventListener('click',clickLeftArrow);
arrowRight.addEventListener('click',clickRightArrow);

function clickLeftArrow(){
    if(indexElement<=0){
        indexElement=data.length-1;
        slider();
        return
    }
    indexElement--;
    slider();
}
function clickRightArrow(){
    if(indexElement>=data.length-1){
        indexElement=0;
        slider();
        return
    }
    indexElement++;
    slider();
}
setInterval(()=>{
    clickRightArrow();
},4000);

slider();