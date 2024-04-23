varying vec3 vertexNormal;

void main() {
    float intensity = 2.3 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.9, 0.7, 0) * pow(intensity, 1.5);

    gl_FragColor = vec4(atmosphere, 1.0);
}