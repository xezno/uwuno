class Sound {
    constructor(url) {
        this.url = url;
        this.audio = new Audio(url);
    }

    Play() {
        this.audio.play();
    }
}