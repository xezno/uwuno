class CardRenderer {
    constructor(glInstance, cardType) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;
        this.VAO = this.glInstance.extVAO.createVertexArrayOES();
        this.VBO = this.gl.createBuffer();
        this.texture = `/img/cards/${cardType}.png`;

        let vertices = new Float32Array([
            -0.5,   -0.5,   0.0, // 0
            -0.5,   0.5,    0.0, // 1
            0.5,    0.5,    0.0, // 3

            -0.5,   -0.5,   0.0, // 0
            0.5,    0.5,    0.0, // 3
            0.5,    -0.5,   0.0  // 2
        ]);

        this.glInstance.extVAO.bindVertexArrayOES(this.VAO);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.gl.enableVertexAttribArray(0); 
        this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);
    }

    get modelMatrix() {
        let mMatrix = mat4.create();
        mat4.scale(mMatrix, mMatrix, vec3.fromValues(3, 4, 3));
        if (this.position)
            mat4.translate(mMatrix, mMatrix, this.position);
        return mMatrix;
    }

    Draw(gameFrontend) {
        if (!gameFrontend.mainCardShader.ready) return;
        this.gl.useProgram(gameFrontend.mainCardShader.shaderProgram);

        gameFrontend.textureManager.GetTexture(this.texture).Bind();

        // Apply matrices
        gameFrontend.mainCardShader.SetMat4Variable("viewMatrix", gameFrontend.camera.viewMatrix);
        gameFrontend.mainCardShader.SetMat4Variable("projMatrix", gameFrontend.camera.projMatrix);
        gameFrontend.mainCardShader.SetMat4Variable("modelMatrix", this.modelMatrix);
        gameFrontend.mainCardShader.SetIntVariable("mainTexture", 0);

        // Draw!
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}