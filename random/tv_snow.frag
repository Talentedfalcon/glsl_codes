#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float random(float num){
    return fract(sin(num)*43758.5453123);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 mouse_correct=u_mouse.xy/u_resolution.xy;
    vec3 color=vec3(1.);

    if(random(st)>=mouse_correct.y){
        color=vec3(random(st));
    }

    gl_FragColor=vec4(color,1.);
}