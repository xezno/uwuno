// This file contains all of the event listeners used for the menu system
// (including the Window / document event listeners).

let AddListenerToElement = (elementName, event, listener) => document.getElementById(elementName).addEventListener(event, listener);
let eventListeners = [
    {
        "name": "party-code",
        "event": "click",
        "handler": _ => copyToClipboard("8FN322")
    },
    {
        "name": "private-game-selector",
        "event": "click",
        "handler": _ => switchMenuScreen("menu-matchmaking-private")
    },
    {
        "name": "public-game-selector",
        "event": "click",
        "handler": _ => switchMenuScreen("menu-matchmaking-public")
    },
    {
        "name": "options-button",
        "event": "click",
        "handler": _ => switchMenuScreen("menu-options")
    },
    {
        "name": "private-game-join",
        "event": "click",
        "handler": _ => switchMenuScreen("menu-party-enter-key")
    },
    {
        "name": "private-game-host",
        "event": "click",
        "handler": _ => switchMenuScreen("menu-party")
    },
    {
        "name": "start-game-button",
        "event": "click",
        "handler": _ => switchMenuScreen("game")
    },
    {
        "name": "party-join-button",
        "event": "click",
        "handler": _ => { 
            notificationHandler.PushNotification("Joining", "Joining party, please wait...", "key");
            switchMenuScreen("menu-party");
            // TODO: Connect to party
            notificationHandler.PushNotification("Joined!", "Joined party successfully.", "key");
        }
    },
    {
        "name": "save-options-button",
        "event": "click",
        "handler": _ => { 
            // TODO: Store settings in localstorage
            notificationHandler.PushNotification("Saved", "Your option changes have been saved.", "settings-3");
        }
    },
    {
        "name": "go-back",
        "event": "click",
        "handler": () => goBackMenuScreen()
    }
];


window.addEventListener("load", function(e) {
    // Register event listeners
    for (let eventListener of eventListeners)
    {
        AddListenerToElement(eventListener.name, eventListener.event, eventListener.handler);
    }

    notificationHandler = new NotificationHandler();
    options = new Options();

    // Hide all menu screens
    for (let element of menu.childNodes)
    {
        if (element && element.style)
            element.style.display = "none";
    }

    // Hide the splash screen
    let splashScreenElement = document.getElementById("splash-screen");
    splashScreenElement.style.opacity = "0";

    // // Start off with the initial "select game type" screen
    // switchMenuScreen("menu-game-publicity");

    switchMenuScreen("game");
});