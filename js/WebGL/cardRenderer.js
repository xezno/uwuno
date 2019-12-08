class CardRenderer extends ObjectRenderer {
    constructor(glInstance, cardType) {
        super(glInstance);
        this.texture = `/img/cards/${cardType}.png`;
        this.scale = vec3.fromValues(1, 1.4, 1);
    }
}