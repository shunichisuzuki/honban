var config = {
    apiKey: "AIzaSyDi-3ysixs4mQRGWBaHw0XyAEaRpg_SZEk",
    authDomain: "testapp-8cd49.firebaseapp.com",
    databaseURL: "https://testapp-8cd49.firebaseio.com",
    projectId: "testapp-8cd49",
    storageBucket: "testapp-8cd49.appspot.com",
    messagingSenderId: "780005627723"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}