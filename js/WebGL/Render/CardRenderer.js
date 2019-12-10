class CardRenderer extends SceneObject {
    constructor(glInstance, card, isInteractive) {
        super(glInstance);
        this.texture = `/img/cards/${card.texture}`;
        this.scale = vec3.fromValues(1, 1, 1);
        this.mousePos = [];
        this.card = card;
        this.isInteractive = isInteractive;
    }

    get isMouseOver() {
        return (this.mousePos[0] > this.position[0] - (this.scale[0] / 2) && this.mousePos[0] < this.position[0] + (this.scale[0] / 2) &&
                this.mousePos[1] > this.position[1] - (this.scale[1] / 2) && this.mousePos[1] < this.position[1] + (this.scale[1] / 2));
    }

    get modelMatrix() {
        let mMatrix = mat4.create();
        mat4.translate(mMatrix, mMatrix, this.position);

        mat4.rotate(mMatrix, mMatrix, this.rotation[0] * DEG_TO_RAD, vec3.fromValues(1, 0, 0));
        mat4.rotate(mMatrix, mMatrix, this.rotation[1] * DEG_TO_RAD, vec3.fromValues(0, 1, 0));
        mat4.rotate(mMatrix, mMatrix, this.rotation[2] * DEG_TO_RAD, vec3.fromValues(0, 0, 1));
        
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
        this.AddAnimation({
            fromRot: vec3.fromValues(this.rotation[0], this.rotation[1], this.rotation[2]),
            toRot: vec3.fromValues(0, 90, 0),
            duration: 15,
            onFinish: _ => {
                this.card.Flip();
                this.texture = `/img/cards/${this.card.texture}`;
                this.AddAnimation({
                    fromRot: vec3.fromValues(this.rotation[0], this.rotation[1], this.rotation[2]),
                    toRot: vec3.fromValues(0, 0, 0),
                    duration: 15
                });
                console.log(this.animations);
            }
        });
    }

    MouseClicked(gameFrontend) {
        if (!this.isInteractive) return;
            

        if (this.isMouseOver && gameFrontend.game.CanPlayCard(this.card))
        {
            if (this.card.isFlipped) this.Flip();
            this.AddAnimation({
                fromPos: vec3.fromValues(this.position[0], this.position[1], this.position[2]),
                toPos: gameFrontend.handRenderer.CalcDiscardOffset(),
                fromRot: vec3.fromValues(this.rotation[0], this.rotation[1], this.rotation[2]),
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
            });
            new Sound("/snd/slide_card.wav").Play();
        }
        
    }
}