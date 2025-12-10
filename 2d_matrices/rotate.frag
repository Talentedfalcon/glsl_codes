#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float angle){
    return mat2(
        cos(angle),-sin(angle),
        sin(angle),cos(angle)
    );
}

float box(vec2 st, vec2 size){
    size=vec2(0.5)-size*0.5;
    vec2 uv=smoothstep(size,size+vec2(0.001),st);
    uv*=smoothstep(size,size+vec2(0.001),vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(vec2 st, float size){
    return box(st,vec2(size,size/4.))+box(st,vec2(size/4.,size));
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    st-=vec2(0.5);
    // st=rotate2d(5.*u_time)*st;
    st=rotate2d(cos(2.*u_time)*PI)*st;
    st+=vec2(0.5);

    color=vec3(st.x/2.,st.y,st.x);

    color+=vec3(cross(st,0.4));
    gl_FragColor=vec4(color,1.0);
}