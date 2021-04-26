import * as firebase from 'firebase';
//require('@firebase/storage')
import '@firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC6fbCrypAWVvCzHqaOTtkpKbnGO3DVf8o",
    authDomain: "lexilearner-dfb00.firebaseapp.com",
    projectId: "lexilearner-dfb00",
    storageBucket: "lexilearner-dfb00.appspot.com",
    messagingSenderId: "17727641264",
    appId: "1:17727641264:web:d79e276df45252877b4d75"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export default firebase.storage();
export { firebase };