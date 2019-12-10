class SceneObject {
    constructor(glInstance) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;
        this.VAO = this.glInstance.extVAO.createVertexArrayOES();
        this.VBO = this.gl.createBuffer();

        this.position = vec3.fromValues(0, 0, 0);
        this.rotation = vec3.fromValues(0, 0, 0);
        this.scale = vec3.fromValues(1, 1, 1);

        this.animations = [];

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
        mat4.translate(mMatrix, mMatrix, this.position);
        mat4.rotate(mMatrix, mMatrix, this.rotation[0] * DEG_TO_RAD, vec3.fromValues(1, 0, 0));
        mat4.rotate(mMatrix, mMatrix, this.rotation[1] * DEG_TO_RAD, vec3.fromValues(0, 1, 0));
        mat4.rotate(mMatrix, mMatrix, this.rotation[2] * DEG_TO_RAD, vec3.fromValues(0, 0, 1));
        mat4.scale(mMatrix, mMatrix, this.scale);
        return mMatrix;
    }

    AddAnimation(animation) {
        this.animations.push(animation);
    }

    Curve(t) {
        return (Math.sin(t * (Math.PI / 2))); // lazy "ease-in" style using sine
    }

    Lerp(a, b, t) {
        t = this.Curve(t);
        return (1 - t) * a + t * b;
    }

    LerpVec3(a, b, t) {
        return [this.Lerp(a[0], b[0], t), 
                this.Lerp(a[1], b[1], t), 
                this.Lerp(a[2], b[2], t)];
    }

    Update(deltaTime) {
        let offsetPosition;
        let offsetScale;
        let offsetRotation;
        for (let animation of this.animations) {
            if (!animation.totalTime) 
                animation.totalTime = 0;

            let t = animation.totalTime / animation.duration;

            if (animation.fromPos != undefined && animation.toPos != undefined)
            {
                if (!offsetPosition)
                    offsetPosition = vec3.create();
                vec3.add(offsetPosition, offsetPosition, this.LerpVec3(animation.fromPos, animation.toPos, t));
            }

            if (animation.fromScale != undefined && animation.toScale != undefined)
            {
                if (!offsetScale) 
                    offsetScale = vec3.fromValues(1, 1, 1);
                vec3.multiply(offsetScale, offsetScale, this.LerpVec3(animation.fromScale, animation.toScale, t));
            }

            if (animation.fromRot != undefined && animation.toRot != undefined)
            {
                if (!offsetRotation)
                    offsetRotation = vec3.create();
                vec3.add(offsetRotation, offsetRotation, this.LerpVec3(animation.fromRot, animation.toRot, t));
            }

            animation.totalTime += deltaTime;

            if (animation.totalTime > animation.duration)
            {
                if (animation.onFinish)
                    animation.onFinish();
                this.animations.splice(this.animations.indexOf(animation), 1);
            }
        }

        if (offsetPosition)
            this.position = offsetPosition;
        if (offsetScale)
            this.scale = offsetScale;
        if (offsetRotation)
            this.rotation = offsetRotation;
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