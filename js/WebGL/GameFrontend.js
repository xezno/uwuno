class GameFrontend {
    constructor(canvas) {
        // Here, all of the magic happens!
        // A GameCore.Game instance is created, and the appropriate render
        // code is called, thus linking the game's "backend" to its GL
        // frontend counterpart and allowing the user to interact with
        // the game.

        this.camera = new Camera();
        this.game = new Game();
        this.glInstance = new GLInstance(canvas);
        this.canvas = canvas;
        this.handRenderer = new HandRenderer(this.glInstance, this.game, this);
        this.mainCardShader = new Shader(this.glInstance, "/shaders/frag.glsl", "/shaders/vert.glsl");
        this.keysPressed = [];

        this.RegisterEventHandlers();
        this.LoadTextures();
        this.Run();
    }

    RegisterEventHandlers() {
        window.addEventListener("keydown", (e) => {
            this.keysPressed[e.key] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keysPressed[e.key] = false;
        });

        this.canvas.addEventListener("mousemove", (e) => {
            let posX = e.x - this.canvas.offsetLeft;
            let posY = e.y - this.canvas.offsetTop;

            // There was probably an easier way to do this (thru matrices) but I don't care
            let position = [posX / this.canvas.offsetWidth, posY / this.canvas.offsetHeight];
            position[0] *= this.camera.posLeft * this.camera.ratio * 2;
            position[1] *= this.camera.posTop * 2;
            position[0] -= this.camera.posLeft * this.camera.ratio;
            position[1] -= this.camera.posTop;
            position[0] = position[0];
            position[1] = -position[1];
            this.mousePosWorld = position;

            this.handRenderer.MouseMoved(position);
        });

        this.canvas.addEventListener("mousedown", (e) => {
            this.handRenderer.MouseClicked(this);
        });
    }

    LoadTextures() {
        // Compile a list of textures to load
        let texturesToLoad = [
            "/img/arrow-left.png",
            "/img/cards/card_back.png"
        ];

        // We want every card in the deck to have its texture loaded before it's
        // used for ultra-smooth gameplay.
        for (let card of this.game.deck.GetAllCards())
        {
            texturesToLoad.push(`/img/cards/${card.cardColor}_${card.cardType}.png`);
        }

        // Load the textures
        this.textureManager = new TextureManager(this.glInstance, texturesToLoad);
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