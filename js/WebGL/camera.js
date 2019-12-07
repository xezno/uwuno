class Camera {
    constructor() {
        
        this.projMatrix = mat4.create();

        this.position = vec3.fromValues(0, 0, -5);
        this.lookPosition = vec3.fromValues(0, 0, 0);
        this.up = vec3.fromValues(0, 1, 0);

        this.degToRad = 0.0174533;

        
        mat4.perspective(this.projMatrix, 90.0 * this.degToRad, 1280/720, 0.001, 50.0);
    }

    get viewMatrix() {
        let vMatrix = mat4.create();
        mat4.lookAt(vMatrix, this.position, this.lookPosition, this.up);
        return vMatrix;
    }
}