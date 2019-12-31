/*
    main.js

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

let notificationHandler,
    options,
    glInstance;

function switchMenuScreen(targetScreenName) {
    // This function fades the screen out to black over 150ms and then changes the currently active screen (DOM-based) 
    // thru the use of some css and js magic. Essentially, all screens are set to have their display
    // properties to "none", however this function will reset all displays to "none" once more and instead
    // set the target div's (from variable 'screenName') display value to "block".
    // The screen then fades back from black over 150ms.

    // Ensure this matches menu element's transition speed!
    const transitionSpeed = 500;

    // Get the menu variable
    let menu = document.getElementById("menu");
    // Fade the screen out
    menu.style.opacity = "0";

    // Wait until the screen has faded out (via transition)
    // and THEN switch screen (for smoothness reasons)
    setTimeout(() => {
        // Set all sub-elements of the menu to be invisible 
        // ("display: none")
    
        for (let element of menu.childNodes)
        {
            if (element && element.style)
                element.style.display = "none";
        }
    
        // Find the target screen
        let targetScreen = document.getElementById(targetScreenName);
        if (!targetScreen) // Check that the screen is valid before fading in
            return console.error(`${targetScreenName} is not a valid screen!`);
    
        // Set the screen's display value to nothing (in other
        // words, set it based on the CSS value)
        targetScreen.style.display = "";
    
        // Fade the screen back in
        menu.style.opacity = "1";
    }, transitionSpeed);
}

function copyToClipboard(text) {
    // A simple function that just makes copying to the
    // clipboard much easier.
    // Notifies the user that the text has been copied
    // afterwards.
    navigator.clipboard.writeText(text).then(() => {
        notificationHandler.PushNotification(`Copied`, `Copied ${text} to clipboard!`, "clipboard");
    }).catch((error) => {
        notificationHandler.PushNotification(`Error`, `Couldn't copy to clipboard: ${error}`);
        console.error(`There was a problem copying to the clipboard: ${error}`);
    });
}

// As soon as this script is loaded, check whether we should show the splash screen's logo or not:
function getBase(u) {
    if (u == undefined || u == null || u == "") return "";
    var regex = new RegExp(/^(https|http):\/\/.*?.\//);
    var result = regex.exec(u);
    if (result == null) return "";
    return result[0];
}

// HACK: Remove ("hide") the splash screen logo if we've come from the uwuno site
let splashScreenElement = document.getElementById("splash-screen");
if (getBase(window.location.href) == getBase(document.referrer))
{
    splashScreenElement.removeChild(splashScreenElement.getElementsByClassName("logo")[0]);
}
else
{
    splashScreenElement.getElementsByClassName("logo")[0].style.opacity = "1";
}

// Setup & register the serviceworker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceworker.js").then(() => {
        console.log("Registered service worker");
    }).catch((err) => { 
        console.error(`Could not register service worker: ${err}`);
    });
}

let gameFrontend = new GameManager(document.querySelector("canvas#game-canvas"));

let draw = () => {
    gameFrontend.Draw();
    requestAnimationFrame(draw);
};
requestAnimationFrame(draw);