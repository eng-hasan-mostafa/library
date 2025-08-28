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

const library = (function(){
    const libraryContent = [];

    const addBookToLibrary = (title, author, pages, read) =>{
        let book = new Book(title, author, pages, read);
        libraryContent.push(book);
    }

    const getLibraryContent = () => libraryContent;
    
    return {addBookToLibrary, getLibraryContent};
})();

const displayController = (function(){

    const start = ()=>{
        displayBooks();
        configureAddBookDialog();
    }

    const displayBooks = () =>{
        const libraryContainer = document.querySelector('.library');
        libraryContainer.textContent = '';
        const libraryContent = library.getLibraryContent();
        for(let item of libraryContent){
            const book = document.createElement('div');
            book.classList.add('book');
            
            const title = document.createElement('h2');
            title.textContent = item.title;
            book.appendChild(title);
    
            const bookInfo = createBookInfoList(item);
            book.appendChild(bookInfo);

            const buttons = createBookButtons(item, libraryContent);
            book.appendChild(buttons);

            libraryContainer.appendChild(book);
        }
    }

    const createBookInfoList = (book)=>{
        const bookInfo = document.createElement('ul');
        bookInfo.classList.add('book-info');
        for(let prop in book){
            if(prop === 'author' || prop === 'pages' || prop === 'read'){
                let li = document.createElement('li');
                let span = document.createElement('span');
                span.textContent = prop + ': '
                li.appendChild(span);
                if(prop === 'read'){  
                    span.textContent = 'status: ' 
                    let text = document.createTextNode((book.read?'read':'not read yet'));
                    li.appendChild(text); 
                }else{
                    let text = document.createTextNode(book[prop]);
                    li.appendChild(text); 
                }
                bookInfo.appendChild(li);
            }
        }  
        return bookInfo;
    }

    const createBookButtons = (book, libraryContent)=>{
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.dataset.id = book.id;
        removeBtn.addEventListener('click',(e)=> {
            libraryContent.splice(libraryContent.indexOf(book), 1);
            displayBooks();
        }); 
        buttonsContainer.appendChild(removeBtn);

        const changeStatusBtn = document.createElement('button');
        changeStatusBtn.textContent = 'change status';
        changeStatusBtn.classList.add('change-status-btn');
        changeStatusBtn.dataset.id = book.id;
        changeStatusBtn.addEventListener('click',(e)=> {
            book.changeStatus();
            displayBooks();
        }); 
        buttonsContainer.appendChild(changeStatusBtn);

        return buttonsContainer;
    };

    const configureAddBookDialog = ()=>{
        const dialog = document.querySelector('dialog');
        const showBtn = document.querySelector('.show-btn');
        showBtn.addEventListener('click', (e)=>{
            dialog.showModal()
        });

        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', (e)=>{
            dialog.close();
        });

        const addBtn = document.querySelector('.submit-btn');
        addBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            const titleInput = document.querySelector("input[name='title']");
            const authorInput = document.querySelector("input[name='author']");
            const pagesInput = document.querySelector("input[name='pages']");
            const statusInput = document.querySelector("input[name='status']:checked"); 
            library.addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, (statusInput.value === 'true'));
            dialog.close();
            displayBooks();
        });
    }

    return {start};
})();

library.addBookToLibrary('Head First Java', 'Kathy Sierra  &  Bert Bates', 688, true);
library.addBookToLibrary('Clean Code', 'Robert Martin', 464, false);
library.addBookToLibrary('Java All-in-One For Dummies', 'Doug Lowe ', 912, false);

displayController.start();

