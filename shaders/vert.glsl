#version 100
attribute vec4 vertex_in;
uniform mat4 projMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

varying vec4 vertexPos;

void main() 
{
    vertexPos = vertex_in;
    gl_Position = projMatrix * viewMatrix * modelMatrix * vertex_in;
}