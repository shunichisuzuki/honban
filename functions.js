function getId(mail) {
    console.log('### getId start.');
    var promise2 = new Promise(function (resolve, reject) {
        var hit = 0;
        var anyKey = '';
        var userChkRef = firebase.database().ref().child('users/');
        userChkRef.on('value', function (snapshot) {
            //snapshot.key は users。
            snapshot.forEach(function (children) {
                // console.log("■■■ children.key: " + children.key); //1以上の値
                currentId = children.key;
                children.forEach(function (magosnap) {
                    // console.log("magosnap.key: " + magosnap.key); //不規則文字列
                    anyKey = magosnap.key;
                    magosnap.forEach(function (himagosnap) {
                        if (himagosnap.key == "name") {
                            var tmp = '';
                            var tmpRef = firebase.database().ref().child('users/' + currentId + '/' + anyKey);
                            tmpRef.on('value', function (tmpsnap) {
                                tmp = tmpsnap.val().name; //メールアドレスを取得。
                                if (mail == tmp) {
                                    resolve(currentId);
                                }
                            });
                        }
                    });
                });
            });
        });
    });
    promise2.then(function (result2) {
        var currentId = result2;
        console.log('### getId end.');
    });
}

function getmail() {
    var umail = '';
    var promise = new Promise(function (resolve, reject) {
        console.log('### get mail start.');
        firebase.auth().onAuthStateChanged((user) => {
            let status = document.querySelector('#status');
            if (user) {
                console.log("Singed-in");
                resolve(user.email);
            } else {
                console.log("NOT Singed-in");
            }
        });
    });
    promise.then(function (result) {
        umail = result;
        console.log('### get mail end.');
    });
}

function getreturnId(mail) {
    console.log('### getId start.');
    var promise2 = new Promise(function (resolve, reject) {
        var hit = 0;
        var anyKey = '';
        var userChkRef = firebase.database().ref().child('users/');
        userChkRef.on('value', function (snapshot) {
            //snapshot.key は users。
            snapshot.forEach(function (children) {
                // console.log("■■■ children.key: " + children.key); //1以上の値
                currentId = children.key;
                children.forEach(function (magosnap) {
                    // console.log("magosnap.key: " + magosnap.key); //不規則文字列
                    anyKey = magosnap.key;
                    magosnap.forEach(function (himagosnap) {
                        if (himagosnap.key == "name") {
                            var tmp = '';
                            var tmpRef = firebase.database().ref().child('users/' + currentId + '/' + anyKey);
                            tmpRef.on('value', function (tmpsnap) {
                                tmp = tmpsnap.val().name; //メールアドレスを取得。
                                if (mail == tmp) {
                                    resolve(currentId);
                                }
                            });
                        }
                    });
                });
            });
        });
    });
    promise2.then(function (result2) {
        var Id = result2;
        console.log('### getId end.');
    });
}

function puttime(T) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var update_num = 0;
    var newData = {};
    var starCountRef = firebase.database().ref().child('users/' + currentId);
    starCountRef.on('value', function (snapshot) {
        snapshot.forEach(function (children) {  //任意の文字列についてループ
            anyKey = children.key;
            //children.val().userIdとかで必要な値を取ればOK
            children.forEach(function (magosnap) {
                magosnap.forEach(function (himagosnap) {
                    if (himagosnap.key == currentPage) {
                        var currentFlag = '';
                        currentFlag = himagosnap.val().flag;
                        var newData = writeNewPost(T, currentFlag);
                        var updates = {};
                        updates['users/' + currentId + '/' + anyKey + '/taiyoukei/' + currentPage] = newData;

                        if (update_num == 0) {
                            firebase.database().ref().update(updates);
                            update_num = 1;
                        }
                    }
                });
            });
        });
    });
}

function writeNewPost(getCT, currentFlag) {
    var tmpData = {
        currentTime: getCT,
        flag: currentFlag
    };
    return tmpData;
}

function qflagchange(Id, Page) {
    console.log('### Flag Change start.');
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var update_num = 0;
    var newData = {};
    var starCountRef = firebase.database().ref().child('users/' + Id);
    starCountRef.on('value', function (snapshot) {
        snapshot.forEach(function (children) {  //任意の文字列についてループ
            anyKey = children.key;
            //children.val().userIdとかで必要な値を取ればOK
            children.forEach(function (magosnap) {
                magosnap.forEach(function (himagosnap) {
                    if (himagosnap.key == Page) {
                        var currentFlag = 1;
                        var newData = { flag: currentFlag };
                        var updates = {};
                        updates['users/' + Id + '/' + anyKey + '/shinwa/' + Page] = newData;
                        if (update_num == 0) {
                            console.log('### Flag update start.');
                            firebase.database().ref().update(updates);
                            update_num = 1;
                            console.log('### Flag update end.');
                        }
                    }
                });
            });
        });
    });
    console.log('### Flag Change end.');
}