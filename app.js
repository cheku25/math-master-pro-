// ✅ Replace with your Firebase config
 const firebaseConfig = {
    apiKey: "AIzaSyCd05s6WY0f7Xo-_jQhcNrfIAOoo5bJz78",
    authDomain: "math-master-pro-1204e.firebaseapp.com",
    projectId: "math-master-pro-1204e",
    storageBucket: "math-master-pro-1204e.firebasestorage.app",
    messagingSenderId: "454640918572",
    appId: "1:454640918572:web:c8ef637daada0cc65eb189"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById("msg").innerText = "Login successful!";
      window.location.href = "game.html"; // Redirect to game
    })
    .catch(err => {
      document.getElementById("msg").innerText = err.message;
    });
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      document.getElementById("msg").innerText = "Account created! You can now log in.";
    })
    .catch(err => {
      document.getElementById("msg").innerText = err.message;
    });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      document.getElementById("msg").innerText = `Welcome ${result.user.displayName}!`;
      window.location.href = "game.html"; // Redirect to game
    })
    .catch(err => {
      document.getElementById("msg").innerText = err.message;
    });
}
