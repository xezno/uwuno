#version 100
attribute vec4 vertex_in;
uniform mat4 projMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

void main() 
{
    gl_Position = projMatrix * viewMatrix * modelMatrix * vertex_in;
}