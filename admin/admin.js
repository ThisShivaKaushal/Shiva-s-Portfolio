// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
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


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


//inbox stuff

async function loadInbox() {
    const inboxList = document.getElementById('inboxlist');
    inboxList.innerHTML = "Fetching messages...";

    try {
        const q = query(collection(db, "collaborate"), orderBy("submittedAt", "desc"));
        const querySnapshot = await getDocs(q);

        inboxList.innerHTML = "";

        if (querySnapshot.empty) {
            inboxList.innerHTML = "<p>No Collaboration requests yet.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const dateStr = data.submittedAt ? data.submittedAt.toDate().toLocaleDateString() : 'Unknown date';

            inboxList.innerHTML += `
            <div class="card msg-card">
            <h3>${data.fullName} <span>${data.isTeen === 'YES' ? 'Teenager' : 'Adult'}</span></h3>
            <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
            <p><strong>Project Details:</strong><br>${data.projectDetails}</p>
            <small style="color:#888; display: block; margin-top:10px;">Sent on: ${dateStr}</small>
            </div>`;
        });
    } catch (error) {
        console.error("Error fetching inbox:", error);
        inboxList.innerHTML = "Failed to load messages. Check console.";
    }
}

loadInbox();