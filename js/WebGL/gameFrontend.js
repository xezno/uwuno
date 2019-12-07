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

        this.mainCardShader = new Shader(this.glInstance, "/shaders/frag.glsl", "/shaders/vert.glsl");

        this.keysPressed = [];
        this.cardList = [];
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
        let texturesToLoad = [];
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

    UpdateCards() {
        this.cardList = [];
        var totalCardIndex = 0;
        for (var playerIndex in this.game.players)
        {
            var playerCardIndex = 0;
            for (var card of this.game.players[playerIndex].hand)
            {
                this.cardList.push(new CardRenderer(this.glInstance, `${card.cardColor}_${card.cardType}`));
                this.cardList[totalCardIndex].position = vec3.fromValues(playerCardIndex, playerIndex, 0);
                playerCardIndex++;
                totalCardIndex++;
            }
        }
        console.dir(this.game.discardPileTop);
        var discardPileCard = new CardRenderer(this.glInstance, `${this.game.discardPileTop.cardColor}_${this.game.discardPileTop.cardType}`);
        discardPileCard.position = vec3.fromValues(-2, 0, 0);
        this.cardList.push(discardPileCard);
    }

    Run() {
        this.game.Run();
        this.UpdateCards();
    }

    Draw() {
        this.camera.Update(this.keysPressed);
        this.glInstance.BeginDraw();
        for (let card of this.cardList)
            card.Draw(this);
        this.glInstance.EndDraw();
    }
}