// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4XBhtlyY1VSujFpaEPKUYzFiyFUIL0vs",
    authDomain: "shivakaushaportfolio.firebaseapp.com",
    projectId: "shivakaushaportfolio",
    storageBucket: "shivakaushaportfolio.firebasestorage.app",
    messagingSenderId: "293594105514",
    appId: "1:293594105514:web:e8cc410f49d7ef798872d3",
    measurementId: "G-98Q48KT7DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.getElementById('collaborationform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitbutton = document.getElementById('submitbutton');
    const feedbackbox = document.getElementById('formfeedback');
    submitbutton.disabled = true;
    submitbutton.innerHTML = `<span>Sending...</span>`

    const formData = {

        fullName: document.getElementById('fullname').value,
        email: document.getElementById('useremail').value,
        isTeen: document.getElementById('teens').value,
        projectDetails: document.getElementById('projectdetail').value,
        submittedAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "collaborate"), formData);

        feedbackbox.className = 'feedbackpopup feedbackpopuptrue';
        feedbackbox.innerHTML = `<div class="feedbackicon>
        <i data-lucide="check-circle-2></i></div>
        <div class="feedbackcontent">
        <strong>Collaboration Request Sent!</strong>
        <p>Thank you for reaching out. I will get back to you within 24 hours.</p>
        </div>`;

        feedbackbox.style.display = 'flex';

        document.getElementById('collaborationform').reset();
    } catch (error) {
        console.error("Error adding document: ", error);

        feedbackbox.className = 'feedbackpopup feedbackpopupfalse';
        feedbackbox.innerHTML = `
        <div class="feedbackicon">
        <i data-lucide="alert-circle"></i></div>
        <div class="feedbackcontent">
        <strong>Submission Failed</strong>
        <p>Something went wrong while sending your request. Please try again later.</p></div>`;

        feedbackbox.style.display = 'flex';
    } finally {
        submitbutton.disabled = false;
        submitbutton.innerHTML = `<span>Send Collabaoration </span><i data-lucide="arrow-up-right"></i>`

        feedbackbox.scrollIntoView({ bahavior: 'smooth', block: 'center' });
    }
});
