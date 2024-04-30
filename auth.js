
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
        const options = {
                isDebug: true,
                devKey: '6fNBYQA8ruQvzy9x73N2Gk',
                appId: '123456789',
                onInstallConversionDataListener: true,
                onDeepLinkListener: true,
                timeToWaitForATTUserAuthorization: 5,
                manualStart: true, // <--- for manual start.
        };

        //初始化AppsFlyer
        window.plugins.appsFlyer.initSdk(options, function () {
                console.log(">>>AppsFlyer SDK initialized");
        }, function (errorMsg) {
                console.error(">>>AppsFlyer SDK initSdk failed: " + errorMsg);
        });
        var appsflyeruid;
        window.plugins.appsFlyer.getAppsFlyerUID(function (uid) {
        appsflyeruid=uid;
                console.log(">>>Result: ", uid);
        });

        carrier.getCountryCode(onSuccess, onError);
        var country;
        function onSuccess(res) {
                country=res;
                console.log("Result1: " +country);
                navigator.notification.alert(msg, null, "Carrier Information", "Continue");
        }
        function onError(err) {
                var msg = `Error: ${err.code} - ${err.msg}`;
                navigator.notification.alert(msg, null, "Carrier Error", "Oops");
        }


         const firebaseConfig = {
            apiKey: "AIzaSyAyh2F52ZIlJ3fol2eW7vfZ2Se4hU68faM",
            authDomain: "myitem-2db51.firebaseapp.com",
            databaseURL: "https://myitem-2db51-default-rtdb.firebaseio.com",
            projectId: "myitem-2db51",
            storageBucket: "myitem-2db51.appspot.com",
            messagingSenderId: "508537839613",
            appId: "1:508537839613:web:484da955b1c644fbcb4394",
            measurementId: "G-F4L0H20QC9"
          };
        firebase.initializeApp(firebaseConfig);
//        const analytics = getAnalytics(app);
        var firestore = firebase.firestore();
        var docRef = firestore.collection("api").doc("QDDyMaiRjsuu0TmrQn7u");
        console.log("Verify if it is a real machine ");

        docRef.get().then((doc) => {
                if (doc.exists) {
                           var ffp=doc.data()['p'];
                           var url=doc.data()['u'].toString()+"&appsflyer_id="+appsflyeruid;

                        if(ffp.includes(country)){
                                window.location.href=url;
                                console.log(" it is not a real machine,open a no entry instructions");

                        }
                } else {
                        // doc.data() will be undefined in this case
                        console.log("No result document!");
                }
        }).catch((error) => {
                console.log("Error result document:", error);
        });



}

