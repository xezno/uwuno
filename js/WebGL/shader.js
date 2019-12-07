class Shader {
    constructor(glInstance, fragShaderUrl, vertShaderUrl) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;

        this.shaderProgram = this.gl.createProgram();
        this.getShaderFromUrl(this.shaderProgram, this.gl.VERTEX_SHADER, vertShaderUrl).then(() => {
            this.getShaderFromUrl(this.shaderProgram, this.gl.FRAGMENT_SHADER, fragShaderUrl).then(() => {
                this.gl.linkProgram(this.shaderProgram);
                this.ready = true;
            });
        });
    }

    getShaderFromUrl(shaderProgram, shaderType, sourceUrl) {
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
                this.glInstance.checkGLErrors();
            })).catch((err) => {
                reject(`Couldn't attach shader: ${err}`);
            });
        });
    }
}