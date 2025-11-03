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
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    float hex=polygon_distance_field(st,vec2(0.5),0.5,6);
    // float tri=polygon_distance_field(st,vec2(0.5),0.5,3);

    // color=vec3(
    //     step(hex,0.8)-step(hex,0.75)
    //     +(step(hex,0.5)-step(hex,0.45))
    //     +(step(tri,0.25)-step(tri,0.2))
    // );

    float cut1=max(polygon_distance_field(st,vec2(0.5),0.5,6),polygon_distance_field(st,vec2(0.5,0.9),0.5,6));
    float cut2=max(polygon_distance_field(st,vec2(0.5),0.5,6),polygon_distance_field(st,vec2(0.875,0.25),0.5,6));
    float cut3=max(polygon_distance_field(st,vec2(0.5),0.5,6),polygon_distance_field(st,vec2(0.125,0.25),0.5,6));

    color=vec3(
        (step(hex,0.8)-step(cut1,0.8)+step(cut1,0.7)-step(cut1,0.6)+step(cut1,0.5)-step(cut1,0.45))
        *(step(hex,0.8)-step(cut2,0.8)+step(cut2,0.7)-step(cut2,0.6)+step(cut2,0.5)-step(cut2,0.45))
        *(step(hex,0.8)-step(cut3,0.8)+step(cut3,0.7)-step(cut3,0.6)+step(cut3,0.5)-step(cut3,0.45))
    )*vec3(0.5,st.y,1.);

    gl_FragColor=vec4(color,1.);
}