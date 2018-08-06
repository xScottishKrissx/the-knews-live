import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAlu-JSkXdG8NVFRKTrO7NrZdS-wktvX-8",
    authDomain: "the-knews-live.firebaseapp.com",
    databaseURL: "https://the-knews-live.firebaseio.com",
    projectId: "the-knews-live",
    storageBucket: "",
    messagingSenderId: "574624359137"
  };

  const fire = firebase.initializeApp(config);
  export default fire;