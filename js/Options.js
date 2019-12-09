/*
    options.js

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