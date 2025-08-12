const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return`${this.title} by ${this.author}, ${pages} pages,
               ${(this.read ? 'read' : 'not read yet')}`;
    }
}

Book.prototype.info = function(){
    return`${this.title} by ${this.author}, ${pages} pages,
           ${(this.read ? 'read' : 'not read yet')}`;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary('Head First Java', 'Kathy Sierra  &  Bert Bates', 688, true);
addBookToLibrary('Clean Code', 'Robert Martin', 464, false);
addBookToLibrary('Java All-in-One For Dummies', 'Doug Lowe ', 912, false);


function displayBooks(){

    const library = document.querySelector('.library');
    for(let item of myLibrary){
        const book = document.createElement('div');
        book.classList.add('book');
        
        const title = document.createElement('h2');
        title.textContent = item.title;
        book.appendChild(title);

        const bookInfo = document.createElement('ul');
        bookInfo.classList.add('book-info');
        for(let prop in item){
            if(prop === 'author' || prop === 'pages' || prop === 'read'){
                let li = document.createElement('li');
                let span = document.createElement('span');
                span.textContent = prop + ': '
                li.appendChild(span);
                if(prop === 'read'){   
                    let text = document.createTextNode((item.status?'read':'not read yet'));
                    li.appendChild(text); 
                }else{
                    let text = document.createTextNode(item[prop]);
                    li.appendChild(text); 
                }
                bookInfo.appendChild(li);
            }
        }   

        book.appendChild(bookInfo);
        library.appendChild(book);
    }
}

displayBooks()