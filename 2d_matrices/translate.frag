#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float polygon_distance_field(vec2 st,vec2 pos,float rotate,int N){
    st-=pos;
    float a = atan(st.x,st.y)+(PI*rotate);
    float r = TWO_PI/float(N);

    float d=cos(floor(0.5+a/r)*r-a)*length(st)*2.;
    return d;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    //Waves
    // vec2 translate=vec2(cos(u_time),sin(5.*u_time)/2.);
    
    //Half-Swing to Reset
    vec2 translate=vec2(cos(u_time),clamp(sin(u_time),0.0,1.0));

    st+=translate*0.4;

    float d=polygon_distance_field(st,vec2(0.5,0.5),1.0,6);
    color=vec3(st.x/2.,st.y,st.x);
    color+=vec3(step(d,0.2));

    gl_FragColor=vec4(color,1.0);
}