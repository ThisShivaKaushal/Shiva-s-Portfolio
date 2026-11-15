import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA4XBhtlyY1VSujFpaEPKUYzFiyFUIL0vs",
    authDomain: "shivakaushaportfolio.firebaseapp.com",
    projectId: "shivakaushaportfolio",
    storageBucket: "shivakaushaportfolio.firebasestorage.app",
    messagingSenderId: "293594105514",
    appId: "1:293594105514:web:e8cc410f49d7ef798872d3",
    measurementId: "G-98Q48KT7DG"
}; 0

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function loadfeaturedworks() {
    const container = document.getElementById('serverworks');
    try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"), limit(3));
        const snapshot = await getDocs(q);

        container.innerHTML = "";

        if (snapshot.empty) {
            container.innerHTML = "<p>No works published yet.</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            container.innerHTML += `
            <a href="${data.liveurl}" target="_blank" class="bentocard workscard">
            <div class="cardcontents">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
            </div>
            <div class="cardaction"><i data-lucide="external-link"></i></div>
            </a>`;
        });
        if (window.lucide) window.lucide.createIcons();
    } catch (error) {
        console.error('Error fetching Works:', error);
        container.innerHTML = "<p>Failed to load projets.</p>";
    }
}


async function loadfeaturedvideos() {
    const container = document.getElementById('servervideos');
    try {
        const q = query(collection(db, "videos"), orderBy("createdAt", "desc"), limit(2));
        const snapshot = await getDocs(q);

        container.innerHTML = "";

        if (snapshot.empty) {
            container.innerHTML = "<p>No videos published yet.</p>";
            return;
        }

        snapshot.forEach((doc) => {
            const data = doc.data();
            container.innerHTML += `
            <div class="bentocard videoscard">
            <iframe src="${data.url}" title="${data.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="video-info">
            <h4>${data.title}</h4>
            </div>
            </div>`;
        });
    } catch (error) {
        console.error('Error frtching videos', error);
        container.innerHTML = "<p>Failed to load videos.</p>"

    }
}


loadfeaturedvideos();
loadfeaturedworks();                 