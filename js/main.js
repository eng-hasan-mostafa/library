const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target) {
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
