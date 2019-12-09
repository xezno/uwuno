class CardRenderer extends SceneObject {
    constructor(glInstance, card) {
        super(glInstance);
        this.texture = `/img/cards/${card.texture}`;
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

    Flip() {
        this.card.Flip();
        this.texture = `/img/cards/${this.card.texture}`;
    }

    MouseClicked(game, handRenderer) {
        if (this.isMouseOver)
        {
            this.Flip();
            this.animation = {
                fromPos: vec3.fromValues(this.position[0], this.position[1], this.position[2]),
                toPos: handRenderer.CalcDiscardOffset(),
                fromRot: 0,
                toRot: handRenderer.CalcDiscardRotation(),
                duration: 30,
                onFinish: _ => {
                    game.discardPile.AddToPile(this.card);
                    handRenderer.UpdateDiscardPile();
                    var sound2 = new Audio(`/snd/card_flip_${Math.floor((Math.random() * 3) + 1)}.wav`);
                    sound2.play();
                }
            };
            // Play sound
            var sound = new Audio("/snd/slide_card.wav");
            // sound.playbackRate = Math.min((Math.random() + 0.5), 1);
            console.log(sound.playbackRate);
            sound.volume = 0.2;
            sound.play();
        }
    }
}