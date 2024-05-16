## Three.JS Notes

### `WebGLRenderer`
Displays scenes using WebGL
Creates canvas when initialized if one isn't passed

### `Scene`
Used to place objects, lights and cameras

### `Camera`
Abstract class to create different types of cameras

- `PerspectiveCamera` - Most common type of projection mode. Works like human eye.

### `Object3D`
Base class for most objects in three.js. Provides properties and methods for manipulating objects in 3D space.

## Shader Notes

### Vertex Shader
A vertex shader processes each vertex of a 3D object. It handles tasks like transforming vertex coordinates and calculating vertex lighting.

### Fragment Shader
A fragment shader, on the other hand, processes pixels or fragments that will be displayed on the screen, determining their color, texture, and effects based on the lighting and material properties.

