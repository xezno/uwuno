class Camera {
    constructor() {
        this.projMatrix = mat4.create();

        this.position = vec3.fromValues(0, 0, -5);
        this.up = vec3.fromValues(0, 1, 0);
        this.forward = vec3.fromValues(0, 0, 1);

        this.posTop = 5.0;
        this.posBottom = -5.0;
        this.posLeft = -5.0;
        this.posRight = 5.0;

        this.ratio = 1280/720; // TODO: Get canvas width/height

        mat4.ortho(this.projMatrix, -5.0 * this.ratio, 5.0 * this.ratio, -5.0, 5.0, 0.001, 10.0);
    }

    get viewMatrix() {
        let vMatrix = mat4.create();
        let lookPosition = vec3.fromValues(0, 0, 0);
        vec3.add(lookPosition, this.position, this.forward);
        mat4.lookAt(vMatrix, this.position, lookPosition, this.up);
        return vMatrix;
    }

    Update(keysPressed) {
        if (keysPressed["w"]) {
            this.position[1] += 0.1;
        }
        if (keysPressed["s"]) {
            this.position[1] -= 0.1;
        }
        if (keysPressed["a"]) {
            this.position[0] += 0.1;
        }
        if (keysPressed["d"]) {
            this.position[0] -= 0.1;
        }
    }
}