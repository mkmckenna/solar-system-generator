varying vec3 vertexNormal;

uniform float r;
uniform float g;
uniform float b;

void main() {
    float intensity = 2.3 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(r, g, b) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}