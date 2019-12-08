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

        this.handRenderer = new HandRenderer(this.glInstance, this.game, this);
        this.mainCardShader = new Shader(this.glInstance, "/shaders/frag.glsl", "/shaders/vert.glsl");

        this.keysPressed = [];
        window.addEventListener("keydown", (e) => {
            this.keysPressed[e.key] = true;
            // console.log(`${e.key} down`);
        });
        window.addEventListener("keyup", (e) => {
            this.keysPressed[e.key] = false;
            // console.log(`${e.key} up`);
        });
        canvas.addEventListener("mousemove", (e) => {
            // console.log(`${e.x - canvas.offsetTop}, ${e.y - canvas.offsetLeft}`);
        });
        canvas.addEventListener("mousedown", (e) => {
            this.Run();
        });

        // Compile a list of textures to load
        let texturesToLoad = [
            "/img/arrow-left.png"
        ];
        // We want every card in the deck to have its texture loaded before it's
        // used for ultra-smooth gameplay.
        for (let card of this.game.deck.GetAllCards())
        {
            texturesToLoad.push(`/img/cards/${card.cardColor}_${card.cardType}.png`);
        }

        // Load the textures
        this.textureManager = new TextureManager(this.glInstance, texturesToLoad);

        this.Run();
    }

    Run() {
        this.game.Run();
        this.handRenderer.UpdateCards();
    }

    Draw() {
        this.camera.Update(this.keysPressed);
        this.glInstance.BeginDraw();
        this.handRenderer.Draw();
        this.glInstance.EndDraw();
    }
}