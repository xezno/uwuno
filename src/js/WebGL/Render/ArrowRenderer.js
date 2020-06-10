class ArrowRenderer extends SceneObject {
    constructor(glInstance, playerTurn) {
        super(glInstance);
        this.texture = "/img/arrow-left.png";

        this.position = vec3.fromValues(0, -2, 0);
        this.scale = vec3.fromValues(0.5, 0.5, 0.5);
        this.rotation = vec3.fromValues(0, 0, playerTurn * 90);
        // TODO: why is there a 1 pixel thick line at the bottom of the arrow?
    }
}