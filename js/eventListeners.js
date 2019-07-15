/*
    eventListeners.js

    Copyright (c) 2019 Alex Guthrie

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

// This file contains all of the event listeners used for the menu system
// (including the Window / document event listeners).

let AddListenerToElement = (elementName, event, listener) => document.getElementById(elementName).addEventListener(event, listener);
let eventListeners = [
    {
        "name": "party-code",
        "event": "click",
        "handler": () => copyToClipboard("8FN322")
    },
    {
        "name": "private-game-selector",
        "event": "click",
        "handler": () => switchMenuScreen("menu-matchmaking-private")
    },
    {
        "name": "public-game-selector",
        "event": "click",
        "handler": () => switchMenuScreen("menu-matchmaking-public")
    },
    {
        "name": "options-button",
        "event": "click",
        "handler": () => switchMenuScreen("menu-options")
    },
    {
        "name": "private-game-join",
        "event": "click",
        "handler": () => switchMenuScreen("menu-party-enter-key")
    },
    {
        "name": "private-game-host",
        "event": "click",
        "handler": () => switchMenuScreen("menu-party-private")
    },
    {
        "name": "party-join-button",
        "event": "click",
        "handler": () => notificationHandler.PushNotification("Joining", "Joining party, please wait...", "key")
    },
];

for (let eventListener of eventListeners)
{
    AddListenerToElement(eventListener.name, eventListener.event, eventListener.handler);
}

window.addEventListener("load", function(e) {
    console.log("Loaded page");

    // Initialize notification.js
    notificationHandler = new NotificationHandler();

    // Initialize options.js
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
    // Start off with the "select game publicity" screen
    switchMenuScreen("menu-game-publicity");
});