class Options {
    constructor() {
        this.optionMap = this.defaultValues;
        // Apply all localstorage values afterwards (only uses
        // default values if necessary)
        this.localStorage = window.localStorage;
        for (var key of Object.keys(this.optionMap))
        {
            let storageValue = this.localStorage.getItem(key);
            if (storageValue)
                this.SetOption(key, storageValue);
        }
    }

    get defaultValues() {
        // Return the default values for all options.
        return {
            "darkMode": true,
            "streamerMode": true,
            "username": "Player" + Math.floor(Math.random() * 999), // Random username
            "notifications": true
        }
    }

    SetOption(name, value) {
        this.optionMap[name] = value;
        // Set the option in the local storage for use later
        this.localStorage.setItem(name, value);
    }

    GetOption(name) {
        return this.optionMap[name];
    }
}