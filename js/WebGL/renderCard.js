class RenderCard {
    constructor(glInstance) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;
        this.VAO = this.glInstance.extVAO.createVertexArrayOES();
        this.VBO = this.gl.createBuffer();
        
        this.texture = new Texture(glInstance, "/img/cards/blue_skip.png");

        this.modelMatrix = mat4.create();
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(3, 4, 3));

        let vertices = new Float32Array([
            -0.5,   -0.5,   0.0, // 0
            -0.5,   0.5,    0.0, // 1
            0.5,    0.5,    0.0, // 3

            -0.5,   -0.5,   0.0, // 0
            0.5,    0.5,    0.0, // 3
            0.5,    -0.5,   0.0  // 2
        ]);

        console.log(`VAO: ${this.VAO}, VBO: ${this.VBO}`);

        this.glInstance.extVAO.bindVertexArrayOES(this.VAO);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        this.checkGLErrors();

        this.gl.enableVertexAttribArray(0); 
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
        this.checkGLErrors();

        this.createShaders();
    }

    createShaders() {
        this.shader = new Shader(this, "/shaders/frag.glsl", "/shaders/vert.glsl");
    }

    checkGLErrors() {
        let glErrorCode = this.gl.getError();
        if (glErrorCode > 0) {
            //let err = new Error();
            console.error(`GL error: ${glErrorCode}`);
            //console.log(`Stack trace: ${err.stack || "?"}`);
        }
    }

    draw(camera) {
        if (!this.shader.ready) return;
        this.gl.useProgram(this.shader.shaderProgram);

        this.texture.Bind();

        // Apply matrices
        this.shader.SetMat4Variable("viewMatrix", camera.viewMatrix);
        this.shader.SetMat4Variable("projMatrix", camera.projMatrix);
        this.shader.SetMat4Variable("modelMatrix", this.modelMatrix);

        this.shader.SetIntVariable("mainTexture", 0);

        // Draw!
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}