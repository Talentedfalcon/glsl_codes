#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st-=vec2(0.5);
    vec3 color=vec3(0.);

    float r=length(st)*2.;
    float a=atan(st.y,st.x);

    float f1=((smoothstep(-1.,1.,cos(a*12.+3.14)*fract(u_time)))+0.2)/1.2;
    float f2=((smoothstep(0.,1.,cos(a*12.)*fract(u_time)))+0.2)/1.5;

    color=vec3(step(r,f1),0.,0.)+vec3(step(r,f2)/2.,step(r,f2),0.);
    color+=vec3(0.,0.,step(r,f1)*(st.x+0.75));

    gl_FragColor=vec4(color,1.);
}