// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwbiZovdWvhr9gAz0YhjDSN20VYkQy7EM',
  authDomain: 'kover-finance.firebaseapp.com',
  projectId: 'kover-finance',
  storageBucket: 'kover-finance.appspot.com',
  messagingSenderId: '781223768093',
  appId: '1:781223768093:web:d156dca736e9b6ebb4d6f4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
