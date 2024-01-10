const signUp = document.getElementById('signUp')
const signIn = document.getElementById('signIn')

const nameInp = document.getElementById('nameInp')
const emailInp = document.getElementById('emailInp')
const passInp = document.getElementById('passInp')

const clickedUp = document.querySelector('.clickedUp') 

const alertName = document.querySelector('.alertName')
const alertMail = document.querySelector('.alertMail')
const alertPass = document.querySelector('.alertPass')

const exist = document.getElementById('exist')

const loginBtn = document.getElementById('loginBtn')
const loginMail = document.getElementById('loginMail')
const loginPass = document.getElementById('loginPass')

const alertText = document.getElementById('alert')

const welcome = document.getElementById('welcome')


const logout = document.getElementById('logout')

if (signUp){
    signUp.addEventListener('click', function(){
        window.location.href = 'signup.html'
    })
}

if(signIn){
    signIn.addEventListener('click', function(){
        window.location.href = 'index.html'
    })
}

if(clickedUp){
    clickedUp.addEventListener('click', getData)
}

if(emailInp){
    emailInp.addEventListener('keyup', validationMail)
}

if(nameInp){
    nameInp.addEventListener('keyup', validationName)
}

if(passInp){
    passInp.addEventListener('keyup', validationPass)
}

if(loginBtn){
    loginBtn.addEventListener('click', login)
}

if(logout){
    logout.addEventListener('click',function(){
        localStorage.removeItem('userName')
        window.location.href = 'index.html'
    })
}


let usersInfo = [] 
if(localStorage.getItem('users') != null){
    usersInfo = JSON.parse(localStorage.getItem('users'))
}


function getData(){
    if (validationName() && validationMail() && validationPass() && isExist() == false){
       
            let user = {
                name: nameInp.value, 
                mail: emailInp.value, 
                password: passInp.value
            }
            
            usersInfo.push(user)
            
            localStorage.setItem('users', JSON.stringify(usersInfo))
            clear()
            Swal.fire({
                title: "Done!",
                icon: "success"
              });
        
        
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
           
          });
    }
    
}

function clear(){
    nameInp.value = ''; 
    emailInp.value = ''; 
    passInp.value = '';
}

function validationMail(){
    let regexMail = /^[A-Za-z\._\-0-9]*[@][a-z]*[\.][a-z]{3}$/
    
    if(regexMail.test(emailInp.value)){
        alertMail.innerHTML='' 
        return true
    }
    else{
        alertMail.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> please enter a valid email'
        return false
    }
}

function validationName(){
    let regexName = /^[A-za-z]{3,}$/; 
    if (regexName.test(nameInp.value)){
        alertName.innerHTML = ''
        return true 
    }
    else{
        alertName.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> name must be at least 3 characters' 
    }
}

function validationPass(){
    if (passInp.value.length >= 4){
        alertPass.innerHTML = ''
        return true
    }
    else{
        alertPass.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> minimum 4 characters'
    }
}


function isExist(){
    for(let i = 0; i < usersInfo.length; i++){
        if(usersInfo[i].mail === emailInp.value){
            exist.innerHTML='Email is already taken'
            return true 
        }
        
    }
    exist.innerHTML=''
    return false 
}


function login(){
    if(loginMail.value =='' || loginPass.value == ''){
        alertText.innerHTML = 'All inputs are required'
    }
    else{
        alertText.innerHTML = ''    
        for(let i = 0; i < usersInfo.length; i++){
            if(usersInfo[i].mail === loginMail.value && usersInfo[i].password === loginPass.value){
                localStorage.setItem('userName',usersInfo[i].name)
                location.href = 'welcome.html' 
            }
            else{
                alertText.innerHTML='Incorrect email or password'
            }
           
        } 
    }
    
}

if(welcome){
    welcome.innerHTML=`Welcome ${localStorage.getItem('userName')}`
}