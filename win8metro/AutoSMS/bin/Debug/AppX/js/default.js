// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    WinJS.strictProcessing();
    var http = new XMLHttpRequest();

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                document.body.onload = buildCarrierList();                

            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.onactivated = function (eventObject) {
        if (eventObject.detail.kind === Windows.ApplicationModel.
                                 Activation.ActivationKind.launch) {
            WinJS.UI.processAll();
            // app.addEventListener("settings", function (e) { Load Settings });
            // OR       
            app.onsettings = loadSettings;
        }
    };

    function loadSettings(e) {
        e.detail.applicationcommands =
        {           
            "about":
                {
                    title: "About AutoSMS & getting help",
                    href: "/Settings/About.html"
                }
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
        /*
        document.querySelector("#btnShowSettings").addEventListener("click", function (e) {
            Windows.UI.ApplicationSettings.SettingsPane.show();
        });

        document.querySelector("#btnHelp").addEventListener("click", function () {
            WinJS.UI.SettingsFlyout.showSettings("Help", "/Settings/About.html");
        });

        document.querySelector("#btnAbout").addEventListener("click", function () {
            WinJS.UI.SettingsFlyout.showSettings("About", "/Settings/About.html");
        });
        */
    }

    app.start();

    function handleCarrierListResponse() {
        if (http.readyState == 4) {
            var carrierList = http.responseText.split("||");
            for (var carrier in carrierList) {
                var carrierPair = carrierList[carrier].split('|');
                document.getElementById("Carrier").options[document.getElementById("Carrier").length] = new Option(carrierPair[0] + " - " + carrierPair[1], carrierPair[1]);
                /* Other method to populate select list via DOM
                var nextOpt = document.createElement('option');
                nextOpt.text = carrierPair[0] + " - " + carrierPair[1];
                nextOpt.value = carrierPair[1];
                var selList = document.getElementById('Carrier');
                try {
                    selList.add(nextOpt, null); // standards compliant; maybe not IE
                }catch(ex) {
                    selList.add(nextOpt); // IE only
                }
                */
            }
        }
    }

    function buildCarrierList() {
        var carrierUrl = "http://www.watacrackaz.com/autosms/autosms.php?getcarriers=1";
        try {
            http.open("GET", carrierUrl, true);
            http.onreadystatechange = handleCarrierListResponse;
            http.send(null);
        } catch (e) {
            var msgText = "Get carrier list failed somehow. Service may be down.";
            //var msgText = e.message;
            var msg = new Windows.UI.Popups.MessageDialog(msgText, "Error:");
            msg.showAsync();
        }
    }

})();
