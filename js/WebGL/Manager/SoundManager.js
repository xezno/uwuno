class SoundManager {
    static Play(url) {
        let audio = new Audio(url);
        audio.playbackRate = (Math.random() * 0.2) + 0.9;
        audio.play();
    }
}