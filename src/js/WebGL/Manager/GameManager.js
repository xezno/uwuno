class GameManager {
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
        this.handManager = new HandManager(this.glInstance, this.game, this);
        this.mainCardShader = new Shader(this.glInstance, "/shaders/frag.glsl", "/shaders/vert.glsl");
        this.keysPressed = [];

        this.timeSinceLastUpdate = Date.now();

        this.RegisterEventHandlers();
        this.LoadTextures();
        this.LoadSounds();
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
            this.SetMousePos(e.x, e.y);
            this.handManager.MouseMoved(this.mousePosWorld);
        });

        this.canvas.addEventListener("mousedown", (e) => {
            this.SetMousePos(e.x, e.y);
            this.handManager.MouseMoved(this.mousePosWorld); // Handle any missed mousemove events

            this.handManager.MouseClicked(this);
        });
    }

    SetMousePos(x, y) {
        let posX = x - this.canvas.offsetLeft;
        let posY = y - this.canvas.offsetTop;

        // There was probably an easier way to do this (thru matrices) but I don't care
        let position = [posX / this.canvas.offsetWidth, posY / this.canvas.offsetHeight];
        position[0] *= this.camera.posLeft * this.camera.ratio * 2;
        position[0] -= this.camera.posLeft * this.camera.ratio;
        position[0] = position[0];

        position[1] *= this.camera.posTop * 2;
        position[1] -= this.camera.posTop;
        position[1] = -position[1];
        this.mousePosWorld = position;
    }


    LoadTextures() {
        // Compile a list of textures to load
        let texturesToLoad = [
            "/img/arrow-left.png",
            "/img/cards/card_back.png",
            "/img/glow.png"
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

    LoadSounds() {
        // Same as above; this time, for audio/sounds.
        let soundsToLoad = [
            "/snd/card_flip_1.wav",
            "/snd/card_flip_2.wav",
            "/snd/card_flip_3.wav",
            "/snd/slide_card.wav"
        ];

        // Load the sounds
        this.soundManager = new SoundManager(soundsToLoad);
    }

    Run() {
        this.game.Run();
        this.handManager.UpdateCards();
    }

    Draw() {
        this.camera.Update(this.keysPressed);
        this.glInstance.BeginDraw();
        this.handManager.Update(Date.now() - this.timeSinceLastUpdate);
        this.timeSinceLastUpdate = Date.now();
        this.handManager.Draw();
        this.glInstance.EndDraw();
    }
}