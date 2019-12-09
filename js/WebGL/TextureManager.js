class TextureManager {
    constructor(glInstance, texturesToLoad) {
        this.textures = {};
        for (let texture of texturesToLoad) {
            this.textures[texture] = new Texture(glInstance, texture);
        }
    }

    GetTexture(textureName)
    {
        var texture = this.textures[textureName];
        if (!texture)
            console.error(`${textureName} wasn't loaded!`);
        return texture;
    }
}