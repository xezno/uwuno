class GameFrontend {
    constructor(canvas) {
        // Here, all of the magic happens
        // A GameCore.Game instance is created, and the appropriate render
        // code is called, thus linking the game's "backend" to its GL
        // frontend counterpart and allowing the user to interact with
        // the game.
        this.camera = new Camera();
        this.game = new Game();
        this.glInstance = new GLInstance(canvas);
        this.testCard = new RenderCard(this.glInstance);
        window.addEventListener("keydown", (e) => {
            if (e.key == "w")
            {
                this.camera.position[2]++;
            }
            else if (e.key == "s")
            {
                this.camera.position[2]--;
            }
            else if (e.key == "a")
            {
                this.camera.position[0]++;
            }
            else if (e.key == "d")
            {
                this.camera.position[0]--;
            }
        });
        canvas.addEventListener("mousemove", (e) => {
            console.log(`${e.x - canvas.offsetTop}, ${e.y - canvas.offsetLeft}`);
        });
    }

    draw() {
        this.glInstance.beginDraw();
        this.testCard.draw(this.camera);
        this.glInstance.endDraw();
    }
}