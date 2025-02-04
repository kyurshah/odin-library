console.log("this is working")

const libraryTable = document.querySelector('#table');
const addBook = document.querySelector("#addBook");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector("[data-modal]")

const addNewBook = document.querySelector("#addNewBook")
const addTitle = document.querySelector("#addTitle")
const addAuthor = document.querySelector("#addAuthor")
const addPages = document.querySelector("#addPages")
const addBookButton = document.querySelector("#addBookButton")

const myLibrary = []
let headers = ['Title', 'Author', 'Pages', 'Status', 'Action'];

function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


function addToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);

    myLibrary.push(newBook);
    
}

addToLibrary("The Count of Monte Cristo", " Dumas, Alexandre", 390, "read");
addToLibrary("Dune Messiah (Dune #2)", " Herbert, Frank", 390, "not read");
addToLibrary("Heidi", "Spyri, Johanna", 390, "not read");
addToLibrary("We Also Make Policy", " Garg, Subhash Chandra", 390, "not read");

function generateTable() {
    libraryTable.innerHTML = "";

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);  
        headerRow.appendChild(header);
    });



    table.appendChild(headerRow);

    myLibrary.forEach(library => {
        let row = document.createElement('tr');

        Object.values(library).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);  
            row.appendChild(cell);   
        })

        const tableAction = document.createElement("td");

        const tableRead = document.createElement("button");
        tableRead.setAttribute("id", "tableRead");
        tableRead.textContent = "Read";

        tableRead.addEventListener("click", () => {
            library.readStatus = (library.readStatus === "not read") ? "read" : "not read";
            generateTable();
        })

        row.appendChild(tableRead)

        const tableDelete = document.createElement("button");
        tableDelete.setAttribute("id", "tableDelete");
        tableDelete.textContent = "Delete";

        tableDelete.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(library), 1);
            generateTable();
        })
        
        row.appendChild(tableDelete);
    
        table.appendChild(row);
    })
    
    
    libraryTable.appendChild(table);
  }




addBook.addEventListener("click", () => {
    modal.showModal();
})


closeButton.addEventListener("click", () => {
    modal.close();
})


addNewBook.addEventListener("submit", (e) => {
    e.preventDefault();

    addToLibrary(addTitle.value, addAuthor.value, addPages.value, "not read")

    libraryTable.innerHTML = "";
    generateTable();
    addNewBook.reset();
    modal.close();


})

generateTable();