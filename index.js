var myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function () {
    return this.title + " " + this.author + " " + this.pages + " " + this.read;
};

Book.prototype.readSwitch = function () {
    if (this.read == 1) this.read = 0;
    else this.read = 1;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    localStorage.setItem("list", JSON.stringify(myLibrary));
}

function changeReadStatus(i) {
    myLibrary[i].readSwitch();
    listBooks();
}

const Book1 = new Book("Hobbit", "Tolkien", 200, 1);
const Book2 = new Book("Harry Potter", "Rowlings", 1220, 0);
const Book3 = new Book("1984", "Orwell", 122, 1);
addBookToLibrary(Book1);
addBookToLibrary(Book2);
addBookToLibrary(Book3);
if (localStorage.length == 0) localStorage("list", JSON.stringify(myLibrary));

function listBooks() {
    myLibrary = localStorage.getItem("list");
    console.log("Lib:" + JSON.parse(myLibrary));
    html = " ";
    for (i = 0; i < myLibrary.length; i++)
        html += `<div class="card"<p> 
            ${myLibrary[i].info()} 
            </p><button onclick="deleteBook(${i})">Delete</button> <button onclick="changeReadStatus(${i})">Read</button></div>`;
    document.getElementById("main").innerHTML = html;
}

window.onload = function () {
    localStorage.setItem("list", JSON.stringify(myLibrary));
    console.log("LocalStorage: " + localStorage.getItem("list"));
    listBooks();
};

function deleteBook(i) {
    myLibrary.splice(i, 1);
    // myLibrary = newLib;
    console.log(myLibrary);
    listBooks();
}

function showAddNewBook() {
    document.getElementById("form").style.display = "block";
}

function addNewBook() {
    const newBook = new Book(
        document.getElementById("name").innerText,
        document.getElementById("author").innerText,
        document.getElementById("price").innerText,
        document.getElementById("count").innerText
    );
    addBookToLibrary(newBook);
    listBooks();
    document.getElementById("form").style.display = "none";
}
