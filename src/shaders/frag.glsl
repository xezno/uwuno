#version 100
uniform sampler2D mainTexture;
uniform lowp vec4 tint;
varying lowp vec4 vertexPos;

void main()
{
    gl_FragColor = texture2D(mainTexture, (vertexPos.xy * vec2(-1, -1)) + vec2(0.5, 0.5));
    gl_FragColor *= tint;
}