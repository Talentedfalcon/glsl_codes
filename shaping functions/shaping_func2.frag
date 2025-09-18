#ifdef GL_ES
precision highp float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float pct){
    return smoothstep(pct-0.02,pct,st.y)-smoothstep(pct,pct+0.02,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    // float y=step(0.5,st.x);
    // float y=smoothstep(0.2,0.5,st.x);
    // float y=1.-smoothstep(0.5,0.8,st.x);
    // float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);

    // float y = sin((st.x+u_time)*PI*2.);
    // float y = sin((st.x*u_time)*PI*2.);
    // float y = sin((st.x+u_time)*PI*2.)+1.;
    // float y = floor(ceil(sin((st.x+u_time)*PI*2.)));

    // float y = mod(st.x,0.1);
    // float y = fract(st.x);
    // float y = ceil(st.x);
    // float y = floor(st.x);
    
    float y = clamp(st.x,0.2,0.5)-clamp(st.x,0.5,0.8)+.5;

    // float y = max(.2,min(.5,st.x))-min(.8,max(.5,st.x))+.5;

    vec3 color=vec3(y);

    float pct=plot(st,y);
    color=(1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor=vec4(color,1.0);
}