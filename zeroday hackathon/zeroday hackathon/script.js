import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtzyucssyTPpYMLfqMFEKa0omB-cAN5ik",
  authDomain: "register-page-f2411.firebaseapp.com",
  projectId: "register-page-f2411",
  storageBucket: "register-page-f2411.appspot.com",
  messagingSenderId: "267988588138",
  appId: "1:267988588138:web:c9a1bc7319a2dfe9f29c13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const authBtn = document.getElementById("auth-btn");
const toggleLink = document.getElementById("toggle-link");
const googleBtn = document.getElementById("google-btn");
const errorDiv = document.getElementById("error-message");

let isLogin = true;

authBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  errorDiv.textContent = "";

  if (isLogin) {
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => (window.location.href = "dashboard.html"))
      .catch((e) => (errorDiv.textContent = "Login Error: " + e.message));
  } else {
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => (window.location.href = "dashboard.html"))
      .catch((e) => (errorDiv.textContent = "Signup Error: " + e.message));
  }
});

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  document.getElementById("form-title").textContent = isLogin ? "Login" : "Signup";
  authBtn.textContent = isLogin ? "Login" : "Signup";
  toggleLink.textContent = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
  errorDiv.textContent = "";
});

googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => (window.location.href = "dashboard.html"))
    .catch((e) => (errorDiv.textContent = "Google Sign-In Error: " + e.message));
});