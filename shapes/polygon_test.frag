#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float polygon_distance_field(vec2 st,vec2 pos,int N){
    st-=pos;
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);

    float d=cos(floor(0.5+a/r)*r-a)*length(st)*2.;
    return d;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.);
    float d=0.;

    int N=5;
    vec2 pos=vec2(0.5,0.5);
    d=polygon_distance_field(st,pos,N);
    // d=min(polygon_distance_field(st,pos,N),polygon_distance_field(st,pos,N+3));     //Union the 2 fields
    // d=max(polygon_distance_field(st,pos,N),polygon_distance_field(st,pos,N+3));     //Intersect the 2 fields

    // color=vec3(d);
    // color=vec3(fract(d*10.));
    color=vec3(step(d,0.5));
    // color = vec3(smoothstep(0.9,0.1,d));

    gl_FragColor=vec4(color,1.);
}