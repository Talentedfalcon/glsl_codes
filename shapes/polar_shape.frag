#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float percent){
    return 1.-step(smoothstep(percent+0.05,percent,st.y)-smoothstep(percent,percent-0.05,st.y),0.9);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st-=vec2(0.5);
    vec3 polar=vec3(0.);
    vec3 graph=vec3(0.);
    float p=0.;
    float g=0.;
    vec3 color=vec3(0.);

    float time_mod=mod(u_time,2.);

    float r=length(st)*2.0;
    float a=atan(st.y,st.x)*time_mod;
    st.x*=time_mod;

    // p=cos(a*3.);
    // g=cos(st.x*3.14*2.*3.)*0.2;
    
    // p=abs(cos(a*3.));
    // g=abs(cos(st.x*3.14*2.*3.))*0.2;

    // p=abs(cos(a*2.5))*0.5+0.3;
    // g=abs(cos(st.x*3.14*2.*2.5))*0.2+0.3;

    // p=abs(cos(a*12.));
    // g=abs(cos(st.x*3.14*2.*12.))*0.2;

    p=abs(cos(a*12.)*sin(a*3.));
    g=abs(cos(st.x*3.14*2.*12.)*sin(st.x*3.14*2.*3.))*0.2;

    // p=smoothstep(-0.5,0.5,cos(a*10.))*0.3+0.5;
    // g=(smoothstep(-0.5,0.5,cos(st.x*3.14*2.*10.))*0.3)*0.2;

    polar=vec3(step(r,p));

    graph+=vec3(plot(st,g))*vec3(1.,0.,0.);

    color=graph+polar-vec3((polar*graph).r);

    gl_FragColor=vec4(color,1.);
}