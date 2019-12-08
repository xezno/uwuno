class CardRenderer extends ObjectRenderer {
    constructor(glInstance, cardType) {
        super(glInstance);
        this.texture = `/img/cards/${cardType}.png`;
        this.scale = vec3.fromValues(1, 1.4, 1);
    }

    MouseMoved(mousePosWorld) {
        if (mousePosWorld[0] > this.position[0] - (this.scale[0] / 2) && mousePosWorld[0] < this.position[0] + (this.scale[0] / 2) &&
            mousePosWorld[1] > this.position[1] - (this.scale[1] / 2) && mousePosWorld[1] < this.position[1] + (this.scale[1] / 2))
        {
            this.scale = vec3.fromValues(1, 1.4, 1);
            vec3.multiply(this.scale, this.scale, vec3.fromValues(0.9, 0.9, 0.9));
            this.position[2] = -0.5;
        }
        else
        {
            this.scale = vec3.fromValues(1, 1.4, 1);
        }
    }
}