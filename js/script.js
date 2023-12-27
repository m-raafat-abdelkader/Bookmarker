var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var submitBtn = document.querySelector('.box button'); 
var nameAlert = document.querySelector('.nameAlert');
var siteAlert = document.querySelector('.siteAlert');

submitBtn.addEventListener('click',createData)
siteName.addEventListener('input', validationName)
siteUrl.addEventListener('input', function(){
    isValidUrl(siteUrl.value)
})

var myList = [];
if (localStorage.getItem('list') != null){
    myList = JSON.parse(localStorage.getItem('list'))
    display();
}

function createData(){
    if (validationName() && isValidUrl(siteUrl.value)){
        var site = {
            name: siteName.value, 
            url: siteUrl.value
        };
        clearInput();
        myList.push(site);
        localStorage.setItem('list',JSON.stringify(myList))
        display(); 
    }

    
}



function clearInput(){
    siteName.value = "";
    siteUrl.value = "";
}



function display(){
    var box = ""; 
    for(var i = 0; i < myList.length; i++){
        box+= `
        <tr>
        <td>${i+1}</td>
        <td>${myList[i].name}</td>
            <td>
                <button class="btn btn-warning">
                <i class="fa-solid fa-eye pe-2"></i><a target="_blank" href="${myList[i].url}">Visit</a></button>
            </td>
            <td>
                <button onclick = "deleteItem(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
            </td>
        </tr>
        
        `
    }
   document.querySelector('.tableBody').innerHTML = box;
}



function deleteItem(index){
    myList.splice(index, 1); 
    display();
    localStorage.setItem('list', JSON.stringify(myList))
}

function validationName(){
    var regexName = /^[A-Za-z]{3,}$/; 
    if (regexName.test(siteName.value)){
        nameAlert.innerHTML = ''
        return true;
    }
    else{
        nameAlert.innerHTML = 'Site name must contain at least 3 characters'
        return false;
    }
}

function isValidUrl(yourUrl){
    try{
        const newUrl = new URL(yourUrl); 
        siteAlert.innerHTML = ''
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    }
    catch(err){
        siteAlert.innerHTML = 'please enter a valid URL starts with http or https'
        return false
    }
}

