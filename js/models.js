class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isIssued = false;
        this.issuedTo = null;
    }
}

class User {
    constructor(id, name, password) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.borrowedBooks = []; // Stores Book IDs
    }
}

const LibraryStore = {
    getBooks: () => JSON.parse(localStorage.getItem('books')) || [],
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    
    saveBooks: (books) => localStorage.setItem('books', JSON.stringify(books)),
    saveUsers: (users) => localStorage.setItem('users', JSON.stringify(users)),

    init: () => {
        if (!localStorage.getItem('books')) LibraryStore.saveBooks([]);
        if (!localStorage.getItem('users')) LibraryStore.saveUsers([]);
    }
};
LibraryStore.init();
