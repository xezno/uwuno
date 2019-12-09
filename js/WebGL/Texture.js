class Texture {
    constructor(glInstance, textureUrl) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;
        
        this.glTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]));
        
        this.image = new Image();

        // We want to use these in the image load function, so we have
        // to declare them locally too.
        const gl = this.gl;
        const image = this.image;
        const IsPOT = this.IsPOT;
        const glTexture = this.glTexture;

        this.image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, glTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

            if (IsPOT(image.width) && IsPOT(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        }
        this.image.src = textureUrl;
    }

    Bind() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
    }

    IsPOT(value) {
        return (value & (value - 1)) == 0;
    }
}