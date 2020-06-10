class NotificationHandler {
    constructor() {
        this.notificationCenter = document.getElementById("notification-center");
        this.notificationCount = 0;
        this.notificationStack = [];
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
                <h1><i class="ri-${icon}-fill"></i> ${title}</h1>
                <h2>${text}</h2>
            </article>
        `; // this is terrible and i'm screaming

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
    }
}