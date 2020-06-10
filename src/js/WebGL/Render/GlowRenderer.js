class GlowRenderer extends SceneObject {
    constructor(glInstance, parentCard) {
        super(glInstance);
        this.texture = `/img/glow.png`;
        this.scale = vec3.fromValues(1, 1, 1);
        this.parentCard = parentCard;
        this.visible = true;
    }

    get modelMatrix() {
        let mMatrix = mat4.create();
        mat4.scale(mMatrix, this.parentCard.modelMatrix, vec3.fromValues(1.25, 1.25, 1));
        return mMatrix;
    }
}