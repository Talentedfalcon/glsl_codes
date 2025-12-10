#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 scale(vec2 scale){
    return mat2(
        scale.x,0.0,
        0.0,scale.y
    );
}

mat2 rotate2d(float angle){
    return mat2(
        cos(angle),-sin(angle),
        sin(angle),cos(angle)
    );
}

float polygon_distance_field(vec2 st,vec2 pos,float rotate,int N){
    st-=pos;
    float a = atan(st.x,st.y)+(PI*rotate);
    float r = 2.0*PI/float(N);

    float d=cos(floor(0.5+a/r)*r-a)*length(st)*2.;
    return d;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    st-=vec2(0.5);
    st=scale(vec2(sin(u_time)+1.0))*rotate2d(cos(2.*u_time)*PI)*st;
    st+=vec2(0.5);

    color=vec3(st.x/2.,st.y,st.x);
    float d=polygon_distance_field(st,vec2(0.5,0.5),1.0,5);
    color+=vec3(step(d,0.5));

    gl_FragColor=vec4(color,1.0);
}