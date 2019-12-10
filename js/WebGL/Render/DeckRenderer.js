class DeckRenderer extends CardRenderer {
    constructor(glInstance) {
        super(glInstance, new Card(true, "0", "blue"), true);
        this.texture = `/img/cards/card_back.png`;

        this.position = vec3.fromValues(0, 0, -4.5);
        this.scale = vec3.fromValues(1.5, 1.5, 1.5);
    }

    MouseMoved(mousePos) {
        if (!this.isInteractive) return;
        
        this.mousePos = mousePos;
        if (this.isMouseOver)
        {
            this.scale = vec3.fromValues(1.6, 1.6, 1.6);
        }
        else
        {
            this.scale = vec3.fromValues(1.5, 1.5, 1.5);
        }
    }

    MouseClicked(gameFrontend) {
        if (!this.isInteractive) return;
        this.tempCard = new CardRenderer(this.glInstance, gameFrontend.game.deck.DrawCard(), false);
        gameFrontend.handManager.renderList.push(this.tempCard);
        let randomCardSound = Math.floor((Math.random() * 3) + 1);
        if (this.isMouseOver)
        {
            this.tempCard.Flip();
            this.tempCard.AddAnimation({
                fromPos: vec3.fromValues(this.position[0], this.position[1], this.position[2]),
                toPos: vec3.fromValues(0, -2, 0),
                fromRot: vec3.fromValues(this.rotation[0], this.rotation[1], this.rotation[2]),
                toRot: vec3.fromValues(0, 0, 0),
                duration: 500,
                fromScale: this.scale,
                toScale: vec3.fromValues(1.25, 1.25, 1.25),
                onFinish: _ => {
                    gameFrontend.game.players[0].AddToHand(this.tempCard.card);
                    gameFrontend.handManager.UpdateCards();
                    SoundManager.Play(`./snd/card_flip_${randomCardSound}.wav`);
                    gameFrontend.handManager.Destroy(this.tempCard);
                }
            });
        }
    }
}