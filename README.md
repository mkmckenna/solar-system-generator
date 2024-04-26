# Solar System Generator

Procedurally generate different solar systems with different star and planet types.

This is a small fun project that I've used to help learn the basics about 3D rendering and modeling and might be of interest to others looking to do the same.

## Run

```npm install```

```npm run dev```

Entry point `client.ts`

## Acknowledgments
Planet textures - https://www.texturesforplanets.com: A great tool for generating planet textures.

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