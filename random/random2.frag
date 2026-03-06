#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(1.0);

    st*=30.0;
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    color=vec3(random(ipos))*vec3(0.0,0.5,0.9);
    // color=vec3(fpos,0.);

    gl_FragColor=vec4(color,1.0);
}