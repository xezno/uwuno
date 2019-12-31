class SoundManager {
    constructor(soundsToLoad) {
        this.sounds = {};
        for (let sound of soundsToLoad) {
            this.sounds[sound] = new Audio(sound);
        }
    }

    Play(url) {
        var selectedAudio = this.sounds[url];
        if (!selectedAudio) console.error(`Sound ${url} was not loaded`);
        
        selectedAudio.playbackRate = (Math.random() * 0.2) + 0.9;
        selectedAudio.play();
    }
}