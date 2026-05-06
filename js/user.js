function renderUserDashboard(filter = '') {
    const books = LibraryStore.getBooks();
    const availableGrid = document.getElementById('available-books-grid');
    const myBooksList = document.getElementById('my-books-list');

    // Render Searchable Grid
    const filtered = books.filter(b => 
        b.title.toLowerCase().includes(filter.toLowerCase()) || 
        b.author.toLowerCase().includes(filter.toLowerCase())
    );

    availableGrid.innerHTML = filtered.map(book => `
        <div class="book-item">
            <h4>${book.title}</h4>
            <p>By ${book.author}</p>
            <p><small>ID: ${book.id}</small></p>
            <button class="main-btn" 
                onclick="borrowBook('${book.id}')" 
                ${book.isIssued ? 'disabled' : ''}>
                ${book.isIssued ? 'Issued' : 'Borrow'}
            </button>
        </div>
    `).join('');

    // Render Personal Shelf
    const myBooks = books.filter(b => b.issuedTo === currentUser.id);
    myBooksList.innerHTML = myBooks.length ? myBooks.map(book => `
        <div class="card" style="display:flex; justify-content:space-between; align-items:center">
            <div>
                <strong>${book.title}</strong>
                <p>${book.author}</p>
            </div>
            <button onclick="returnBook('${book.id}')" style="background:var(--success); color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer">Return</button>
        </div>
    `).join('') : '<p>No books borrowed yet.</p>';
}

function handleSearch() {
    const query = document.getElementById('search-input').value;
    renderUserDashboard(query);
}

function borrowBook(id) {
    const books = LibraryStore.getBooks();
    const book = books.find(b => b.id === id);
    
    if (book && !book.isIssued) {
        book.isIssued = true;
        book.issuedTo = currentUser.id;
        LibraryStore.saveBooks(books);
        showToast(`Borrowed: ${book.title}`);
        renderUserDashboard();
    }
}

function returnBook(id) {
    const books = LibraryStore.getBooks();
    const book = books.find(b => b.id === id);
    
    if (book) {
        book.isIssued = false;
        book.issuedTo = null;
        LibraryStore.saveBooks(books);
        showToast(`Returned: ${book.title}`);
        renderUserDashboard();
    }
}
