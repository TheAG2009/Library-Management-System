let currentRole = 'user';
let currentUser = null;

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function switchAuthTab(role) {
    currentRole = role;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function toggleAuthMode(mode) {
    document.getElementById('login-box').classList.toggle('hidden', mode === 'register');
    document.getElementById('register-box').classList.toggle('hidden', mode === 'login');
}

// Authentication Logic
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('login-id').value;
    const pass = document.getElementById('login-pass').value;

    if (currentRole === 'admin') {
        if (id === 'admin' && pass === 'admin123') {
            showDashboard('admin');
        } else {
            showToast('Invalid Admin Credentials', 'danger');
        }
    } else {
        const users = LibraryStore.getUsers();
        const user = users.find(u => u.id === id && u.password === pass);
        if (user) {
            currentUser = user;
            showDashboard('user');
        } else {
            showToast('Invalid User ID or Password', 'danger');
        }
    }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const id = document.getElementById('reg-id').value;
    const pass = document.getElementById('reg-pass').value;

    const users = LibraryStore.getUsers();
    if (users.find(u => u.id === id)) return showToast('ID already exists', 'danger');

    users.push(new User(id, name, pass));
    LibraryStore.saveUsers(users);
    showToast('Registration Successful! Please Login.');
    toggleAuthMode('login');
});

function showDashboard(role) {
    document.getElementById('auth-screen').classList.add('hidden');
    if (role === 'admin') {
        document.getElementById('admin-dashboard').classList.remove('hidden');
        renderAdminDashboard();
    } else {
        document.getElementById('user-dashboard').classList.remove('hidden');
        document.getElementById('user-welcome').innerText = `Welcome, ${currentUser.name}`;
        renderUserDashboard();
    }
}

function logout() {
    location.reload();
}
