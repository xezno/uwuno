class CardRenderer extends ObjectRenderer {
    constructor(glInstance, card) {
        super(glInstance);
        this.texture = `/img/cards/${card.cardColor}_${card.cardType}.png`;
        this.scale = vec3.fromValues(1, 1.4, 1);
        this.mousePos = [];
        this.card = card;

        this.animation = {};
    }

    get isMouseOver() {
        return (this.mousePos[0] > this.position[0] - (this.scale[0] / 2) && this.mousePos[0] < this.position[0] + (this.scale[0] / 2) &&
                this.mousePos[1] > this.position[1] - (this.scale[1] / 2) && this.mousePos[1] < this.position[1] + (this.scale[1] / 2));
    }

    MouseMoved(mousePos) {
        this.mousePos = mousePos;
        if (this.isMouseOver)
        {
            this.scale = vec3.fromValues(1, 1.4, 1);
            vec3.multiply(this.scale, this.scale, vec3.fromValues(1.1, 1.1, 1.1));
            this.position[2] = -4;
        }
        else
        {
            this.scale = vec3.fromValues(1, 1.4, 1);
        }
    }

    MouseClicked(gameFrontend, handRenderer) {
        if (this.isMouseOver)
        {
            this.animation = {
                from: vec3.fromValues(this.position[0], this.position[1], this.position[1]),
                to: vec3.fromValues(0, 0, 0),
                duration: 30,
                onFinish: _ => {
                    gameFrontend.game.discardPile.AddToPile(this.card);
                    handRenderer.UpdateDiscardPile();
                }
            };
        }
    }
}