varying vec3 vertexNormal;

uniform float r;
uniform float g;
uniform float b;

void main() {
    float intensity = pow(0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 1.5);
    gl_FragColor = vec4(r, g, b, 0.7) * intensity;
}