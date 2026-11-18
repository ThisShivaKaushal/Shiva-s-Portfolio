import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4XBhtlyY1VSujFpaEPKUYzFiyFUIL0vs",
    authDomain: "shivakaushaportfolio.firebaseapp.com",
    projectId: "shivakaushaportfolio",
    storageBucket: "shivakaushaportfolio.firebasestorage.app",
    messagingSenderId: "293594105514",
    appId: "1:293594105514:web:e8cc410f49d7ef798872d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('contactform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('adminemail').value.trim();
    const password = document.getElementById('adminpassword').value;
    const button = document.getElementById('loginbutton');
    const feedback = document.getElementById('formfeedback');

    button.disabled = true;
    button.innerHTML = `<span>Verifying...</span>`

    try {
        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = '/admin/admin.html';
    } catch (error) {
        console.error("login failed:", error);
        feedback.className = 'feedback-banner feedback-error';
        feedback.innerHTML = `
        <div class="feedback-icon-wrap"><i data-lucide="alert-circle></i></div>
        <div class="feedback-content">
        <strong>Access Denied</strong>
        <p>Incorrect email or password.</p>
        </div>
        `;
        feedback.style.display = 'flex';
        if (window.lucide) window.lucide.createIcons();

        button.disabled = false;
        button.innerHTML = `<span>Login to Admin </span><i data-lucide="lock></i>`
    }
})