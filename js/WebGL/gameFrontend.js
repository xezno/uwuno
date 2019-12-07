class GameFrontend {
    constructor(canvas) {
        // Here, all of the magic happens
        // A GameCore.Game instance is created, and the appropriate render
        // code is called, thus linking the game's "backend" to its GL
        // frontend counterpart and allowing the user to interact with
        // the game.
        this.game = new Game();
        this.glInstance = new GLInstance(canvas);
        this.testCard = new RenderCard(this.glInstance);
    }

    draw() {
        this.glInstance.beginDraw();
        this.testCard.draw();
        this.glInstance.endDraw();
    }
}