function renderAdminDashboard() {
    const books = LibraryStore.getBooks();
    const users = LibraryStore.getUsers();
    
    document.getElementById('stat-total-books').innerText = books.length;
    document.getElementById('stat-total-users').innerText = users.length;

    const list = document.getElementById('admin-book-list');
    list.innerHTML = books.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><span class="status-badge ${book.isIssued ? 'status-issued' : 'status-available'}">
                ${book.isIssued ? 'Issued' : 'Available'}</span></td>
            <td><button onclick="deleteBook('${book.id}')" style="color:red; background:none; border:none; cursor:pointer">Delete</button></td>
        </tr>
    `).join('');
}

document.getElementById('add-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const id = document.getElementById('book-id').value;

    const books = LibraryStore.getBooks();
    if (books.find(b => b.id === id)) return showToast('Book ID already exists', 'danger');

    books.push(new Book(id, title, author));
    LibraryStore.saveBooks(books);
    renderAdminDashboard();
    e.target.reset();
    showToast('Book added successfully');
});

function deleteBook(id) {
    let books = LibraryStore.getBooks();
    books = books.filter(b => b.id !== id);
    LibraryStore.saveBooks(books);
    renderAdminDashboard();
}
