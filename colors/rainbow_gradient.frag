#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float percent){
    return smoothstep(percent-0.01,percent,st.y)-smoothstep(percent,percent+0.01,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    vec3 percent=vec3(st.x*10.);

    float speed=3.*u_time;
    float wave_length=0.5;

    percent.r=cos((percent.r*wave_length)+(1.*3.14)+speed)*0.5+0.5;
    percent.g=cos((percent.g*wave_length)+(1.5*3.14)+speed)*0.5+0.5;
    percent.b=cos((percent.b*wave_length)+(2.*3.14)+speed)*0.5+0.5;

    vec3 colorA=vec3(1.0,1.0,1.0);
    vec3 colorB=vec3(0.0,0.0,0.0);

    vec3 color=mix(colorA,colorB,percent);

    color=mix(color,vec3(1.0,0.0,0.0),plot(st,percent.r));
    color=mix(color,vec3(0.0,1.0,0.0),plot(st,percent.g));
    color=mix(color,vec3(0.0,0.0,1.0),plot(st,percent.b));

    gl_FragColor=vec4(color,1.0);
}