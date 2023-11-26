
class Book {
    constructor(name , pages,status) {
        this.name = name; 
        this.pages = pages;
        this.status = status;
        this.info = function() {
                return ( `${name} ,${pages} pages, ${status}`);
        }
    }
}
class Set{
    constructor(){

        this.name = "the maze runner";
        this.set = function(){
            return "the maze runner";
        }
    }
}
const theHobbit = new Book ("The Hobbit by j.r.r Tolkien",295,"not read yet");
console.log(theHobbit.info()); 
console.log(theHobbit.valueOf());
const set = new Set();
Object.setPrototypeOf(Book.prototype,Set.prototype);
console.log( set.set());
