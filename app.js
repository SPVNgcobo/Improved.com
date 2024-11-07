// Initialize Firebase (use your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDskj7mGuZ9JnbglGqoSVIHD_3lM1bE04w",
  authDomain: "visualii-70dfb.firebaseapp.com",
  databaseURL: "https://visualii-70dfb.firebaseio.com",
  projectId: "visualii-70dfb",
  storageBucket: "visualii-70dfb.appspot.com",
  messagingSenderId: "1234567890", // Replace with your actual messagingSenderId
  appId: "1:1234567890:web:abc123def456gh789" // Replace with your actual appId
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('signUpBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the input values
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Firebase sign-up
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully signed up
            const user = userCredential.user;

            // Show welcome message
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = `Welcome, ${name}!`;

            // Redirect to main.html after 2 seconds
            setTimeout(function() {
                window.location.href = 'main.html';
            }, 2000);
        })
        .catch((error) => {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;

            // Show error message
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = `Error: ${errorMessage}`;
        });
});
