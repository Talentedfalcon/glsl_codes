#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st,float percent){
    return smoothstep(percent-0.01,percent,st.x)-smoothstep(percent,percent+0.01,st.x);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    vec3 colorA=vec3(78.0/255.,76.0/255.,102.0/255.);
    vec3 colorB=vec3(182.0/255.,100.0/255.,36.0/255.);

    vec3 percent=vec3(sin(st.y+u_time));

    percent.r=sin(percent.r);
    percent.g=cos(percent.g)-0.5;
    percent.b=tan(percent.b);

    color=mix(colorA,colorB,percent);
    
    color=mix(color,vec3(1.0,0.,0.),plot(st,percent.r));
    color=mix(color,vec3(0.0,1.,0.),plot(st,percent.g));
    color=mix(color,vec3(0.0,0.,1.),plot(st,percent.b));

    gl_FragColor=vec4(color,1.);
}