class Book {
    constructor(name , pages , read=false){
        this.name = name;
        this.pages = pages;
        this.read = read;
    }
}

const libary = [];
const ulParent = document.querySelector("#ulParent");
const body = document.querySelector('body');
function addBookToLibrary(name,pages,read) {
    libary.push(new Book(name, pages, read));
    console.log(libary.toString());
    displayBooks();
}
function displayBooks(){
    for(let book of libary){
        console.log(book.name);
        ulParent.append(createCard(book.name,book.pages,book.read));
    }
}

function createCard(name , pages, read ){
    let counter = 0;
    let div = document.createElement('div');
    div.setAttribute("class","cards");
    div.setAttribute("id",`card-${counter}`);
    let nameBox = document.createElement('span');
    nameBox.innerText = name;
    let numberBox = document.createElement('span');
    numberBox.innerText = pages;
    let readStatusCheckBox = document.createElement('input');
    readStatusCheckBox.type='checkbox';
    readStatusCheckBox.checked = read;
    let removeButton = document.createElement('button');
    div.append(nameBox,numberBox,readStatusCheckBox,removeButton);
    counter ++;
    return div;
}

function openModal(){
    let modal = document.createElement("div");
    modal.setAttribute('class','modal');
    modal.innerHTML=`
    <form id= AddBookForm>
         <h1>Add Book</h1>
         // <label for=text> Book Title </label>
        <input id="name" type="text"  placeholder="Book Title"></input>
        <input id="number" type="number" placeholder="Book Pages">
        <label for="checkbox">Read the book ?</label>
        <input id="checkbox" type="checkbox" checked="false" >
        <button>Submit</button>
    </form>
    `;
    body.append(modal);
    modal.style.display= "block";
     
    document.getElementById('#AddBookForm').addEventListener('submit',(event)=>{
        event.preventDefault();
        let name = document.getElementById("#name").value;
        let number = document.getElementById("#number").value;
        let checkbox= document.getElementById("#name").checked;
        addBookToLibrary(name,number,checkbox);
    })
}