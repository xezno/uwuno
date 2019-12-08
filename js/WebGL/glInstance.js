class GLInstance {
    constructor(canvas) {
        this.gl = canvas.getContext("webgl");
        // The only devices I currently test on have support for at least these extensions
        // (and some more that I won't use).  Considering that my worst device is from
        // 2011, and uses an intel hd 3000, these extensions should not cause issues for
        // most people - however there may be people running uwuno on a gma from 2008
        // so it's best to check and inform just in case.
        let requiredExtensions = ["OES_vertex_array_object", "OES_texture_float", "OES_texture_float_linear", "WEBGL_depth_texture", "OES_element_index_uint"];
        for (let extension of requiredExtensions)
        {
            if (this.gl.getExtension(extension))
            {
                console.log(`Device supports ${extension}`);
            }
            else
            {
                return alert(`Sorry but your device does not support ${extension}, and therefore you are not able to play uwuno :(`);
            }
        }

        // Now that we've ensured that the device supports all of the extensions, we
        // can create instances of all of them!
        // TODO: in future we should use .getSupportedExtensions and check against
        // that because we're throwing away extensions above (not good).
        this.extVAO = this.gl.getExtension("OES_vertex_array_object");

        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    BeginDraw() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
    }

    EndDraw() {
        // TODO: gl.finish, inputs, etc.
        this.gl.finish();
    }
}