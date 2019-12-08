class Camera {
    constructor() {
        this.projMatrix = mat4.create();

        // this.position = vec3.fromValues(2.5, 2, -4);
        this.position = vec3.fromValues(0, 0, -5);
        this.up = vec3.fromValues(0, 1, 0);
        this.forward = vec3.fromValues(0, 0, 1);

        var ratio = 1280/720;

        // mat4.perspective(this.projMatrix, 90.0 * DEG_TO_RAD, 1280/720, 0.001, 50.0);

        mat4.ortho(this.projMatrix, -5.0 * ratio, 5.0 * ratio, -5.0, 5.0, 0.001, 10.0);
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