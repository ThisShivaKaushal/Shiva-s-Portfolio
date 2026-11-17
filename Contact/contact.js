import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4XBhtlyY1VSujFpaEPKUYzFiyFUIL0vs",
    authDomain: "shivakaushaportfolio.firebaseapp.com",
    projectId: "shivakaushaportfolio",
    storageBucket: "shivakaushaportfolio.firebasestorage.app",
    messagingSenderId: "293594105514",
    appId: "1:293594105514:web:e8cc410f49d7ef798872d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('contactform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitbutton = document.getElementById('submitbutton');
    const feedback = document.getElementById('formfeedback');

    submitbutton.disabled = true;
    submitbutton.innerHTML = `<span>Sending...</span>`;

    const formdata = {
        fullName: document.getElementById('fullname').value.trim(),
        email: document.getElementById('useremail').value.trim(),
        message: document.getElementById('message').value.trim(),
        submittedAt: serverTimestamp()
    };

    try {
        await add(collection(db, "contacts"), formData);

        feedback.className = 'feedback-banner feedback-success';
        feedbackBox.innerHTML = `
        <div class="feedback-icon">
          <i data-lucide="check-circle-2></i>
        </div>
        <div class="feedback-content">
        <strong>Message Sent!</strong>
        <p>Thanks for reaching out! I'll get back to you shortly.</p>
        </div>
        `

        feedback.style.display = 'flex';
        document.getElementById('contactform').reset();
    } catch (error) {
        console.error("Error adding contact: ", error);

        feedback.className = 'feedback-banner feedback-error';
        feedback.innerHTML = `
        <div class="feedback-icon">
        <i data-lucide="alert-circle"></i>
        </div>
        <div class="feedback-content">
        <strong>Message Failed</strong>
        <p>Could not send your message right now. Please check your connection and try again.</p>
        </div>`;

        feedback.style.display = 'flex';
    } finally {
        submitbutton.disabled = false;
        submitbutton.innerHTML = `<span>Send Message</span><i data-lucide="send"></i>`

        if (window.lucide) {
            window.lucide.createIcons();
        }

        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});