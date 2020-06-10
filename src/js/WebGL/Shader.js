class Shader {
    constructor(glInstance, fragShaderUrl, vertShaderUrl) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;

        this.shaderProgram = this.gl.createProgram();
        this.GetShaderFromUrl(this.shaderProgram, this.gl.VERTEX_SHADER, vertShaderUrl).then(() => {
            this.GetShaderFromUrl(this.shaderProgram, this.gl.FRAGMENT_SHADER, fragShaderUrl).then(() => {
                this.gl.linkProgram(this.shaderProgram);
                this.ready = true;
            });
        });
    }

    GetShaderFromUrl(shaderProgram, shaderType, sourceUrl) {
        return new Promise((resolve, reject) => {
            fetch(sourceUrl).then((res) => res.text().then((text) => {
                let shader = this.gl.createShader(shaderType);
                this.gl.shaderSource(shader, text);
                this.gl.compileShader(shader);
                this.gl.attachShader(shaderProgram, shader);
                if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
                {
                    reject(`Shader error: ${this.gl.getShaderInfoLog(shader)}`);
                }
                else
                {
                    resolve(`Shader compiled successfully`);
                }
                // TODO: this.glInstance.checkGLErrors();
            })).catch((err) => {
                reject(`Couldn't attach shader: ${err}`);
            });
        });
    }

    SetMat4Variable(variableName, variableValue) {
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.shaderProgram, variableName), false, variableValue);
    }

    SetIntVariable(variableName, variableValue) {
        this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, variableName), variableValue);
    }

    SetVec4Variable(variableName, variableValue) {
        this.gl.uniform4f(this.gl.getUniformLocation(this.shaderProgram, variableName), variableValue[0], variableValue[1], variableValue[2], variableValue[3]);
    }
}