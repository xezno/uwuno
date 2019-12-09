class CardRenderer extends SceneObject {
    constructor(glInstance, card, isInteractive) {
        super(glInstance);
        this.texture = `/img/cards/${card.texture}`;
        this.scale = vec3.fromValues(1, 1, 1);
        this.mousePos = [];
        this.card = card;
        this.isInteractive = isInteractive;

        this.animation = {};
    }

    get isMouseOver() {
        return (this.mousePos[0] > this.position[0] - (this.scale[0] / 2) && this.mousePos[0] < this.position[0] + (this.scale[0] / 2) &&
                this.mousePos[1] > this.position[1] - (this.scale[1] / 2) && this.mousePos[1] < this.position[1] + (this.scale[1] / 2));
    }

    get modelMatrix() {
        let mMatrix = mat4.create();
        mat4.translate(mMatrix, mMatrix, this.position);
        mat4.rotate(mMatrix, mMatrix, this.rotation * DEG_TO_RAD, vec3.fromValues(0, 0, 1));
        
        let newScale = vec3.create();
        newScale = vec3.multiply(newScale, this.scale, CARD_SCALE_MULTIPLIER);
        mat4.scale(mMatrix, mMatrix, newScale);
        return mMatrix;
    }

    MouseMoved(mousePos) {
        if (!this.isInteractive) return;
        
        this.mousePos = mousePos;
        if (this.isMouseOver)
        {
            this.scale = vec3.fromValues(1.1, 1.1, 1.1);
            this.position[2] = -4;
        }
        else
        {
            this.scale = vec3.fromValues(1, 1, 1);
        }
    }

    Flip() {
        this.card.Flip();
        this.texture = `/img/cards/${this.card.texture}`;
    }

    MouseClicked(gameFrontend) {
        if (!this.isInteractive) return;

        if (this.isMouseOver && gameFrontend.game.CanPlayCard(this.card))
        {
            this.animation = {
                fromPos: vec3.fromValues(this.position[0], this.position[1], this.position[2]),
                toPos: gameFrontend.handRenderer.CalcDiscardOffset(),
                fromRot: this.rotation,
                toRot: gameFrontend.handRenderer.CalcDiscardRotation(),
                duration: 30,
                fromScale: this.scale,
                toScale: vec3.fromValues(1.25, 1.25, 1.25),
                onFinish: _ => {
                    gameFrontend.game.discardPile.AddToPile(this.card);
                    gameFrontend.handRenderer.UpdateDiscardPile();

                    new Sound(`./snd/card_flip_${Math.floor((Math.random() * 3) + 1)}.wav`).Play();
                    
                    gameFrontend.handRenderer.Destroy(this);
                }
            };
            // new Sound("/snd/slide_card.wav").Play();
        }
    }
}