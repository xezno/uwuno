class Camera {
    constructor() {
        
        this.projMatrix = mat4.create();

        this.position = vec3.fromValues(0, 0, -5);
        this.up = vec3.fromValues(0, 1, 0);
        this.forward = vec3.fromValues(0, 0, 1);

        this.degToRad = 0.0174533;

        mat4.perspective(this.projMatrix, 90.0 * this.degToRad, 1280/720, 0.001, 50.0);
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
            this.position[2] += 0.1;
        }
        if (keysPressed["s"]) {
            this.position[2] -= 0.1;
        }
        if (keysPressed["a"]) {
            this.position[0] += 0.1;
        }
        if (keysPressed["d"]) {
            this.position[0] -= 0.1;
        }
        if (keysPressed["q"]) {
            this.position[1] -= 0.1;
        }
        if (keysPressed["e"]) {
            this.position[1] += 0.1;
        }
    }
}