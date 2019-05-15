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
firebase.auth().onAuthStateChanged((user) => {
    // console.log(user);
    let status = document.querySelector('#status');
    if (user) {
        // console.log("user: " + firebase.auth().currentUser.email);
        // status.innerText = 'Singed-in';
        console.log("user: " + user.email);
        console.log("Singed-in");

        // const userinfo = firebase.auth().currentUser;
        // var name, email;
        // if (user != null) {
        //     name = user.displayName;
        //     email = user.email;
        // }
        // console.log(name);
        // console.log(email);
    } else {
        // status.innerText = 'NOT Singed-in';
        console.log("NOT Singed-in");
    }
});