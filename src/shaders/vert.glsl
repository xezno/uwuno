#version 100
attribute vec4 vertexIn;
uniform mat4 projMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

varying vec4 vertexPos;

void main() 
{
    vertexPos = vertexIn;
    gl_Position = projMatrix * viewMatrix * modelMatrix * vertexIn;
}