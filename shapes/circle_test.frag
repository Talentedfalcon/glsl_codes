#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//circle
float circle_sqrt(vec2 st,vec2 pos,float radius,bool smooth){
    float pct=0.;
    pct=step(distance(st,pos),radius);
    if(smooth){
        pct=smoothstep(distance(st,pos),0.75,radius);
    }
    return pct;
}

//circle but better and with blur
float circle(vec2 st,vec2 pos,float radius,float blur){
    vec2 dist=st-pos;

    float pct=0.;
    pct=1.-smoothstep(radius-(radius*blur),radius+(radius*blur),sqrt(dot(dist,dist)));

    return pct;
}

//animation easing function
float shrink_grow(float t,float height){
    return ((sin(PI*t)*height)+1.-height);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    float pct=0.;
    // pct=circle_sqrt(st,vec2(0.5,0.5),0.3,false);
    // pct=circle_sqrt(st,vec2(0.5,0.5*shrink_grow(fract(u_time),0.4)),0.4*shrink_grow(fract(u_time),0.2),false);
    // pct=circle(st,vec2(0.5,0.5),0.3,0.2);
    pct=circle(st,vec2(0.5,0.5),0.3*shrink_grow(fract(u_time),0.2),0.2*shrink_grow(fract(u_time),1.));

    vec3 color=vec3(pct)*vec3(0.5,st.y,1.);
    gl_FragColor=vec4(color,1.);
}