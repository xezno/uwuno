/*
    notificationHandler.js

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

class NotificationHandler {
    constructor() {
        this.notificationCenter = document.getElementById("notification-center");
        this.notificationsAlive = 0;
        this.notificationCount = 0;
        this.notificationStack = [];
        this.maxNotificationsAlive = 300; // TODO: Change this based on layout
        if (!this.notificationCenter) console.error(`Notification center wasn't found: notification.js cannot continue`);
    }

    PurgeNotification(id) {
        clearTimeout(this.notificationStack[id]);
        return new Promise((resolve, reject) => {
            let notification = document.getElementById(`notification-${id}`);

            if (!notification)
                return reject("Notification didn't exist.  Has it already been purged?");
            
            if (!notification.parentNode)
                return reject("Notification didn't have a parent node.");

            // Decrease the notification alive count so that we can
            // more easily keep track of the notification count
            // (i.e. limit notifications on-screen)
            this.notificationsAlive--;
    
            // Animated: slide out to the right while fading out simultaneously
            notification.style.transform = "translateX(500px)";
            notification.style.opacity = "0";
    
            // Wait until we can hide the notification (animate out)
            this.notificationStack[id] = setTimeout(() => {
                notification.parentNode.removeChild(notification);
                return resolve();
            }, 500);
        });
    }

    PushNotification(title, text, icon) {
        let notificationID = this.notificationCount;
        if (!icon) icon = "error-warning-fill"
        this.notificationCenter.innerHTML += `
            <article class="notification" onclick="notificationHandler.PurgeNotification('${notificationID}')" style="opacity: 0;" id="notification-${notificationID}">
                <h1><i class="remixicon-${icon}-fill"></i> ${title}</h1>
                <h2>${text}</h2>
            </article>
        `;

        // Wait until we can show the notification (animate in)
        setTimeout(() => {
            let notification = document.getElementById(`notification-${notificationID}`);

            // Animated: fade in
            notification.style.opacity = "1";
        }, 200);

        // Wait until the user has read the notification
        this.notificationStack.push(setTimeout(() => {
            this.PurgeNotification(notificationID).then(function() {}).catch(function(error) {
                console.error(`Unable to purge expired notification: ${error}`);
            });
        }, 5000));

        this.notificationCount++;
        this.notificationsAlive++;
    }
}