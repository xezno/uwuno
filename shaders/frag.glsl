#version 100
uniform sampler2D mainTexture;
void main()
{
    gl_FragColor = texture2D(mainTexture, gl_FragCoord.xy);
}