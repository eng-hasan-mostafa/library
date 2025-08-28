const myLibrary = [];

class Book{
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){
        return`${this.title} by ${this.author}, ${pages} pages,
               ${(this.read ? 'read' : 'not read yet')}`;
    }

    changeStatus(){
        this.read = !this.read;
    }
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
    library.textContent = '';
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
                    span.textContent = 'status: ' 
                    let text = document.createTextNode((item.read?'read':'not read yet'));
                    li.appendChild(text); 
                }else{
                    let text = document.createTextNode(item[prop]);
                    li.appendChild(text); 
                }
                bookInfo.appendChild(li);
            }
        }   

        book.appendChild(bookInfo);
        const div = document.createElement('div');
        div.classList.add('buttons');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.dataset.id = item.id;
        removeBtn.addEventListener('click',(e)=> {
            myLibrary.splice(myLibrary.indexOf(item), 1);
            displayBooks();
        }); 
        div.appendChild(removeBtn);

        const changeStatusBtn = document.createElement('button');
        changeStatusBtn.textContent = 'change status';
        changeStatusBtn.classList.add('change-status-btn');
        changeStatusBtn.dataset.id = item.id;
        changeStatusBtn.addEventListener('click',(e)=> {
            item.changeStatus();
            displayBooks();
        }); 
        div.appendChild(changeStatusBtn);

        book.appendChild(div);
        library.appendChild(book);
    }
}

displayBooks();

// dialog logic
const dialog = document.querySelector('dialog');
//show dialog btn
const showBtn = document.querySelector('.show-btn');
showBtn.addEventListener('click', (e)=>{
    dialog.showModal()
});

//close dialog btn
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', (e)=>{
    dialog.close();
});

// add book btn
const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");

const addBtn = document.querySelector('.submit-btn');
addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const statusInput = document.querySelector("input[name='status']:checked"); 
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, (statusInput.value === 'true'));
    dialog.close();
    displayBooks();
});
