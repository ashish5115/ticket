// scripts/login-scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'comp' && password === 'Comp@123') {
            window.location.href = '../form/form.html';
        } else if (username === 'ashish' && password === '123') {
            window.location.href = '../form/form.html';
        } else if (username === 'prem' && password === '1234') {
            window.location.href = '../form/form.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
