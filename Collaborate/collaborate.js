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
    submitbutton.disabled = true;
    submitbutton.innerText = "Sending..";

    const formData = {

        fullName: document.getElementById('fullname').value,
        email: document.getElementById('useremail').value,
        isTeen: document.getElementById('teens').value,
        projectDetails: document.getElementById('projectdetail').value,
        submittedAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "collaborate"), formData);

        alert("Thank you! Collaboration request submitted successfully:)");
        document.getElementById('collaborationform').reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting collaboration request. Please try again.");
    } finally {
        submitbutton.disabled = false;
        submitbutton.innerHTML = `Send Collabaoration <span>↗</span>`
    }
});
