class Book {
    constructor(name , pages , read=false,id){
        this.id =id;
        this.name = name;
        this.pages = pages;
        this.read = read;
    }
}
const body = document.querySelector('body');
const libary = localStorage.getItem('libary') ===null? [] : JSON.parse(localStorage.getItem('libary'));
const ulParent = document.querySelector("#main-content");
// const ulParent =  document.createElement('div');
//  ulParent.setAttribute('id','ulParent');
ulParent.classList.add('ulParent');
// localStorage.getItem('ulParent') ===null? "" : ulParent.innerHTML = localStorage.getItem('ulParent') ;
//ulParent.innerHTML = localStorage.getItem('ulParent');

let counter = localStorage.getItem('counter') ===null? 1 : parseInt(localStorage.getItem('counter'));
counter = (libary.length == 0? 1 :counter);
function addBookToLibrary(name,pages,read) {

    libary.push(new Book(name, pages, read,counter));
    counter++;
    
    displayBooks();
}
function displayBooks(){
    console.log('counter', counter);
    libary.forEach(book =>console.log(book));
    ulParent.innerHTML=(" ");
    for(let book of libary){
        ulParent.append(createCard(book.name,book.pages,book.read,book.id));
        // ulContianer.append(ulParent);
    }
    console.log(ulParent);
    
    
    saveTheLibary(libary,counter);
    saveTheUlParentState(ulParent.outerHTML);
}

function createCard(name , pages, read,id ){
    let content = ['Title: ','Pages: ',' Read? ']
    let div = document.createElement('div');
    div.setAttribute("class","cards");
    div.setAttribute("id",`card-${id}`);
    // let rightContainer = document.createElement('div');
    for(let item of content){
        div.append(cardLabels(item));
    }
    let nameBox = document.createElement('span');
    nameBox.innerText = name;
    nameBox.style.gridRow = '1';
    nameBox.setAttribute('class','rightDiv');
    let numberBox = document.createElement('span');
    numberBox.setAttribute('class','rightDiv');
    numberBox.style.gridRow = '2';
    numberBox.innerText = pages;
    let readStatusCheckBox = document.createElement('input');
    readStatusCheckBox.style.gridRow = '3'
    readStatusCheckBox.setAttribute('class','rightDiv');
    readStatusCheckBox.type = 'checkbox';
    readStatusCheckBox.checked = read;
    let removeButton = document.createElement('button');
    removeButton.setAttribute('class','rightDiv');
    removeButton.setAttribute('id','remove');

    removeButton.textContent = "remove";
    removeButton.addEventListener('click',function (event){
        console.log(event.target.parentNode.id.replace('card-',""));
        // console.log(event.id);
        let index = libary.findIndex(book => book.id == event.target.parentNode.id.replace('card-',""))
        if(index !== -1){
            event.target.parentNode.remove();
            libary.splice(index,1);
            console.log(libary)
            displayBooks();

        }
        // if(event.id === "remove"){
        //     ulParent.remove(event.id);

        //     console.log('did it work ?')
        // }
    });
    div.append(nameBox,numberBox,readStatusCheckBox,removeButton);
    // .append(rightDiv,leftDiv);
    return div;
}

function openModal(){
    let modal = document.createElement("div");
    modal.setAttribute('class','modal');
    modal.innerHTML=`
    <form id= AddBookForm>
        <button type="button" id="close-modal" onClick="closeModal(event)">X</button>
        <h1>Add A Book</h1>
        <input name="title" id="name" type="text" placeholder="Book Title" autocomplete="off" required></input>
        <input name= "pages" id="pages" type="number" placeholder="Book Pages" autocomplete="off" required>
        <label for ="checkbox">Read ?</label>
        <input name="checkbox" id="checkbox" type="checkbox" autocomplete="off">
        <button >Submit</button>
    </form>
    `;
    body.append(modal);
    modal.style.display= "block";
        modal.addEventListener('click', function(event){
            if(event.target === modal){
                closeModal();
            }
        })
    let form = modal.querySelector("#AddBookForm");
        form.addEventListener('submit', submitForm);
           
}
function closeModal(event){
     document.querySelector(".modal").remove();
    
    console.log("should close")
} 
function submitForm(event){
        event.preventDefault();
        console.log(event);
        // event.preventDefault();
        let formData = new FormData(event.target);
        console.log(event.target);
        console.log(formData);
        let name = formData.get('title');
        let number = formData.get("pages");
        let checkbox= formData.get("checkbox");
        console.log(`${name} ${number} ${checkbox}`);
        addBookToLibrary(name,number,checkbox);

}
function saveTheLibary(libary,counter){
    localStorage.setItem("libary", JSON.stringify(libary) );
    localStorage.setItem("counter", counter);
}
function saveTheUlParentState(ulParent){
    localStorage.setItem("ulParent",ulParent);
}
function cardLabels(value){
    let item =  document.createElement('span')
    item.setAttribute('class','leftDiv');
    item.textContent = value;
    return item;
}
function onPageReload(){
    displayBooks();
}
onPageReload();